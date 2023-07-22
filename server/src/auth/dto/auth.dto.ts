import { IsEmail, IsString, Length } from 'class-validator'

export class LoginDTO {
  @IsEmail()
  email: string

  @IsString()
  @Length(8)
  password: string
}

export class SignUpDTO {
  @IsEmail()
  email: string

  @IsString()
  @Length(8)
  password: string

  @IsString()
  @Length(3)
  username: string

  @IsString()
  @Length(10)
  name: string
}
