import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class DealsService {
  constructor(
    private prisma: PrismaService
  ) {}

  async updateDeal({ dealId, requester_id }: { dealId: number, requester_id: number }) {
    const deal = await this.prisma.deal.findUnique({
      where: { id: dealId },
      include: {
        proposedParty: true
      }
    })

    if(!deal) {
      throw new NotFoundException("No deal found with the given id")
    }
  }
}
