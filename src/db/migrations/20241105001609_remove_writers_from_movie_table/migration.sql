/*
  Warnings:

  - You are about to drop the column `movieId` on the `Writer` table. All the data in the column will be lost.
  - Made the column `episodeId` on table `Writer` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Writer" DROP CONSTRAINT "Writer_episodeId_fkey";

-- DropForeignKey
ALTER TABLE "Writer" DROP CONSTRAINT "Writer_movieId_fkey";

-- AlterTable
ALTER TABLE "Writer" DROP COLUMN "movieId",
ALTER COLUMN "episodeId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Writer" ADD CONSTRAINT "Writer_episodeId_fkey" FOREIGN KEY ("episodeId") REFERENCES "Episode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
