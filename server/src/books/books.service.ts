import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from "src/prisma/prisma.service";
import { CreateBookDTO } from "./dto/books.dto";

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}

  async createBook(dto: CreateBookDTO & { requester_id: number }) {
    const bookAlreadyExists = await this.prisma.book.findFirst({
      where: {
        title: dto.title
      }
    })

    if(bookAlreadyExists) {
      throw new ConflictException('A book with the given title already exists!')
    }

    

  }
}
