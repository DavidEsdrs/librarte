import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  UnprocessableEntityException,
} from '@nestjs/common'

@Injectable()
export class CreateBookPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (Object.getPrototypeOf(value) === null) {
      if (!value.cover || value.cover.length <= 0) {
        throw new UnprocessableEntityException(
          'At least one cover image must be given!',
        )
      }

      if (!value.featured_images || value.featured_images.length < 1) {
        throw new UnprocessableEntityException(
          'At least one featured image must be given!',
        )
      }

      return value
    }

    return value
  }
}
