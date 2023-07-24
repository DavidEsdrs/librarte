import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  UnprocessableEntityException,
  Inject,
} from '@nestjs/common'
import { Request, Response } from 'express'
import { FileSystemService } from 'src/file-system/file-system.service'

@Catch(UnprocessableEntityException)
export class UnprocessableEntityExceptionFilter implements ExceptionFilter {
  /* eslint-disable */
  constructor(
    @Inject('FILE_SYSTEM')
    private fileSystem: FileSystemService,
  ) {}

  async catch(exception: UnprocessableEntityException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()
    const status = exception.getStatus()

    let filesNames = this.fileSystem.getUploadedFilesName()

    for (const fileName of filesNames) {
      const [type] = fileName.split('-')
      switch (type) {
        case 'cover':
          await this.fileSystem.deleteFile(fileName, ['books', 'cover'])
          const filteredArray = filesNames.filter((fn) => fn !== fileName)
          filesNames = filteredArray
          this.fileSystem.setUploadedFilesName(filteredArray)
          break
        case 'bookinfocover':
          await this.fileSystem.deleteFile(fileName, ['book-info', 'cover'])
          const filteredArrayBi = filesNames.filter((fn) => fn !== fileName)
          filesNames = filteredArrayBi
          this.fileSystem.setUploadedFilesName(filteredArrayBi)
          break
        case 'featured_images':
          await this.fileSystem.deleteFile(fileName, [
            'books',
            'featuredImages',
          ])
          const filteredArrayFi = filesNames.filter((fn) => fn !== fileName)
          filesNames = filteredArrayFi
          this.fileSystem.setUploadedFilesName(filteredArrayFi)
          break
        default:
          throw new Error('Unkwnown file type')
      }
    }

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: exception.message,
    })
  }
}
