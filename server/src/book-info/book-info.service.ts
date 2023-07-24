import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateBookInfoDTO } from './dto/book-info.dto'
import fs from 'fs'
import { FileSystemService } from 'src/file-system/file-system.service'

@Injectable()
export class BookInfoService {
  /* eslint-disable */
  constructor(
    private prisma: PrismaService, 
    @Inject('FILE_SYSTEM')
    private fileSystem: FileSystemService
    ) {}

  async createBookInfo({
    isbn,
    publicationDate,
    publicationYear,
    summary,
    totalPages,
    title,
    imageFilePath,
    author
  }: CreateBookInfoDTO & { imageFilePath: string }) {
    const bookInfo = await this.prisma.bookInfo.create({
      data: {
        isbn,
        publicationDate,
        publicationYear,
        summary,
        totalPages,
        title,
        cover: {
          create: {
            imageFilePath
          }
        },
        authors: {
          create: [{ name: author }]
        }
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
