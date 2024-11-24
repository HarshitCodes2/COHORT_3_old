/*
  Warnings:

  - You are about to drop the column `mapId` on the `Space` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Space" DROP CONSTRAINT "Space_mapId_fkey";

-- AlterTable
ALTER TABLE "Space" DROP COLUMN "mapId";
