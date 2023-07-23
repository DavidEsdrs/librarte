import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common'
import { CreateBookInfoDTO } from './dto/book-info.dto'
import { BookInfoService } from './book-info.service'
import { Public } from 'src/common/decorators/public.decorator'

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

  @Public()
  @Get()
  async getBooks(@Query('take') take: number) {
    return this.booksInfoService.getBooks({ take })
  }
}
