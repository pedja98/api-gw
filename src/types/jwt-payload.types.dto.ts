import { UserRole } from 'src/enums/user-role.enum'

export class JwtPayload {
  sub!: string
  role!: UserRole
}
