import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UploadedFiles,
  UseFilters,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common'
import { CreateBookInfoDTO } from './dto/book-info.dto'
import { BookInfoService } from './book-info.service'
import { Public } from 'src/common/decorators/public.decorator'
import { FilesFieldsInterceptor } from 'src/common/interceptors/files-fields.interceptor'
import { UnprocessableEntityExceptionFilter } from 'src/common/filters/unprocessable-entity-exception.filter'
import { BookInfoUrlInterceptor } from './book-info-url.interceptor'
import { BookInfoPipe } from './pipes/book-info.pipe'

@Controller('book-info')
export class BookInfoController {
  /* eslint-disable */
  constructor(private booksInfoService: BookInfoService) {}

  @UseInterceptors(FilesFieldsInterceptor)
  @UseFilters(UnprocessableEntityExceptionFilter)
  @UsePipes(BookInfoPipe)
  @Post('/')
  async createBookInfo(
    @Body() createBookInfoDto: CreateBookInfoDTO,  
    @UploadedFiles()
    files: {
      cover: Express.Multer.File[]
  }) {
    return this.booksInfoService.createBookInfo({...createBookInfoDto, imageFilePath: files.cover[0].filename})
  }

  @Get('/:id')
  async getBookInfoById(@Param('id') id: number) {
    return this.booksInfoService.getBookInfoById(id)
  }

  @Public()
  @Get("/")
  @UseInterceptors(BookInfoUrlInterceptor)
  async getBooks(
    @Query('take') take: number, 
    @Query('skip') skip: number,
    @Query('genre') genre: string,
    @Query('isbn') isbn: string
  ) {
    return this.booksInfoService.getBooks({ take: take || 10, skip: skip || 0, isbn, genre })
  }
}
