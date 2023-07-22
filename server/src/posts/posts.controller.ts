import {
  ParseIntPipe,
  Body,
  Controller,
  Get,
  Post,
  Query,
  Request,
} from '@nestjs/common'
import { PostsService } from './posts.service'
import { PostDTO } from './dto/post.dto'

@Controller('posts')
export class PostsController {
  /* eslint-disable */
  constructor(private postsService: PostsService) {}

  @Post('/')
  async createPost(@Body() bookDto: PostDTO, @Request() request) {
    return this.postsService.createPost({
      ...bookDto,
      requester_id: request.user.sub,
    })
  }

  @Get('/')
  async getPost(@Query('take', new ParseIntPipe()) take: number, @Query('skip', new ParseIntPipe()) skip: number, @Request() request) {
    return this.postsService.getPosts({ take, skip, requester_id: request.user.sub })
  }
}
