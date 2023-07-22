import { Module } from '@nestjs/common'
import { BookInfoController } from './book-info.controller'
import { BookInfoService } from './book-info.service'

@Module({
  controllers: [BookInfoController],
  providers: [BookInfoService],
})
export class BookInfoModule {}
