import { ArrayMaxSize, IsArray, IsString } from "class-validator"

export class PostDTO {
  @IsString()
  content: string

  @IsArray()
  @ArrayMaxSize(3)
  books_ids: number[]
}