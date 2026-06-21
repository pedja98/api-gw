import { IsEnum, IsNotEmpty, IsString } from 'class-validator'
import { UserRole } from '../enums/user-role.enum'

export class AuthUser {
  @IsString()
  @IsNotEmpty()
  id!: string

  @IsEnum(UserRole)
  role!: UserRole
}
