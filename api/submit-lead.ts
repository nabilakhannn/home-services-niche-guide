/**
 * Vercel serverless: POST /api/submit-lead (Express is not run on Vercel static hosting).
 *
 * Logic is duplicated from `lib/leadApi.ts` because Vercel’s function bundler does not
 * reliably include parent-directory imports; keep both files aligned when changing payloads.
 */
type LeadSubmission = {
  formId: string;
  fullName?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  phone?: string;
  companyName?: string;
  niche?: string;
  service?: string;
  message?: string;
  smsConsent?: boolean;
  smsMarketingConsent?: boolean;
  smsTransactionalConsent?: boolean;
  pageUrl?: string;
};

function parseLeadBody(raw: unknown): LeadSubmission {
  if (!raw || typeof raw !== "object") {
    throw new Error("Invalid payload");
  }
  const o = raw as Record<string, unknown>;
  const email = typeof o.email === "string" ? o.email.trim() : "";
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error("Valid email required");
  }
  const formId = typeof o.formId === "string" ? o.formId : "unknown";
  return {
    formId,
    fullName: typeof o.fullName === "string" ? o.fullName : undefined,
    firstName: typeof o.firstName === "string" ? o.firstName : undefined,
    lastName: typeof o.lastName === "string" ? o.lastName : undefined,
    email,
    phone: typeof o.phone === "string" ? o.phone : undefined,
    companyName: typeof o.companyName === "string" ? o.companyName : undefined,
    niche: typeof o.niche === "string" ? o.niche : undefined,
    service: typeof o.service === "string" ? o.service : undefined,
    message: typeof o.message === "string" ? o.message : undefined,
    smsConsent: o.smsConsent === true,
    smsMarketingConsent: o.smsMarketingConsent === true,
    smsTransactionalConsent: o.smsTransactionalConsent === true,
    pageUrl: typeof o.pageUrl === "string" ? o.pageUrl : undefined,
  };
}

function buildGhlPayload(
  lead: LeadSubmission,
  options?: { pipelineId?: string; locationId?: string }
) {
  const name =
    lead.fullName?.trim() ||
    [lead.firstName, lead.lastName].filter(Boolean).join(" ").trim() ||
    undefined;

  const pipelineId = options?.pipelineId?.trim();
  const locationId = options?.locationId?.trim();

  return {
    formId: lead.formId,
    submittedAt: new Date().toISOString(),
    source: "scalebuds-website",
    ...(pipelineId ? { ghlPipelineId: pipelineId, pipelineId } : {}),
    ...(locationId ? { ghlLocationId: locationId, locationId } : {}),
    fullName: name ?? "",
    firstName: lead.firstName ?? "",
    lastName: lead.lastName ?? "",
    email: lead.email,
    phone: lead.phone ?? "",
    companyName: lead.companyName ?? "",
    niche: lead.niche ?? "",
    service: lead.service ?? "",
    message: lead.message ?? "",
    smsConsent: Boolean(lead.smsConsent),
    smsMarketingConsent: Boolean(lead.smsMarketingConsent),
    smsTransactionalConsent: Boolean(lead.smsTransactionalConsent),
    pageUrl: lead.pageUrl ?? "",
  };
}

async function forwardToGhl(webhookUrl: string, payload: unknown): Promise<Response> {
  return fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });
}

type Req = {
  method?: string;
  body?: unknown;
};

type Res = {
  status: (n: number) => Res;
  setHeader: (k: string, v: string) => void;
  json: (b: unknown) => void;
};

export default async function handler(req: Req, res: Res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "method_not_allowed" });
  }

  let raw: unknown = req.body;
  if (typeof raw === "string") {
    try {
      raw = JSON.parse(raw) as unknown;
    } catch {
      return res.status(400).json({ ok: false, error: "invalid_json" });
    }
  }

  let lead: LeadSubmission;
  try {
    lead = parseLeadBody(raw);
  } catch (e) {
    const msg = e instanceof Error ? e.message : "error";
    const clientErr = /email|Invalid|Valid/i.test(msg);
    return res.status(clientErr ? 400 : 500).json({ ok: false, error: clientErr ? msg : "server_error" });
  }

  const webhookUrl = process.env.GHL_INBOUND_WEBHOOK_URL;
  if (!webhookUrl) {
    return res.status(503).json({ ok: false, error: "not_configured" });
  }

  try {
    const payload = buildGhlPayload(lead, {
      pipelineId: process.env.GHL_PIPELINE_ID,
      locationId: process.env.GHL_LOCATION_ID,
    });
    const upstream = await forwardToGhl(webhookUrl, payload);
    if (!upstream.ok) {
      const t = await upstream.text().catch(() => "");
      console.error("[submit-lead] GHL error", upstream.status, t.slice(0, 200));
      return res.status(502).json({ ok: false, error: "upstream_error" });
    }
    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error("[submit-lead]", e);
    return res.status(500).json({ ok: false, error: "server_error" });
  }
}
