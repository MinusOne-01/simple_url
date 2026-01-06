import express from "express";
import { shortenUrl, redirect } from "./url.controller.js";

const router = express.Router();

router.post("/shorten", shortenUrl);
router.get("/:shortCode", redirect);

export default router;
