import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateBookInfoDTO } from './dto/book-info.dto'

@Injectable()
export class BookInfoService {
  /* eslint-disable */
  constructor(private prisma: PrismaService) {}

  async createBookInfo({
    isbn,
    publicationDate,
    publicationYear,
    summary,
    totalPages,
    title,
  }: CreateBookInfoDTO) {
    const bookInfo = await this.prisma.bookInfo.create({
      data: {
        isbn,
        publicationDate,
        publicationYear,
        summary,
        totalPages,
        title,
      },
    })
    return bookInfo
  }

  async getBookInfoById(id: number) {
    const bookInfo = await this.prisma.bookInfo.findFirst({
      where: {
        id,
      },
    })
    if (!bookInfo) {
      throw new NotFoundException('There is no book with the given id!')
    }
    return bookInfo
  }

  async getBooks({ take, skip, isbn, genre }: { take?: number, skip?: number, isbn?: string, genre?: string }) {
    const books = await this.prisma.bookInfo.findMany({
      where: {
        isbn,
        genres: {
          some: {
            name: genre
          }
        }
      },
      include: {
        genres: true,
        authors: true
      },
      take,
      skip
    })
    return books
  }
}
