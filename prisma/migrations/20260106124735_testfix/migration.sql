-- CreateIndex
CREATE INDEX "ClickEvent_shortUrlId_clickedAt_idx" ON "ClickEvent"("shortUrlId", "clickedAt");

-- CreateIndex
CREATE INDEX "ClickEvent_clickedAt_idx" ON "ClickEvent"("clickedAt");
