import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dist = path.join(__dirname, "dist");

app.use(express.json());
app.use(express.static(dist));

app.get("/api/health", (_req, res) => res.json({ ok: true, brand: "SK TECH7" }));

app.get("*splat", (_req, res) => {
  res.sendFile(path.join(dist, "index.html"));
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`SK TECH7 running on port ${port}`));