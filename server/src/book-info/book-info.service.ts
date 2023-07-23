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

  async getBookInfoByIsbn(isbn: string) {
    const bookInfo = await this.prisma.bookInfo.findFirst({
      where: {
        isbn,
      },
    })
    if (!bookInfo) {
      throw new NotFoundException('There is no book with the given isbn!')
    }
    return bookInfo
  }

  async getBooks({ take, skip }: { take?: number, skip?: number }) {
    const books = await this.prisma.bookInfo.findMany({
      include: {
        genres: true
      },
      take,
      skip
    })
    return books
  }

  async getBooksByGenre({ genre, take, skip }: { take?: number, genre: string, skip?: number }) {
    const books = await this.prisma.bookInfo.findMany({
      where: {
        genres: {
          some: {
            name: genre
          }
        }
      },
      take,
      skip
    })
    return books
  }
}
