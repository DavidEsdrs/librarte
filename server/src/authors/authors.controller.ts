import { Body, Controller, Post, Request, Get, Param, Put, HttpCode, Delete } from '@nestjs/common';
import { AuthorDTO, AuthorEditDTO } from "./dto/authors.dto";
import { AuthorsService } from "./authors.service";

@Controller('authors')
export class AuthorsController {
  constructor(private service: AuthorsService) {}

  @Post()
  async createAuthor(
    @Body() dto: AuthorDTO,
    @Request() request
  ) {
    return this.service.createAuthor({...dto, requester_id: request.sub.id})
  }

  @Get("/:id")
  async findAuthorById(
    @Param("id") id: number
  ) {
    return this.service.findAuthorById(id)
  }

  @Put("/:id")
  @HttpCode(204)
  editAuthor(
    @Body() dto: AuthorEditDTO,
    @Param("id") id: number,
    @Request() request
  ) {
    this.service.editAuthor({ ...dto, id, requester_id: request.sub.id })
  }

  @Delete("/:id")
  @HttpCode(204)
  deleteAuthor(
    @Param("id") author_id: number,
    @Request() request
  ) {
    this.service.deleteAuthor({ requester_id: request.sub.id, author_id })
  }
}
