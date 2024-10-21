-- CreateTable
CREATE TABLE "Writer" (
    "id" TEXT NOT NULL,
    "type" "Media" NOT NULL,
    "personId" TEXT NOT NULL,
    "episodeId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Writer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Writer_personId_episodeId_idx" ON "Writer"("personId", "episodeId");

-- AddForeignKey
ALTER TABLE "Writer" ADD CONSTRAINT "Writer_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Writer" ADD CONSTRAINT "Writer_episodeId_fkey" FOREIGN KEY ("episodeId") REFERENCES "Episode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
