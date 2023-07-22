import { ConnectedSocket, OnGatewayConnection, WebSocketGateway, WebSocketServer, WsException } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { ChatsService } from "./chats.service";

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
}