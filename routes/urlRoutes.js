import express from "express";
import { urlController } from "../controllers/urlController.js";
import limiter from "../middleware/rateLimiter.js";

const router = express.Router();

router.post("/shorten", limiter, urlController.shortenUrl);
router.get("/stats/:code", urlController.getStats);
router.delete("/:code", urlController.deleteUrl);

export default router;
