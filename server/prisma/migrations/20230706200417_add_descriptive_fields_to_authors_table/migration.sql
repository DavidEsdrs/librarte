/*
  Warnings:

  - You are about to alter the column `publicationDate` on the `books_info` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Added the required column `name` to the `authors` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `authors` ADD COLUMN `bio` VARCHAR(191) NULL,
    ADD COLUMN `birthDate` DATETIME NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `books_info` MODIFY `publicationDate` DATETIME NOT NULL;
