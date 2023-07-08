
import { ExceptionFilter, Catch, ArgumentsHost, HttpException, UnprocessableEntityException, Inject } from '@nestjs/common';
import { Request, Response } from 'express';
import { FilesFieldsInterceptor } from "../interceptors/files-fields.interceptor";
import { FileSystemService } from "src/file-system/file-system.service";

@Catch(UnprocessableEntityException)
export class UnprocessableEntityExceptionFilter implements ExceptionFilter {
  constructor(
    @Inject("FILE_SYSTEM")
    private readonly fileSystem: FileSystemService
  ) {}

  async catch(exception: UnprocessableEntityException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const filesNames = this.fileSystem.getUploadedFilesName()

    for (const fileName of filesNames) {
      const [type] = fileName.split('-')
      switch(type) {
        case "cover":
          await this.fileSystem.deleteFile(fileName, ["books", "cover"])
          break
        case "featured_images":
          await this.fileSystem.deleteFile(fileName, ["books", "featured_images"])
          break
        default:
          throw new Error("Unkwnown file type")
      }
    }

    response
      .status(status)
      .json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
  }
}
