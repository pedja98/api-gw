import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common'
import { Request } from 'express'
import { UserRole } from '../enums/user-role.enum'

@Injectable()
export class ResultPolicyGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>()
    const path = request.url

    if (path.includes('/proxy/result') || path.includes('/quiz-session')) {
      const userRole = request.headers['x-user-role']

      if (userRole !== UserRole.USER) {
        throw new ForbiddenException('You are not authorized')
      }
    }

    return true
  }
}
