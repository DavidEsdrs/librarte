import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { PostDTO } from './dto/post.dto'

@Injectable()
export class PostsService {
  /* eslint-disable */
  constructor(private prisma: PrismaService) {}

  async createPost({
    books_ids,
    content,
    requester_id,
  }: PostDTO & { requester_id: number }) {
    const booksPromise = books_ids.map(async (id) => {
      const book = await this.prisma.book.findFirst({ where: { id } })
      return book
    })

    const books = await Promise.all(booksPromise)

    if (!books.every((book) => book && book.userId === requester_id)) {
      throw new ForbiddenException()
    }

    if (books.some((book) => book === null)) {
      throw new BadRequestException('Some of the ids is invalid!')
    }

    const post = await this.prisma.post.create({
      data: {
        content,
        type: books.length > 0 ? 'WITH_BOOK' : 'NORMAL',
        userId: requester_id,
        book: {
          connect: books.map(book => ({ id: book.id }))
        }
      },
    })

    return post
  }

  async getPosts({ take, skip, requester_id }: { take?: number, skip?: number, requester_id: number }) {
    const posts = await this.prisma.post.findMany({
      where: {
        userId: {
          not: requester_id
        }
      },
      include: {
        book: true,
        user: true
      },
      take,
      skip
    })

    return posts
  }
}
