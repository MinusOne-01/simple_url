import { prisma } from "../../config/prisma.js";
import { redis } from "../../config/redis.js"
import { generateShortCode } from "../../utils/shortCode.js";

function normalizeUrl(url) {
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    return `https://${url}`;
  }
  return url;
}

const CACHE_PREFIX = "short:";

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

  const cacheKey = `${CACHE_PREFIX}${shortCode}`;

   // 1. Try cache
  const cached = await redis.get(cacheKey);
  if (cached) {
    console.log("cache hit!");
    return JSON.parse(cached);
  }


  // 2. Fallback to DB
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

  if (!record) return null;


  // 3. Compute TTL
  let ttlSeconds = 3600; // default 1 hour

  if (record.expiresAt) {
    ttlSeconds = Math.max(
      Math.floor((record.expiresAt.getTime() - Date.now()) / 1000),
      1
    );
  }

  // 4. Cache
  await redis.setex(cacheKey, ttlSeconds, JSON.stringify(record));
  console.log("db hit!");

  return record;
}
