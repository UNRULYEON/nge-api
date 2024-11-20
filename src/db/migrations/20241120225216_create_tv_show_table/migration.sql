-- CreateTable
CREATE TABLE "TVShow" (
    "id" TEXT NOT NULL,
    "titleEnglish" TEXT NOT NULL,
    "titleJapanese" TEXT NOT NULL,
    "titleJapaneseLiteral" TEXT,
    "titleRomaji" TEXT NOT NULL,
    "imageUrl" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TVShow_pkey" PRIMARY KEY ("id")
);
