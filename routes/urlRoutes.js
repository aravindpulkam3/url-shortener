import express from "express";
import { shortenUrl, getStats, deleteUrl } from "../controllers/urlController.js";
import limiter from "../middleware/rateLimiter.js";

const router = express.Router();

router.post("/shorten", limiter, shortenUrl);
router.get("/stats/:code", getStats);
router.delete("/:code", deleteUrl);

export default router;
