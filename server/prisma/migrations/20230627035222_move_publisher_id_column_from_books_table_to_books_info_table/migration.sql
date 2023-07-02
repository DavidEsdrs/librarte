/*
  Warnings:

  - You are about to drop the column `publisherId` on the `books` table. All the data in the column will be lost.
  - You are about to alter the column `publicationDate` on the `books_info` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- DropForeignKey
ALTER TABLE `books` DROP FOREIGN KEY `books_publisherId_fkey`;

-- AlterTable
ALTER TABLE `books` DROP COLUMN `publisherId`;

-- AlterTable
ALTER TABLE `books_info` ADD COLUMN `publisherId` INTEGER NULL,
    MODIFY `publicationDate` DATETIME NOT NULL;

-- AddForeignKey
ALTER TABLE `books_info` ADD CONSTRAINT `books_info_publisherId_fkey` FOREIGN KEY (`publisherId`) REFERENCES `publishers`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
