# Agent context — ScaleBuds (`home-services-niche-guide`)

## Authoritative Cursor rules

| File | Purpose |
|------|---------|
| **`.cursor/rules/complete-handoff.mdc`** | **Single source of truth** — stack, Vercel, GHL env + webhook + flat JSON payload, chat removed vs single “Free strategy call” FAB, homepage order (stats + industries under hero), shirt overlay, legal (Privacy/Terms Apr 15 2026), `scalebuds-site/` note, file map, e2e. **`alwaysApply: true`** |
| `.cursor/rules/scalebuds-monorepo.mdc` | Pointer → `complete-handoff.mdc` |
| `.cursor/rules/ghl-vercel-env.mdc` | Pointer → `complete-handoff.mdc` |

If your Cursor workspace root is **`HVAC_Marketing_Website/`**, also read **`../.cursor/rules/complete-handoff.mdc`** (same content) and **`../AGENTS.md`**.

## Quick paths

- Env: `.env.example` — `GHL_INBOUND_WEBHOOK_URL`, `GHL_PIPELINE_ID`, `GHL_LOCATION_ID`
- Leads: `lib/leadApi.ts`, `api/submit-lead.ts` (must match), `client/src/lib/submitLead.ts`
- Floating CTA: `client/src/components/LeadFloatingCta.tsx`
- Home: `client/src/pages/Home.tsx`, `client/src/components/IndustriesMarquee.tsx`, `client/src/index.css` (marquee animation)
- No GHL chat script in `client/index.html` by design
