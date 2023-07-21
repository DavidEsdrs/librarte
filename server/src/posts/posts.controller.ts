import { Body, Controller, Post, Request } from '@nestjs/common';
import { PostsService } from "./posts.service";
import { PostDTO } from "./dto/post.dto";

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Post("/")
  async createPost(
    @Body() bookDto: PostDTO,
    @Request() request
  ) {
    return this.postsService.createPost({...bookDto, requester_id: request.user.sub})
  }
}
