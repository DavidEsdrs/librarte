import {
  Controller,
  Param,
  Post,
  Body,
  Request,
  HttpCode,
  Get,
} from '@nestjs/common'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
  /* eslint-disable */
  constructor(private service: UsersService) {}

  @Post('/:id')
  @HttpCode(204)
  addRole(
    @Param('id') id: number,
    @Body() { type }: { type: 'ADMIN' | 'USER' | 'GUEST' },
    @Request() request,
  ) {
    this.service.addRole({ user_id: id, requester_id: request.sub.id, type })
  }

  @Get()
  getUser(@Request() request) {
    return this.service.getUserById(request.user.sub)
  }
}
