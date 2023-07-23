import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class GenresService {
  /* eslint-disable */
  constructor(private prisma: PrismaService) {}

  async getGenres({ take }: { take: number }) {
    const genres = this.prisma.genre.findMany({
      take
    })
    return genres
  }
}
