import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Request,
} from '@nestjs/common'
import { CommentsService } from './comments.service'
import { CreateCommentDTO } from './dto/comments.dto'

@Controller('/:postId/comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Post('/')
  createComment(
    @Body() commentDto: CreateCommentDTO,
    @Param('postId') postId: number,
    @Request() request,
  ) {
    return this.commentsService.createComment({
      content: commentDto.content,
      postId,
      userId: request.user.sub,
    })
  }

  @Get('/')
  getPostComments(
    @Param('postId') postId: number,
    @Request() request,
    @Query('take') take: number,
  ) {
    return this.commentsService.getPostComments({
      postId,
      userId: request.user.sub,
      take,
    })
  }
}
