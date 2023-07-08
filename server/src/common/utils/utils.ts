import { extname } from 'path'
import { Request } from 'express'
import { FileFilterCallback } from 'multer'

export const editFileName = (req: Request, file: Express.Multer.File, callback: (...args: any) => any) => {
  const fileExtName = extname(file.originalname);
  const name = Date.now();
  const fileName = `${name}${fileExtName}`
  callback(null, fileName);
  return fileName
};

export const imageFileFilter = (req: Request, file: Express.Multer.File, callback: FileFilterCallback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(null, false);
  }
  callback(null, true);
};