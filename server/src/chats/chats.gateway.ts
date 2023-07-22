import { ConnectedSocket, MessageBody, OnGatewayConnection, SubscribeMessage, WebSocketGateway, WebSocketServer, WsException } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { ChatsService } from "./chats.service";
import { ForbiddenException } from "@nestjs/common";
import { CreateMessageDTO } from "./dto/chats.dto";

@WebSocketGateway({ cors: { origin: "*" } })
export class ChatGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server

  constructor(
    private chatsService: ChatsService
  ) {}

  async handleConnection(@ConnectedSocket() client: Socket) {
    let chatId: string | number = client.handshake.query.chatId as string
    if(!chatId) {
      client.disconnect()
      throw new WsException("Invalid chat id!")
    }
    chatId = Number(chatId)
    const user = await this.chatsService.getUserFromSocket(client) // TODO: Do the next lines in a guard (how to do that in a ws gateway?)
    const chat = await this.chatsService.getChatById(chatId)
    const userHasAccessToChat = chat.proponentId === user.id || chat.proposedPartyId === user.id
    if(!userHasAccessToChat) {
      client.disconnect()
      return new WsException("")
    }
    client.join(`chat_${chatId}`)
  }

  @SubscribeMessage("send_message")
  async emitMessages(
    @MessageBody() { chatId, content }: CreateMessageDTO, 
    @ConnectedSocket() socket: Socket
  ) {
    const user = await this.chatsService.getUserFromSocket(socket) // TODO: Do the next lines in a guard (how to do that in a ws gateway?)
    const chat = await this.chatsService.getChatById(chatId)
    const userHasAccessToChat = chat.proponentId === user.id || chat.proposedPartyId === user.id
    if(!userHasAccessToChat) {
      throw new WsException("Forbidden")
    }

    const newMessage = await this.chatsService.createMessage({ 
      content,
      sentById: user.id,
      chatId: 1
    })

    user.hashPassword = undefined // TODO: Avoid including "hashPassword" in the model when querying the user.
                                  // Make sure to exclude this property when performing the queries.
    
    this.server.to(`chat_${chatId}`).emit("new_message", {
      message: newMessage,
      user
    });
  }
}