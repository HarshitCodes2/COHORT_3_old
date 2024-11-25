-- DropForeignKey
ALTER TABLE "Space" DROP CONSTRAINT "Space_mapId_fkey";

-- AlterTable
ALTER TABLE "Space" ALTER COLUMN "mapId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Space" ADD CONSTRAINT "Space_mapId_fkey" FOREIGN KEY ("mapId") REFERENCES "Map"("id") ON DELETE SET NULL ON UPDATE CASCADE;
