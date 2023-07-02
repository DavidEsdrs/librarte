/*
  Warnings:

  - You are about to alter the column `publicationDate` on the `books_info` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `books` ADD COLUMN `bookInfoId` INTEGER NULL;

-- AlterTable
ALTER TABLE `books_info` MODIFY `publicationDate` DATETIME NOT NULL;

-- AddForeignKey
ALTER TABLE `books` ADD CONSTRAINT `books_bookInfoId_fkey` FOREIGN KEY (`bookInfoId`) REFERENCES `books_info`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
