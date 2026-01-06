-- CreateTable
CREATE TABLE "UrlDailyStats" (
    "shortUrlId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "totalClicks" INTEGER NOT NULL,
    "mobileClicks" INTEGER NOT NULL,
    "desktopClicks" INTEGER NOT NULL,

    CONSTRAINT "UrlDailyStats_pkey" PRIMARY KEY ("shortUrlId","date")
);

-- CreateIndex
CREATE INDEX "UrlDailyStats_date_idx" ON "UrlDailyStats"("date");
