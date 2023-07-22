import {
  IsDate,
  IsDateString,
  IsNumber,
  IsString,
  Length,
  Max,
} from 'class-validator'

export class CreateBookInfoDTO {
  @IsString()
  @Length(10, 20)
  isbn: string

  @IsString()
  @Length(1, 100)
  title: string

  @IsNumber()
  publicationYear: number

  @IsDateString({
    strict: true,
  })
  publicationDate: Date

  @IsNumber()
  totalPages: number

  @IsString()
  summary: string
}
