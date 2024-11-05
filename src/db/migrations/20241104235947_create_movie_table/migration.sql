-- DropForeignKey
ALTER TABLE "Director" DROP CONSTRAINT "Director_episodeId_fkey";

-- DropForeignKey
ALTER TABLE "Writer" DROP CONSTRAINT "Writer_episodeId_fkey";

-- AlterTable
ALTER TABLE "Director" ADD COLUMN     "movieId" TEXT,
ALTER COLUMN "episodeId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Writer" ADD COLUMN     "movieId" TEXT,
ALTER COLUMN "episodeId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Movie" (
    "id" TEXT NOT NULL,
    "titleEnglish" TEXT NOT NULL,
    "titleJapanese" TEXT NOT NULL,
    "titleJapaneseLiteral" TEXT NOT NULL,
    "titleRomaji" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Movie_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Director" ADD CONSTRAINT "Director_episodeId_fkey" FOREIGN KEY ("episodeId") REFERENCES "Episode"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Director" ADD CONSTRAINT "Director_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Writer" ADD CONSTRAINT "Writer_episodeId_fkey" FOREIGN KEY ("episodeId") REFERENCES "Episode"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Writer" ADD CONSTRAINT "Writer_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE SET NULL ON UPDATE CASCADE;
