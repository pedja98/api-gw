import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common'
import { Request } from 'express'
import { UserRole } from 'src/enums/user-role.enum'

@Injectable()
export class QuizPolicyGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>()
    const path = request.url
    const method = request.method

    if (path.includes('/proxy/quizz/quizzes/internal')) {
      throw new ForbiddenException('You are not authorized')
    }

    if (path.includes('/proxy/quizz/quizzes')) {
      const isMutationMethod = ['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)

      if (isMutationMethod) {
        const userRole = request.headers['x-user-role']

        if (userRole !== UserRole.ADMIN) {
          throw new ForbiddenException('You are not authorized to modify entity')
        }
      }
    }

    return true
  }
}
