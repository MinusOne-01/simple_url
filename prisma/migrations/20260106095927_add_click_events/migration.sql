-- CreateTable
CREATE TABLE "ClickEvent" (
    "id" BIGSERIAL NOT NULL,
    "shortUrlId" TEXT NOT NULL,
    "clickedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "country" TEXT,
    "deviceType" TEXT,

    CONSTRAINT "ClickEvent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ClickEvent_shortUrlId_clickedAt_idx" ON "ClickEvent"("shortUrlId", "clickedAt");

-- CreateIndex
CREATE INDEX "ClickEvent_clickedAt_idx" ON "ClickEvent"("clickedAt");
