-- CreateEnum
CREATE TYPE "Media" AS ENUM ('MOVIE', 'EPISODE');

-- CreateTable
CREATE TABLE "Director" (
    "id" TEXT NOT NULL,
    "type" "Media" NOT NULL,
    "personId" TEXT NOT NULL,
    "episodeId" TEXT NOT NULL,

    CONSTRAINT "Director_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Director_personId_episodeId_idx" ON "Director"("personId", "episodeId");

-- AddForeignKey
ALTER TABLE "Director" ADD CONSTRAINT "Director_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Director" ADD CONSTRAINT "Director_episodeId_fkey" FOREIGN KEY ("episodeId") REFERENCES "Episode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
