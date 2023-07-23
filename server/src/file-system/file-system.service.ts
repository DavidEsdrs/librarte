import { Injectable } from '@nestjs/common'
import path from 'path'
import fs from 'fs'
import { promisify } from 'util'

const unlink = promisify(fs.unlink)

@Injectable()
export class FileSystemService {
  private uploadedFilesName: string[] = []

  async deleteFile(filename: string, filepath: string[]): Promise<boolean> {
    try {
      const pt = path.join('uploads', ...filepath, filename)
      await unlink(pt)
      return true
    } catch {
      return false
    }
  }

  setUploadedFilesName(arr: string[]) {
    this.uploadedFilesName = arr
  }

  getUploadedFilesName(): string[] {
    return this.uploadedFilesName
  }

  pushUploadedFile(filename: string) {
    this.uploadedFilesName.push(filename)
  }

  getPath(filename: string, filepath: string[]) {
    return path.join('uploads', ...filepath, filename)
  }
}
