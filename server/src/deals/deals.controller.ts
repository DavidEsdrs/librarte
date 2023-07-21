import { Controller, Post } from '@nestjs/common';
import { DealsService } from "./deals.service";

@Controller('deals')
export class DealsController {
  constructor(
    private dealsService: DealsService
  ) {}

  @Post("/")
  async createDeal() {
    
  }
}
