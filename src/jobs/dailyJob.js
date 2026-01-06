import { prisma } from "../config/prisma.js";

async function aggregate() {
  console.log("Starting daily aggregation...");

  await prisma.$executeRawUnsafe(`
    INSERT INTO "UrlDailyStats" (
      "shortUrlId",
      "date",
      "totalClicks",
      "mobileClicks",
      "desktopClicks"
    )
    SELECT
      "shortUrlId",
      DATE("clickedAt"),
      COUNT(*)::int,
      COUNT(*) FILTER (WHERE "deviceType" = 'mobile')::int,
      COUNT(*) FILTER (WHERE "deviceType" = 'desktop')::int
    FROM "ClickEvent"
    WHERE "clickedAt" >= now() - interval '1 day'
    GROUP BY "shortUrlId", DATE("clickedAt")
    ON CONFLICT ("shortUrlId", "date")
    DO UPDATE SET
      "totalClicks" = EXCLUDED."totalClicks",
      "mobileClicks" = EXCLUDED."mobileClicks",
      "desktopClicks" = EXCLUDED."desktopClicks";
  `);

  console.log("Aggregation done.");
}

aggregate()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
