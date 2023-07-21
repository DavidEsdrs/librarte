import { Injectable, NotFoundException } from '@nestjs/common';
import { Proposal, Book } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class DealsService {
  constructor(
    private prisma: PrismaService
  ) {}

  async createDealPromise({ proposal, requester_id }: { proposal: Proposal & { books: Book[] }, requester_id: number }) {
    const deal = await this.prisma.deal.create({
      data: {
        proposal: {
          connect: {
            id: proposal.id
          }
        },
        proponent: {
          connect: {
            id: proposal.proponentId
          }
        },
        proposedParty: {
          connect: {
            id: requester_id
          }
        },
        state: "DEALING",
        books: {
          connect: proposal.books.map(book => ({ id: book.id }))
        }
      }
    })

    return deal
  }

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
