import { Injectable, NotFoundException } from '@nestjs/common'
import { WsException } from '@nestjs/websockets'
import { Socket } from 'socket.io'
import { AuthService } from 'src/auth/auth.service'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateMessageDTO } from './dto/chats.dto'

@Injectable()
export class ChatsService {
  /* eslint-disable */
  constructor(
    private prisma: PrismaService,
    private authService: AuthService,
  ) {}

  async createChat(proponentId: number, requester_id: number) {
    const chat = await this.prisma.chat.create({
      data: {
        isActive: true,
        proponent: {
          connect: {
            id: proponentId,
          },
        },
        proposedParty: {
          connect: {
            id: requester_id,
          },
        },
      },
    })

    return chat
  }

  async createMessage({ chatId, content, sentById }: CreateMessageDTO) {
    const newMessage = await this.prisma.message.create({
      data: {
        content,
        chatId,
        sentById,
      },
    })
    return newMessage
  }

  async getUserFromSocket(socket: Socket) {
    const auth_token = socket.handshake.query.authorization as string

    if (!auth_token) {
      throw new WsException('Invalid auth!')
    }

    const user = await this.authService.verifyUserByToken(auth_token)

    if (!user) {
      throw new WsException('Invalid credentials!')
    }

    return user
  }

  async getChatById(id: number) {
    const chat = await this.prisma.chat.findUnique({ where: { id } })
    if (!chat) {
      throw new NotFoundException('The given chat id was not found!')
    }
    return chat
  }
}
