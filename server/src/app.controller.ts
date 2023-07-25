import { Controller, Get } from '@nestjs/common'
import { Public } from './common/decorators/public.decorator'

@Controller('/api')
export class AppController {
  @Public()
  @Get('/health')
  async getHealth() {
    return { status_code: 200, ok: true }
  }
}
