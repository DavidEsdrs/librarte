/*
  Warnings:

  - You are about to alter the column `birthDate` on the `authors` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `publicationDate` on the `books_info` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `authors` MODIFY `birthDate` DATETIME NULL;

-- AlterTable
ALTER TABLE `books_info` MODIFY `publicationDate` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `comments` MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT;
