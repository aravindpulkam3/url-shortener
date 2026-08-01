import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";
import urlRoutes from "./routes/urlRoutes.js";
import { redirectUrl } from "./controllers/urlController.js";

dotenv.config();
connectDB();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", urlRoutes);
app.get("/:code", redirectUrl);
app.use(errorMessage)

app.listen(process.env.PORT, () => {
  console.log(`hello guys, the Server is running on port ${process.env.PORT}`);
});
