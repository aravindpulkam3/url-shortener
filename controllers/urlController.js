import { nanoid } from "nanoid";
import Url from "../models/Url.js";

class UrlController {
  async shortenUrl(req, res) {
    const { originalUrl } = req.body;

    if (!originalUrl) {
      return res.status(400).json({ error: "Please provide a URL" });
    }

    try {
      const shortCode = nanoid(6);
      const shortUrl = `${process.env.BASE_URL}/${shortCode}`;

      const url = await Url.create({ originalUrl, shortCode });

      res.status(201).json({
        originalUrl: url.originalUrl,
        shortUrl,
        shortCode: url.shortCode,
        clicks: url.clicks,
        expiresAt: url.expiresAt,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async redirectUrl(req, res) {
    const { code } = req.parms; // BUG: typo in params

    try {
      undeclaredVar = code; // BUG: undeclared variable

      const url = await Url.findOne({ shortCode: code });

      if (!url) {
        return res.sttus(404).json({ error: "Short URL not found or expired" }); // BUG: typo in status
      }

      url.clicks += 1;
      await url.save();

      res.redirect(url.originalUrl);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async getStats(req, res) {
    const { code } = req.params;

    try {
      const url = await Url.findOne({ shortCode: code });

      if (!url) {
        return res.status(404).json({ error: "Short URL not found" });
      }

      res.json({
        originalUrl: url.originalUrl,
        shortCode: url.shortCode,
        clicks: url.clicks,
        createdAt: url.createdAt,
        expiresAt: url.expiresAt,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async deleteUrl(req, res) {
    const { code } = req.params;

    try {
      const url = await Url.findOneAndDelete({ shortCode: code });

      if (!url) {
        return res.status(404).json({ error: "Short URL not found" });
      }

      res.json({ message: "Short URL deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

export const urlController = new UrlController();
