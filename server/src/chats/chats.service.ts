import { Injectable } from '@nestjs/common';
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class ChatsService {
  constructor(
    private prisma: PrismaService
  ) {}

  async createChat(proponentId: number, requester_id: number) {
    const chat = await this.prisma.chat.create({
      data: {
        isActive: true,
        proponent: {
          connect: {
            id: proponentId
          }
        },
        proposedParty: {
          connect: {
            id: requester_id
          }
        },
      }
    })

    return chat
  }
}
