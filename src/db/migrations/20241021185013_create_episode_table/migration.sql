-- CreateTable
CREATE TABLE "Episode" (
    "id" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "titleEnglish" TEXT NOT NULL,
    "titleJapanese" TEXT NOT NULL,
    "titleRomaji" TEXT NOT NULL,

    CONSTRAINT "Episode_pkey" PRIMARY KEY ("id")
);
