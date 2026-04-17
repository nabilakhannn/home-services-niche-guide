# SMS / TCPA-style opt-in checklist (ScaleBuds Marketing)

Use this to confirm **Phase 2: The Opt-In Architecture (Forms & Checkboxes)** is satisfied on the website and in chat.

## Phase 2: The Opt-In Architecture (Forms & Checkboxes)

- [x] **Website Contact / strategy call form (`/contact`)** — Implemented in `client/src/pages/Contact.tsx`:
  - Full strategy-call layout: name, email, business, phone, trade/niche, service, optional message; policy + email follow-up checkbox
  - **Two separate unchecked-by-default SMS checkboxes** with carrier-style copy:
    1. Marketing SMS (HELP / STOP / rates / frequency language)
    2. Non-marketing (transactional) SMS (same style of disclosures)
  - Terms of Service & Privacy Policy links on the form
  - Submit sends `smsMarketingConsent` and `smsTransactionalConsent` to GoHighLevel via `/api/submit-lead`
  - Phone required (10+ digits) when either SMS box is checked

- [x] **Lead Connector chat widget** — Embedded in `client/index.html` (`widgets.leadconnectorhq.com`, widget id `69de3cc39f3b6f1d886fc688`).  
  **Architecture note:** Checkbox copy and consent capture for chat are configured **inside GoHighLevel** (per location), not in this repo. To mirror the Contact page:
  - In **GoHighLevel** → your location → **Settings** → **Phone numbers** / **SMS** / **Web Chat** (or **Conversations** → chat widget settings), ensure:
    - Phone collection is paired with **explicit SMS consent** language aligned with marketing vs transactional rules your program uses.
    - Disclosures include message frequency, rates, HELP, and STOP, consistent with the Contact form.
  - After any GHL UI change, spot-check the live widget on [scalebuds.com](https://scalebuds.com) or your preview URL.

Legal copy on site: `client/src/pages/PrivacyPolicy.tsx`, `client/src/pages/TermsOfService.tsx` (section 3).
