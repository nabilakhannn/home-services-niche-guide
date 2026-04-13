import "dotenv/config";
import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import { buildGhlPayload, forwardToGhl, parseLeadBody } from "../lib/leadApi";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  app.use(express.json({ limit: "48kb" }));

  app.post("/api/submit-lead", async (req, res) => {
    let lead;
    try {
      lead = parseLeadBody(req.body);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "error";
      const clientErr = /email|Invalid|Valid/i.test(msg);
      res.status(clientErr ? 400 : 500).json({ ok: false, error: clientErr ? msg : "server_error" });
      return;
    }

    const webhookUrl = process.env.GHL_INBOUND_WEBHOOK_URL;
    if (!webhookUrl) {
      res.status(503).json({ ok: false, error: "not_configured" });
      return;
    }

    try {
      const payload = buildGhlPayload(lead, {
        pipelineId: process.env.GHL_PIPELINE_ID,
      });
      const upstream = await forwardToGhl(webhookUrl, payload);
      if (!upstream.ok) {
        const t = await upstream.text().catch(() => "");
        console.error("[submit-lead] GHL error", upstream.status, t.slice(0, 200));
        res.status(502).json({ ok: false, error: "upstream_error" });
        return;
      }
      res.json({ ok: true });
    } catch (e) {
      console.error("[submit-lead]", e);
      res.status(500).json({ ok: false, error: "server_error" });
    }
  });

  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
