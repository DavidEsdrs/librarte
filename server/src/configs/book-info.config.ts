import { Provider } from '@nestjs/common'
import { extname } from 'path'
import { imageFileFilter } from 'src/common/utils/utils'

export const bookInfoConfigProvider: Provider = {
  provide: 'FILES_CONFIG_PROVIDER',
  useValue: [
    {
      field: 'cover',
      fileFilter: imageFileFilter,
      dest: './uploads/book-info/cover',
      editFileName(req, file, callback) {
        const fileExtName = extname(file.originalname)
        const name = Date.now()
        const fileName = `bookinfocover-${name}${fileExtName}`
        callback(null, fileName)
        return fileName
      },
    },
  ],
}
