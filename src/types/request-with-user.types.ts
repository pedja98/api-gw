import { AuthUser } from './auth-user.types'
import { Request } from 'express'

export interface RequestWithUser extends Request {
  user: AuthUser
}
