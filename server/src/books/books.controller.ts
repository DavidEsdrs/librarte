import { Body, Controller, Post, UseInterceptors, Request, UploadedFiles, Get, Param, UseFilters, ParseFilePipe } from '@nestjs/common';
import { CreateBookDTO } from './dto/books.dto'
import { BooksService } from './books.service'
import { FilesFieldsInterceptor } from 'src/common/interceptors/files-fields.interceptor'
import { UnprocessableEntityExceptionFilter } from "src/common/filters/unprocessable-entity-exception.filter";
import { FileSystemService } from "src/file-system/file-system.service";

@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Post("/")
  @UseInterceptors(FilesFieldsInterceptor)
  @UseFilters(UnprocessableEntityExceptionFilter)
  async createBook(
    @Body() createBookDto: CreateBookDTO,
    @Request() request,
    @UploadedFiles() files: {
      cover: Express.Multer.File[];
      featured_images: Express.Multer.File[];
    }
  ) {
    return this.booksService.createBook({...createBookDto, requester_id: request.user.sub, cover: files.cover, featured_images: files.featured_images})
  }

  @Get("/:id")
  async getBookById(
    @Param("id") id: number
  ) {
    return this.booksService.getBookById(id)
  }
}
