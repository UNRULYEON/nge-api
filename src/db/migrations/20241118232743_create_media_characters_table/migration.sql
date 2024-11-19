/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `Character` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Character" DROP COLUMN "imageUrl";

-- CreateTable
CREATE TABLE "MediaCharacter" (
    "id" TEXT NOT NULL,
    "media" "Media" NOT NULL,
    "characterName" TEXT NOT NULL,
    "imageUrl" TEXT,
    "characterId" TEXT NOT NULL,
    "movieId" TEXT,
    "episodeId" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MediaCharacter_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MediaCharacter" ADD CONSTRAINT "MediaCharacter_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MediaCharacter" ADD CONSTRAINT "MediaCharacter_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MediaCharacter" ADD CONSTRAINT "MediaCharacter_episodeId_fkey" FOREIGN KEY ("episodeId") REFERENCES "Episode"("id") ON DELETE SET NULL ON UPDATE CASCADE;
