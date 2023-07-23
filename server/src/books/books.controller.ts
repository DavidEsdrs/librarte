import {
  Body,
  Controller,
  Post,
  UseInterceptors,
  Request,
  UploadedFiles,
  Get,
  Param,
  UseFilters,
  UsePipes,
  Response,
  StreamableFile,
} from '@nestjs/common'
import { CreateBookDTO } from './dto/books.dto'
import { BooksService } from './books.service'
import { FilesFieldsInterceptor } from 'src/common/interceptors/files-fields.interceptor'
import { UnprocessableEntityExceptionFilter } from 'src/common/filters/unprocessable-entity-exception.filter'
import { CreateBookPipe } from './pipes/createBook.pipe'
import { Readable } from 'node:stream'
import { Public } from 'src/common/decorators/public.decorator'

@Controller('books')
export class BooksController {
  /* eslint-disable */
  constructor(private booksService: BooksService) {}

  @Post('/')
  @UseInterceptors(FilesFieldsInterceptor)
  @UseFilters(UnprocessableEntityExceptionFilter)
  @UsePipes(CreateBookPipe)
  async createBook(
    @Body() createBookDto: CreateBookDTO,
    @Request() request,
    @UploadedFiles()
    files: {
      cover: Express.Multer.File[]
      featured_images: Express.Multer.File[]
    },
  ) {
    return this.booksService.createBook({
      ...createBookDto,
      requester_id: request.user.sub,
      cover: files.cover,
      featured_images: files.featured_images,
    })
  }

  @Get('/:id')
  async getBookById(@Param('id') id: number) {
    return this.booksService.getBookById(id)
  }

  @Public()
  @Get('/:id/image')
  async getBookImage(@Param('id') id: number, @Response({ passthrough: true }) response) {
    const { stream, book } = await this.booksService.getBookImage(id)
    response.set({
      'Content-Type': 'application/png',
      'Content-Disposition': `inline; filename="${book.coverFilePath}"`,
    })
    return new StreamableFile(stream)
  }
}
