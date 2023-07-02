import { IsNumber, IsString, Length } from 'class-validator'

export class CreateBookDTO {
  @IsString()
  @Length(1, 100)
  title: string

  @IsNumber()
  publisherId: number
}