import { Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { PrismaModule } from './prisma/prisma.module'
import { BookInfoModule } from './book-info/book-info.module'
import { BooksModule } from './books/books.module'
import { AuthorsModule } from './authors/authors.module'
import { PostsModule } from './posts/posts.module'
import { ProposalsModule } from './proposals/proposals.module'
import { DealsModule } from './deals/deals.module'
import { CommentsModule } from './comments/comments.module'
import { ChatsModule } from './chats/chats.module'
import { UsersModule } from './users/users.module'
import { GenresModule } from './genres/genres.module'
import { AppController } from './app.controller'

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    BookInfoModule,
    BooksModule,
    AuthorsModule,
    PostsModule,
    ProposalsModule,
    DealsModule,
    CommentsModule,
    ChatsModule,
    UsersModule,
    GenresModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
