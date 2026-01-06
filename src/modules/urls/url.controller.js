import { createShortUrl, getActiveShortUrl } from "./url.service.js";
import { logClick } from "../analytics/click.service.js";

export async function shortenUrl(req, res) {
  const { url, ttlDays } = req.body;

  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  const result = await createShortUrl(url, ttlDays);
  return res.status(201).json(result);
}


export async function redirect(req, res) {
  const { shortCode } = req.params;

  const url = await getActiveShortUrl(shortCode);

  if (!url) {
    return res.status(404).json({ error: "Short URL not found" });
  }
  
  //fire n forget
  logClick({
    shortUrlId: url.id,
    req,
  });

  if (!url.isActive) {
    return res.status(404).json({ error: "Url expired!" });
  }
  
  return res.redirect(302, url.originalUrl);
}
