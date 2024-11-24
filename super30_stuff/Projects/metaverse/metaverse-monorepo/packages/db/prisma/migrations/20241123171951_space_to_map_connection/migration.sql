/*
  Warnings:

  - Added the required column `mapId` to the `Space` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Space" ADD COLUMN     "mapId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Space" ADD CONSTRAINT "Space_mapId_fkey" FOREIGN KEY ("mapId") REFERENCES "Map"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
