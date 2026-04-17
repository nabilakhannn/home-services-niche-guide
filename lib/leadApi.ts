/**
 * Shared payload + forwarder for Go High Level inbound webhooks.
 * In GHL: Automation → Create workflow → Webhook (trigger) → map JSON fields to contact.
 */

export type LeadSubmission = {
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

export function parseLeadBody(raw: unknown): LeadSubmission {
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

export type GhlPayloadOptions = {
  /** GHL pipeline id (e.g. `pit-…`) for workflow routing; optional. */
  pipelineId?: string;
  /** GHL Location ID — sent as `ghlLocationId` for workflow / mapping; optional. */
  locationId?: string;
};

/**
 * Flat JSON only — GHL Inbound Webhook triggers often reject nested objects / empty bodies.
 * Root `locationId` + `pipelineId` match common workflow mappers; `ghl*` keys kept for compatibility.
 */
export function buildGhlPayload(lead: LeadSubmission, options?: GhlPayloadOptions) {
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

export async function forwardToGhl(webhookUrl: string, payload: unknown): Promise<Response> {
  const body = JSON.stringify(payload);
  const res = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Accept: "application/json",
    },
    body,
  });
  return res;
}
