import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { ChatsService } from './chats.service'
import { CreateMessageDTO } from './dto/chats.dto'
import { UseFilters } from '@nestjs/common'
import { AllExceptionsFilter } from 'src/common/filters/ws-exception.filter'

@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server

  /* eslint-disable */
  constructor(private chatsService: ChatsService) {}

  async handleConnection(@ConnectedSocket() client: Socket) {
    let chatId: string | number = client.handshake.query.chatId as string
    if (!chatId) {
      client.disconnect()
      return
    }
    chatId = Number(chatId)
    const user = await this.chatsService.getUserFromSocket(client) // TODO: Do the next lines in a guard (how to do that in a ws gateway?)
    const chat = await this.chatsService.getChatById(chatId)
    const userHasAccessToChat =
      chat.proponentId === user.id || chat.proposedPartyId === user.id
    if (!userHasAccessToChat) {
      client.disconnect()
      return
    }
    client.join(`chat_${chatId}`)
    const lastMessages = await this.chatsService.getMessages(chatId, { take: 10 })
    client.to(`chat_${chatId}`).emit('last_messages', { lastMessages })
  }

  handleDisconnect(socket: Socket) {
    socket.rooms.forEach(room => socket.leave(room))
  }

  @UseFilters(new AllExceptionsFilter())
  @SubscribeMessage('send_message')
  async emitMessages(
    @MessageBody() { content }: CreateMessageDTO,
    @ConnectedSocket() socket: Socket,
  ) {
    let chatId = Number(socket.handshake.query.chatId as string)
    const user = await this.chatsService.getUserFromSocket(socket) // TODO: Do the next lines in a guard (how to do that in a ws gateway?)
    const chat = await this.chatsService.getChatById(chatId)
    const userHasAccessToChat =
      chat.proponentId === user.id || chat.proposedPartyId === user.id
    if (!userHasAccessToChat) {
      throw new WsException('Forbidden')
    }

    const newMessage = await this.chatsService.createMessage({
      content,
      sentById: user.id,
      chatId,
    })

    user.hashPassword = undefined // TODO: Avoid including "hashPassword" in the model when querying the user.
    // Make sure to exclude this property when performing the queries.

    this.server.to(`chat_${chatId}`).emit('new_message', {
      message: newMessage,
      user,
    })
  }
}
