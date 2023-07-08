import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { FileSystemModule } from "src/file-system/file-system.module";
import { FileSystemService } from "src/file-system/file-system.service";
import { filesConfigProvider } from "src/configs/files.config";

@Module({
  controllers: [BooksController],
  providers: [
    BooksService,
    {
      provide: "FILE_SYSTEM",
      useClass: FileSystemService
    },
    filesConfigProvider
  ],
  imports: [FileSystemModule]
})
export class BooksModule {}
