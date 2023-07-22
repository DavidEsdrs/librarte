import { IsDateString, IsOptional, IsString, Length } from 'class-validator'

export class AuthorDTO {
  @IsString()
  @Length(2, 191)
  name: string

  @IsDateString({
    strict: true,
  })
  @IsOptional()
  birthDate?: Date

  @IsString()
  @Length(10, 191)
  @IsOptional()
  bio?: string
}

export class AuthorEditDTO {
  @IsString()
  @Length(2, 191)
  @IsOptional()
  name?: string

  @IsDateString({
    strict: true,
  })
  @IsOptional()
  birthDate?: Date

  @IsString()
  @Length(10, 191)
  @IsOptional()
  bio?: string
}
