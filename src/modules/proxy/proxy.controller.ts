import { All, Controller, Req, Res } from '@nestjs/common'
import type { Request, Response } from 'express'
import { ProxyService } from './proxy.service'

@Controller('proxy')
export class ProxyController {
  constructor(private readonly proxyService: ProxyService) {}

  @All('*path')
  async proxyRequest(@Req() req: Request, @Res() res: Response) {
    const { status, data } = await this.proxyService.forwardRequest(req)
    res.status(status).send(data)
  }
}
