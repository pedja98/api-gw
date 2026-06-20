import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { AuthUser } from 'src/types/auth-user.types'

interface RequestWithUser extends Request {
  user: AuthUser
}

export const User = createParamDecorator((_data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<RequestWithUser>()
  return request.user
})
