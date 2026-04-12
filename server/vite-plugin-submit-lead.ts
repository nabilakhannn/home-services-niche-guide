import type { IncomingMessage } from "node:http";
import type { Plugin } from "vite";
import { buildGhlPayload, forwardToGhl, parseLeadBody } from "./leadApi";

function readBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on("data", (c: Buffer) => chunks.push(c));
    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    req.on("error", reject);
  });
}

/** Dev-only: same behavior as production POST /api/submit-lead */
export function vitePluginSubmitLead(
  webhookUrl: string | undefined,
  pipelineId?: string
): Plugin {
  return {
    name: "submit-lead-api",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url?.split("?")[0] !== "/api/submit-lead" || req.method !== "POST") {
          return next();
        }
        const raw = await readBody(req as IncomingMessage);
        let parsed: unknown;
        try {
          parsed = JSON.parse(raw);
        } catch {
          res.statusCode = 400;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ ok: false, error: "invalid_json" }));
          return;
        }
        let lead;
        try {
          lead = parseLeadBody(parsed);
        } catch (e) {
          const msg = e instanceof Error ? e.message : "error";
          const clientErr = /email|Invalid|Valid/i.test(msg);
          res.statusCode = clientErr ? 400 : 500;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ ok: false, error: clientErr ? msg : "server_error" }));
          return;
        }

        if (!webhookUrl) {
          res.statusCode = 503;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ ok: false, error: "not_configured" }));
          return;
        }

        try {
          const payload = buildGhlPayload(lead, { pipelineId });
          const upstream = await forwardToGhl(webhookUrl, payload);
          if (!upstream.ok) {
            const t = await upstream.text().catch(() => "");
            throw new Error(`${upstream.status} ${t.slice(0, 120)}`);
          }
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ ok: true }));
        } catch (e) {
          const msg = e instanceof Error ? e.message : "error";
          const isClient = /email|Invalid|Valid/i.test(msg);
          res.statusCode = isClient ? 400 : 502;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ ok: false, error: isClient ? msg : "upstream_error" }));
        }
      });
    },
  };
}
