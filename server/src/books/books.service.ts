import { Injectable, UnprocessableEntityException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateBookDTO } from './dto/books.dto'
import { Book } from '@prisma/client'
import fs from 'fs'
import { FileSystemService } from 'src/file-system/file-system.service'

@Injectable()
export class BooksService {
  /* eslint-disable */
  constructor(private prisma: PrismaService, private fileSystem: FileSystemService) {}

  async createBook(
    dto: CreateBookDTO & { requester_id: number } & {
      cover: Express.Multer.File[]
      featured_images: Express.Multer.File[]
    },
  ): Promise<Book> {
    // TODO: this must be done by a custom pipe
    if (
      !dto.cover ||
      !dto.featured_images ||
      dto.cover.length < 1 ||
      dto.featured_images.length < 1
    ) {
      throw new UnprocessableEntityException(
        "The provided files count isn't valid!",
      )
    }

    try {
      const book = await this.prisma.book.create({
        data: {
          title: dto.title,
          coverFilePath: dto.cover[0].filename,
          images: {
            create: dto.featured_images.map((fi) => ({
              imageFilePath: fi.filename,
            })),
          },
          user: {
            connect: {
              id: dto.requester_id,
            },
          },
          bookInfo: {
            connect: {
              id: dto.bookInfoId,
            },
          },
        },
      })
      /**
       * TODO: remove the names of the files saved of the file system 'uploadedFilesName' array
       * As it is needed just in case of errors
       */
      return book
    } catch {
      throw new UnprocessableEntityException(
        "The provided files count isn't valid!",
      )
    }
  }

  async getBookById(id: number) {
    const book = await this.prisma.book.findFirst({
      where: {
        id,
      },
    })

    return book
  }

  async getBookImage(id: number) {
    const book = await this.prisma.book.findFirst({
      where: {
        id,
      },
    })

    const stream = fs.createReadStream(this.fileSystem.getPath(book.coverFilePath, ['books', 'cover']))

    return { stream, book }
  }
}
