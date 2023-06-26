/*
  Warnings:

  - You are about to alter the column `publicationDate` on the `books_info` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Added the required column `title` to the `books_info` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `books_info` ADD COLUMN `title` VARCHAR(100) NOT NULL,
    MODIFY `publicationDate` DATETIME NOT NULL;
