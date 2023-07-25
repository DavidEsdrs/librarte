import { Module } from '@nestjs/common'
import { BookInfoController } from './book-info.controller'
import { BookInfoService } from './book-info.service'
import { FileSystemService } from 'src/file-system/file-system.service'
import { bookInfoConfigProvider } from 'src/configs/book-info.config'

@Module({
  controllers: [BookInfoController],
  providers: [
    BookInfoService,
    {
      provide: 'FILE_SYSTEM',
      useClass: FileSystemService,
    },
    bookInfoConfigProvider,
  ],
})
export class BookInfoModule {}
