export type SubmitLeadInput = {
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
  /** Legacy aggregate; still sent for GHL mapping */
  smsConsent?: boolean;
  smsMarketingConsent?: boolean;
  smsTransactionalConsent?: boolean;
};

const API = "/api/submit-lead";

export async function submitLead(body: SubmitLeadInput): Promise<{ ok: boolean; error?: string }> {
  const pageUrl = typeof window !== "undefined" ? window.location.href : "";
  try {
    const res = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...body, pageUrl }),
    });
    const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
    if (!res.ok) {
      const code = data.error;
      return {
        ok: false,
        error: code === "not_configured" ? "not_configured" : code || res.statusText || "Request failed",
      };
    }
    return { ok: Boolean(data.ok) };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Network error" };
  }
}
