/*
  Warnings:

  - You are about to alter the column `birthDate` on the `authors` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `publicationDate` on the `books_info` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the `_booktogenre` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_booktogenre` DROP FOREIGN KEY `_BookToGenre_A_fkey`;

-- DropForeignKey
ALTER TABLE `_booktogenre` DROP FOREIGN KEY `_BookToGenre_B_fkey`;

-- AlterTable
ALTER TABLE `authors` MODIFY `birthDate` DATETIME NULL;

-- AlterTable
ALTER TABLE `books_info` MODIFY `publicationDate` DATETIME NOT NULL;

-- DropTable
DROP TABLE `_booktogenre`;

-- CreateTable
CREATE TABLE `_BookInfoToGenre` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_BookInfoToGenre_AB_unique`(`A`, `B`),
    INDEX `_BookInfoToGenre_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_BookInfoToGenre` ADD CONSTRAINT `_BookInfoToGenre_A_fkey` FOREIGN KEY (`A`) REFERENCES `books_info`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_BookInfoToGenre` ADD CONSTRAINT `_BookInfoToGenre_B_fkey` FOREIGN KEY (`B`) REFERENCES `genres`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
