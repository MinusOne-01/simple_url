import { prisma } from "../../config/prisma.js";
import { generateShortCode } from "../../utils/shortCode.js";

function normalizeUrl(url) {
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    return `https://${url}`;
  }
  return url;
}

export async function createShortUrl(url, ttlDays) {

  const normalizedUrl = normalizeUrl(url);  
  const shortCode = generateShortCode();
  const expiresAt = ttlDays
    ? new Date(Date.now() + ttlDays * 24 * 60 * 60 * 1000)
    : null;

  const record = await prisma.shortUrl.create({
    data: {
      shortCode,
      originalUrl: normalizedUrl,
      expiresAt,
    },
  });

  return {
    shortCode: record.shortCode,
    shortUrl: `http://localhost:4000/${record.shortCode}`,
    expiresAt: record.expiresAt,
  };
}


export async function getActiveShortUrl(shortCode) {
  const record = await prisma.shortUrl.findFirst({
    where: {
      shortCode,
      isActive: true,
      OR: [
        { expiresAt: null },
        { expiresAt: { gt: new Date() } },
      ],
    },
  });

  return record;
}
