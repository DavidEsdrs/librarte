import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Inject, Optional } from '@nestjs/common';
import multer, { diskStorage } from 'multer';
import { editFileName } from "../utils/utils";
import { Request } from "express";
import { FileSystemService } from "src/file-system/file-system.service";

type MulterFileFilterCallback = (error: Error | null, acceptFile: boolean) => void;
type MulterFileNameCallback = (error: Error | null, filename: string) => void;

interface FieldRelation { 
    field: string;
    maxCount?: number;
    dest: string;
    fileFilter: (req: Request, file: Express.Multer.File, callback: MulterFileFilterCallback) => void;
    editFileName?: (req: Request, file: Express.Multer.File, callback: MulterFileNameCallback) => string;
}

@Injectable()
export class FilesFieldsInterceptor implements NestInterceptor {
    constructor(
        @Inject("FILES_CONFIG_PROVIDER")
        private fields: FieldRelation[],
        @Inject("FILE_SYSTEM")
        private fileSystemService?: FileSystemService
    ) {}

    async intercept(context: ExecutionContext, next: CallHandler) {
        const multerMiddleware = multer({
            storage: diskStorage({
                destination: (req, file, callback) => {
                    const dest = this.fields.find(fi => fi.field === file.fieldname).dest;
                    callback(null, dest);
                },

                filename: (req, file, callback) => {
                    // Search if a custom file name function was given
                    const fileNameFn = this.fields.find(fi => fi.field === file.fieldname)?.editFileName;
                    const fileName = fileNameFn ? fileNameFn(req, file, callback) : editFileName(req, file, callback)
                    this.fileSystemService.pushUploadedFile(fileName)
                }
            }),
            fileFilter: (req, file, callback) => {
                const fileFilter = this.fields.find(fi => fi.field === file.fieldname).fileFilter;
                return fileFilter(req, file, callback);
            }
        }).fields(this.fields.map(f => ({ name: f.field, maxCount: f.maxCount ?? 1 })));

        const ctx = context.switchToHttp();
        const request = ctx.getRequest();
    
        return new Promise((resolve, reject) => 
            multerMiddleware(request, undefined, (error: any) => error ? reject(error) : resolve(request))
        )
        .then(() => next.handle())
        .catch(error => {
            throw error
        });
    }

}