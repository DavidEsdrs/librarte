import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  UnprocessableEntityException,
} from '@nestjs/common'

@Injectable()
export class BookInfoPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (Object.getPrototypeOf(value) === null) {
      if (!value.cover || value.cover.length <= 0) {
        throw new UnprocessableEntityException(
          'At least one cover image must be given!',
        )
      }

      return value
    }

    return value
  }
}
