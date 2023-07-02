import { Body, Controller, Post, UseInterceptors, Request } from '@nestjs/common';
import { CreateBookDTO } from './dto/books.dto'
import { BooksService } from './books.service'
import { FilesFieldsInterceptor } from 'src/common/interceptors/file-name.interceptor'
import { imageFileFilter } from 'src/common/utils/utils'

@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Post("/")
  @UseInterceptors(
    new FilesFieldsInterceptor([
      { field: "cover", fileFilter: imageFileFilter, dest: './uploads/books/cover' },
      { field: "featured_images", maxCount: 5, fileFilter: imageFileFilter, dest: './uploads/books/featuredImages' },
    ])
  )
  async createBook(
    @Body() createBookDto: CreateBookDTO,
    @Request() request
  ) {
    return this.booksService.createBook({...createBookDto, requester_id: request.sub.id})
  }
}
