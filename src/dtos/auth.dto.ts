import { Expose } from 'class-transformer'
import { Allow, IsNotEmpty, IsNumber, IsString, IsEmail } from 'class-validator'

export class LoginDto {
  @Expose()
  @IsNotEmpty()
  @IsEmail()
  email: string

  @Expose()
  @IsNotEmpty()
  @IsString()
  password: string
}

export class RefreshDto {
  @Expose()
  @IsNotEmpty()
  @IsString()
  refreshToken: string

  @Expose()
  @IsNotEmpty()
  @IsString()
  accessToken: string
}
