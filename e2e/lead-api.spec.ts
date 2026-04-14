import { test, expect } from "@playwright/test";

/**
 * Exercises POST /api/submit-lead (server forwards JSON to GHL when GHL_INBOUND_WEBHOOK_URL is set).
 * Without a webhook URL, dev + prod correctly return not_configured.
 */
test.describe("Lead API / Go High Level forwarder", () => {
  test("rejects invalid email with 400", async ({ request }) => {
    const res = await request.post("/api/submit-lead", {
      data: { formId: "e2e", email: "not-valid" },
    });
    expect(res.status()).toBe(400);
    const body = await res.json();
    expect(body.ok).toBeFalsy();
  });

  test("accepts valid payload: 200 (forwarded) or 503 (webhook not configured)", async ({
    request,
  }) => {
    const res = await request.post("/api/submit-lead", {
      data: {
        formId: "e2e-playwright",
        email: "lead-e2e@example.com",
        firstName: "Playwright",
      },
    });
    const body = (await res.json()) as { ok?: boolean; error?: string };

    if (res.status() === 503) {
      expect(body).toMatchObject({ ok: false, error: "not_configured" });
      return;
    }

    if (res.status() === 200) {
      expect(body.ok).toBe(true);
      return;
    }

    // Misconfigured or rejected upstream webhook (still proves route + forward ran)
    expect([502, 503]).toContain(res.status());
  });
});
