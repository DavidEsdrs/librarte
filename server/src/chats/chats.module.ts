import { Module } from '@nestjs/common'
import { ChatsController } from './chats.controller'
import { ChatsService } from './chats.service'
import { AuthModule } from 'src/auth/auth.module'
import { ChatGateway } from './chats.gateway'

@Module({
  controllers: [ChatsController],
  providers: [ChatsService, ChatGateway],
  imports: [AuthModule],
  exports: [ChatsService, ChatGateway],
})
export class ChatsModule {}
