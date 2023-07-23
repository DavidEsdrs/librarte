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
  async getPost(@Query('take') take: number, @Query('skip') skip: number, @Request() request) {
    return this.postsService.getPosts({ take: take || 10, skip: skip || 0, requester_id: request.user.sub })
  }
}
