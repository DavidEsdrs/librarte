import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common'
import { BookInfo } from '@prisma/client'
import { map } from 'rxjs'

type BookInfoWithCoverImage = BookInfo & { cover: { imageFilePath: string } }

@Injectable()
export class BookInfoUrlInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest()
    const protocol = request.protocol
    const host = request.get('host')
    const domain = `${protocol}://${host}`

    return next.handle().pipe(
      map((books: BookInfoWithCoverImage[] | BookInfoWithCoverImage) => {
        if (Array.isArray(books)) {
          return books.map((book) => ({
            ...book,
            coverImageUrl:
              book.cover?.imageFilePath &&
              `${domain}/book-info/${book.id}/image`,
            coverFilePath: undefined,
          }))
        } else {
          return {
            ...books,
            cover:
              books.cover?.imageFilePath &&
              `${domain}/book-info/${books.id}/image`,
            coverFilePath: undefined,
          }
        }
      }),
    )
  }
}
