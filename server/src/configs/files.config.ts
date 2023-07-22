import { Provider } from '@nestjs/common'
import { extname } from 'path'
import { imageFileFilter } from 'src/common/utils/utils'

export const filesConfigProvider: Provider = {
  provide: 'FILES_CONFIG_PROVIDER',
  useValue: [
    {
      field: 'cover',
      fileFilter: imageFileFilter,
      dest: './uploads/books/cover',
      editFileName(req, file, callback) {
        const fileExtName = extname(file.originalname)
        const name = Date.now()
        const fileName = `cover-${name}${fileExtName}`
        callback(null, fileName)
        return fileName
      },
    },
    {
      field: 'featured_images',
      maxCount: 5,
      fileFilter: imageFileFilter,
      dest: './uploads/books/featuredImages',
      editFileName(req, file, callback) {
        const fileExtName = extname(file.originalname)
        const name = Date.now()
        const fileName = `featured_images-${name}${fileExtName}`
        callback(null, fileName)
        return fileName
      },
    },
  ],
}
