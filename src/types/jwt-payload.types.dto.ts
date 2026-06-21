import { UserRole } from '../enums/user-role.enum'

export class JwtPayload {
  sub!: string
  role!: UserRole
}
