import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Request,
} from '@nestjs/common'
import { CreateBookInfoDTO } from './dto/book-info.dto'
import { BookInfoService } from './book-info.service'

@Controller('book-info')
export class BookInfoController {
  /* eslint-disable */
  constructor(private booksInfoService: BookInfoService) {}

  @Post('/')
  async createBookInfo(@Body() createBookInfoDto: CreateBookInfoDTO) {
    return this.booksInfoService.createBookInfo(createBookInfoDto)
  }

  @Get('/:id')
  async getBookInfoById(@Param('id') id: number) {
    return this.booksInfoService.getBookInfoById(id)
  }

  @Get('/')
  async getBookByIsbn(@Query('isbn') isbn: string) {
    return this.booksInfoService.getBookInfoByIsbn(isbn)
  }
}
