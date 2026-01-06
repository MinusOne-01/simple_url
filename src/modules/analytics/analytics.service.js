import { prisma } from "../../config/prisma.js";

export async function getTotalClicks(shortUrlId) {
  return await prisma.clickEvent.count({
    where: { shortUrlId },
  });
}

export async function getClicksByDay(shortUrlId) {
  return await prisma.$queryRaw`
    SELECT
      DATE("clickedAt") AS date,
      COUNT(*)::int AS count
    FROM "ClickEvent"
    WHERE "shortUrlId" = ${shortUrlId}
    GROUP BY DATE("clickedAt")
    ORDER BY date ASC;
  `;
}

export async function getClicksByCountry(shortUrlId) {
  return await prisma.$queryRaw`
    SELECT
      country,
      COUNT(*)::int AS count
    FROM "ClickEvent"
    WHERE "shortUrlId" = ${shortUrlId}
    GROUP BY country;
  `;
}

export async function getClicksByDevice(shortUrlId) {
  return await prisma.$queryRaw`
    SELECT
      "deviceType",
      COUNT(*)::int AS count
    FROM "ClickEvent"
    WHERE "shortUrlId" = ${shortUrlId}
    GROUP BY "deviceType";
  `;
}
