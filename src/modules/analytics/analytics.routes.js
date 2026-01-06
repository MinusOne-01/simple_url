import { summarize } from "./analytics.controller.js";
import express from "express";

const router = express.Router();

router.get("/:shortCode/summary", summarize);

export default router;