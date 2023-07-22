import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { Post } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class CommentsService {
  /* eslint-disable */
  constructor(private prisma: PrismaService) {}

  async createComment({
    postId,
    userId,
    content,
  }: {
    postId: number
    userId: number
    content: string
  }) {
    const post = await this.prisma.post.findFirst({ where: { id: postId } })

    if (!post) {
      throw new NotFoundException('Post not found')
    }

    if (!post.isOpen) {
      throw new BadRequestException('Post already closed!')
    }

    const comment = await this.prisma.comment.create({
      data: {
        post: {
          connect: {
            id: postId,
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
        content,
      },
    })

    return comment
  }

  async getPostComments({
    postId,
    take,
  }: {
    postId: number
    userId: number
    take?: number
  }) {
    const post = await this.prisma.post.findFirst({
      where: {
        id: postId,
      },
      include: {
        comments: {
          take,
        },
      },
    })

    if (!post) {
      throw new NotFoundException()
    }

    return post.comments
  }
}
