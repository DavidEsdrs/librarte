import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Book, Deal, Post, Proposal, User } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

interface IncludeOptions {
  books?: boolean;
  deal?: boolean;
  proponent?: boolean;
  post?: boolean;
}

type ProposalWithBooks<T> = T extends { books: true } ? { books: Book[] } : {};
type ProposalWithProponent<T> = T extends { proponent: true } ? { proponent: User } : {};
type ProposalWithDeal<T> = T extends { deal: true } ? { deal: Deal } : {};
type ProposalWithPost<T> = T extends { post: true } ? { post: Post } : {};

type ProposalWithOptions<T> = Proposal & ProposalWithBooks<T> & ProposalWithProponent<T> & ProposalWithDeal<T> & ProposalWithPost<T>;

@Injectable()
export class ProposalsService {
  constructor(
    private prisma: PrismaService
  ) {}

  async createProposal({
    post_id,
    proponent_id,
    books_ids
  }: { proponent_id: number, post_id: number, books_ids: number[] }) {
    const post = await this.prisma.post.findUnique({
      where: { id: post_id }
    })

    if(!post) {
      throw new NotFoundException("Post not found")
    }

    if(post.isOpen !== null && !post.isOpen) {
      throw new BadRequestException("The post is no longer open!")
    }

    const booksPromise = books_ids.map(async id => {
      const book = await this.prisma.book.findFirst({
        where: { id }
      })
      return book
    })

    const books = await Promise.all(booksPromise)

    const areProponentsBooks = books.every(book => book && book.userId === proponent_id)

    if(!areProponentsBooks) {
      throw new ForbiddenException()
    }

    if(books.some(book => book === null)) {
      throw new BadRequestException("Some of the offered books is invalid!")
    }

    const proposal = await this.prisma.proposal.create({
      data: {
        postId: post_id,
        proponentId: proponent_id,
        books: {
          connect: books.map(book => ({ id: book.id }))
        }
      }
    })

    return proposal
  }

  async getProposal({ requester_id, proposalId }: { requester_id: number, proposalId: number }) {
    const proposal = await this.getProposalById(proposalId, { post: true })

    if(!proposal) {
      throw new NotFoundException("No proposal has been found with the given id")
    }

    const canAccessResource = requester_id === proposal.proponentId || requester_id === proposal.post.userId

    if(!canAccessResource) {
      throw new ForbiddenException()
    }

    return proposal
  }

  async closeOrRefuseProposal({ requester_id, proposalId }: { requester_id: number, proposalId: number }) {
    const proposal = await this.getProposalById(proposalId, { post: true })

    if(!proposal) {
      throw new NotFoundException("Proposal not found!")
    }

    const canManageProposal = proposal.proponentId === requester_id || proposal.post.userId === requester_id

    if(!canManageProposal) {
      throw new ForbiddenException()
    }

    await this.prisma.proposal.update({
      where: {
        id: proposalId
      },
      data: {
        isActive: false
      }
    })
  }

  async acceptProposal({ requester_id, proposalId }: { requester_id: number, proposalId: number }) {
    const proposal = await this.getProposalById(proposalId, { post: true, books: true })

    if(!proposal) {
      throw new NotFoundException("No proposal has been found with the given id")
    }

    const isPostCreator = requester_id === proposal.post.userId

    if(!isPostCreator) {
      throw new ForbiddenException()
    }

    if(proposal.isActive !== null && !proposal.isActive) {
      throw new BadRequestException("The proposal was already refused!")
    }

    const updatePayload = { where: { id: proposalId }, data: { isActive: true } }

    await Promise.all([
      this.prisma.proposal.update(updatePayload), 
      this.createDealPromise({ proposal, requester_id }), 
      this.createChatPromise(proposal.proponentId, requester_id)
    ])
  }

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

  async createChatPromise(proponentId: number, requester_id: number) {
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

  private async getProposalById<T extends IncludeOptions>(id: number, include?: T): Promise<ProposalWithOptions<T> | null> {
    const proposal = await this.prisma.proposal.findUnique({
      where: { id },
      include
    })

    return proposal as ProposalWithOptions<T>
  }
}
