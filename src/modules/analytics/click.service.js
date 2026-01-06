import { prisma } from "../../config/prisma.js";

export async function logClick({ shortUrlId, req }) {
  try {
    await prisma.clickEvent.create({
      data: {
        shortUrlId,
        ipAddress: req.ip,
        userAgent: req.headers["user-agent"],
        // country & device later
      },
    });
  } catch (err) {
    console.error("Click logging failed", err);
  }
}
