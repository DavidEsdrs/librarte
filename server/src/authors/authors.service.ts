import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { AuthorDTO, AuthorEditDTO } from './dto/authors.dto'
import { Author } from '@prisma/client'

@Injectable()
export class AuthorsService {
  /* eslint-disable */
  constructor(private prisma: PrismaService) {}

  async createAuthor({
    name,
    bio,
    birthDate,
    requester_id,
  }: AuthorDTO & { requester_id: number }): Promise<Author> {
    const requester = await this.prisma.user.findUnique({
      where: {
        id: requester_id,
      },
      include: {
        roles: true,
      },
    })

    if (!requester) {
      throw new UnauthorizedException()
    }

    const canPerformAction = requester.roles.some((r) => r.type === 'ADMIN')

    if (!canPerformAction) {
      throw new ForbiddenException()
    }

    const author = await this.prisma.author.create({
      data: {
        name,
        bio,
        birthDate,
      },
    })

    return author
  }

  async findAuthorById(id: number): Promise<Author> {
    return this.prisma.author.findFirst({
      where: {
        id,
      },
    })
  }

  async editAuthor({
    id,
    requester_id,
    bio,
    birthDate,
    name,
  }: AuthorEditDTO & { requester_id: number; id: number }): Promise<void> {
    const requester = await this.prisma.user.findUnique({
      where: {
        id: requester_id,
      },
      include: {
        roles: true,
      },
    })

    if (!requester) {
      throw new UnauthorizedException()
    }

    const canPerformAction = requester.roles.some((r) => r.type === 'ADMIN')

    if (!canPerformAction) {
      throw new ForbiddenException()
    }

    await this.prisma.author.update({
      where: {
        id,
      },
      data: {
        bio,
        birthDate,
        name,
      },
    })
  }

  async deleteAuthor({
    requester_id,
    author_id,
  }: {
    requester_id: number
    author_id: number
  }) {
    const requester = await this.prisma.user.findUnique({
      where: {
        id: requester_id,
      },
      include: {
        roles: true,
      },
    })

    if (!requester) {
      throw new UnauthorizedException()
    }

    const canPerformAction = requester.roles.some((r) => r.type === 'ADMIN')

    if (!canPerformAction) {
      throw new ForbiddenException()
    }

    await this.prisma.author.delete({
      where: {
        id: author_id,
      },
    })
  }
}
