/*
  Warnings:

  - You are about to drop the column `dealId` on the `books` table. All the data in the column will be lost.
  - You are about to alter the column `publicationDate` on the `books_info` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `books` DROP COLUMN `dealId`;

-- AlterTable
ALTER TABLE `books_info` MODIFY `publicationDate` DATETIME NOT NULL;
