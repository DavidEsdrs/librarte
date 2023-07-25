import { Type } from 'class-transformer'
import { IsDateString, IsNumber, IsString, Length } from 'class-validator'
import { IsBeforeNow } from 'src/common/decorators/is-before-now.decorator'

export class CreateBookInfoDTO {
  @IsString()
  @Length(10, 20)
  isbn: string

  @IsString()
  @Length(1, 100)
  title: string

  @IsNumber()
  @IsBeforeNow()
  @Type(() => Number)
  publicationYear: number

  @IsDateString({
    strict: true,
  })
  publicationDate: Date

  @IsNumber()
  @Type(() => Number)
  totalPages: number

  @IsString()
  summary: string

  @IsString()
  author: string
}
