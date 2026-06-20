import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Request } from 'express'
import { JwtPayload } from 'src/types/jwt-payload.types.dto'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>()
    const path = req.url

    if (path.includes('/proxy/auth')) {
      return true
    }

    const token = this.extractTokenFromHeader(req)
    if (!token) {
      throw new UnauthorizedException('Missing token')
    }

    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(token)
      req.headers['x-user-id'] = payload.sub
      req.headers['x-user-role'] = payload.role

      req.user = {
        id: payload.sub,
        role: payload.role,
      }
    } catch {
      throw new UnauthorizedException('Invalid or expired token')
    }

    return true
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? []
    return type === 'Bearer' ? token : undefined
  }
}
