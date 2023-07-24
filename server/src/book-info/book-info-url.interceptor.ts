import {
  CallHandler,
  ExecutionContext,
  HttpServer,
  Injectable,
  NestInterceptor,
} from '@nestjs/common'
import { Book } from '@prisma/client'
import { map, tap } from 'rxjs'

@Injectable()
export class BookInfoUrlInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest()
    const protocol = request.protocol
    const host = request.get('host')
    const domain = `${protocol}://${host}`

    return next.handle().pipe(
      map((books: Book[]) =>
        books.map((book) => ({
          ...book,
          coverImageUrl:
            book.coverFilePath && `${domain}/book-info/${book.id}/image`,
          coverFilePath: undefined,
        })),
      ),
    )
  }
}
