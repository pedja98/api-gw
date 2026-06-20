import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { HttpService } from '@nestjs/axios'
import type { Request } from 'express'
import { lastValueFrom } from 'rxjs'
import { ProxyError } from './types/proxy-error.type'

@Injectable()
export class ProxyService {
  private readonly systemUrls: Record<string, string | undefined>

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.systemUrls = {
      auth: this.configService.get<string>('endpoint.auth'),
      quiz: this.configService.get<string>('endpoint.quiz'),
      result: this.configService.get<string>('endpoint.result'),
    }
  }

  async forwardRequest(req: Request): Promise<{ status: number; data: unknown }> {
    const resolvedUrl = this.resolveUrl(req.url)

    if (!resolvedUrl) {
      throw new HttpException('Service not found', HttpStatus.NOT_FOUND)
    }

    try {
      const proxiedResponse = await lastValueFrom(
        this.httpService.request({
          url: resolvedUrl,
          method: req.method,
          data: req.body as unknown,
          headers: req.headers,
        }),
      )
      return {
        status: proxiedResponse.status,
        data: proxiedResponse.data,
      }
    } catch (error: unknown) {
      if (error instanceof HttpException) {
        const response = error.getResponse()

        return {
          status: error.getStatus(),
          data: typeof response === 'string' ? { message: response } : response,
        }
      }

      const proxyError = error as ProxyError

      throw new HttpException(
        proxyError?.response?.data || 'Internal server error',
        proxyError?.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }

  private resolveUrl(originalUrl: string): string | null {
    const prefix = '/api/v1/proxy/'
    const urlWithoutPrefix = originalUrl.replace(prefix, '')
    const [systemKey, ...restPath] = urlWithoutPrefix.split('/')
    const baseUrl = this.systemUrls[systemKey]
    if (!baseUrl) {
      return null
    }
    return `${baseUrl}/${restPath.join('/')}`
  }
}
