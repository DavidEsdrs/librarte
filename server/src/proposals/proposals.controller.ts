import { Body, Controller, Get, Param, Post, Request } from '@nestjs/common';
import { ProposalsService } from "./proposals.service";
import { CreateProposalDTO } from "./dto/proposals.dto";

@Controller("proposals")
export class ProposalsController {
  constructor(
    private proposalsService: ProposalsService
  ) {}

  @Post("/posts/:id/proposals")
  async createProposal(
    @Request() request,
    @Param("id") id: number,
    @Body() { books }: { books: number[] }
  ) {
    return this.proposalsService.createProposal({ books_ids: books, post_id: id, proponent_id: request.user.sub })
  }

  @Get("/:id")
  async getProposal(
    @Param("id") proposalId: number,
    @Request() request
  ) {
    return this.proposalsService.getProposal({ proposalId, requester_id: request.user.sub })
  }

  @Post("/:id/:_(close|refuse)")
  closeOrRefuseProposal(
    @Param("id") proposalId: number,
    @Request() request
  ) {
    return this.proposalsService.closeOrRefuseProposal({ requester_id: request.user.sub, proposalId })
  }

  @Post("/:id/accept")
  acceptProposal(
    @Param("id") proposalId: number,
    @Request() request
  ) {
    return this.proposalsService.acceptProposal({ requester_id: request.user.sub, proposalId })
  }
}
