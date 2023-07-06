import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthController } from './auth/auth.controller'
import { AuthModule } from './auth/auth.module'
import { PrismaModule } from "./prisma/prisma.module"
import { BookInfoModule } from './book-info/book-info.module';
import { BooksModule } from './books/books.module';
import { AuthorsModule } from "./authors/authors.module"

@Module({
  imports: [AuthModule, PrismaModule, BookInfoModule, BooksModule, AuthorsModule],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule {}
