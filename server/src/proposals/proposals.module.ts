import { Module } from '@nestjs/common'
import { ProposalsController } from './proposals.controller'
import { ProposalsService } from './proposals.service'
import { DealsModule } from 'src/deals/deals.module'
import { ChatsModule } from 'src/chats/chats.module'

@Module({
  controllers: [ProposalsController],
  providers: [ProposalsService],
  imports: [DealsModule, ChatsModule],
})
export class ProposalsModule {}
