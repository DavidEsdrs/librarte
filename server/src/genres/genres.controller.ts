import { Controller, Get, Query } from '@nestjs/common'
import { GenresService } from './genres.service'

@Controller('genres')
export class GenresController {
  /* eslint-disable */
  constructor(private service: GenresService) {}

  @Get('/')
  async getGenres(
    @Query('take') take: number
  ) {
    return this.service.getGenres({ take: take || 10 })
  }
}
