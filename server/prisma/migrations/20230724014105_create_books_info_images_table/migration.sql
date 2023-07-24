/*
  Warnings:

  - You are about to alter the column `birthDate` on the `authors` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `publicationDate` on the `books_info` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `authors` MODIFY `birthDate` DATETIME NULL;

-- AlterTable
ALTER TABLE `books_info` MODIFY `publicationDate` DATETIME NOT NULL;

-- CreateTable
CREATE TABLE `books_info_images` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `imageFilePath` VARCHAR(50) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `bookId` INTEGER NOT NULL,

    UNIQUE INDEX `books_info_images_bookId_key`(`bookId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `books_info_images` ADD CONSTRAINT `books_info_images_bookId_fkey` FOREIGN KEY (`bookId`) REFERENCES `books_info`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
