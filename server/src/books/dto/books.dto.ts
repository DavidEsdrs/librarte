import { Type } from "class-transformer"
import { IsInt, IsNumber, IsOptional, IsString, Length, Min } from 'class-validator'

export class CreateBookDTO {
  @IsString()
  @Length(1, 100)
  @Type(() => String)
  title: string

  @IsInt()
  @Min(0)
  @IsOptional()
  @Type(() => Number)
  bookInfoId?: number
}