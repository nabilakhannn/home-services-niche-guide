/**
 * Public business identity (GHL / carrier checklist: visible address, phone, email).
 * Set VITE_PUBLIC_BUSINESS_ADDRESS in Vercel to pipe-separated lines, e.g.:
 *   VITE_PUBLIC_BUSINESS_ADDRESS="971 US HIGHWAY 202N STE R|BRANCHBURG, NEW JERSEY 08876"
 */
export const LEGAL_ENTITY_LINE =
  import.meta.env.VITE_PUBLIC_LEGAL_ENTITY_LINE?.trim() ||
  "NK Digital Enterprise · d/b/a ScaleBuds Marketing";

/** Registered office (override with VITE_PUBLIC_BUSINESS_ADDRESS if it changes) */
const rawAddress =
  import.meta.env.VITE_PUBLIC_BUSINESS_ADDRESS?.trim() ||
  "971 US HIGHWAY 202N STE R|BRANCHBURG, NEW JERSEY 08876";

/** Mailing / physical lines shown in footer and legal pages */
export const BUSINESS_ADDRESS_LINES: string[] = [
  LEGAL_ENTITY_LINE,
  ...String(rawAddress)
    .split("|")
    .map((s) => s.trim())
    .filter(Boolean),
];

export const BUSINESS_EMAIL = "nabila@scalebuds.com";

/** Display + tel: — override with VITE_PUBLIC_BUSINESS_PHONE if different */
export const BUSINESS_PHONE_DISPLAY =
  import.meta.env.VITE_PUBLIC_BUSINESS_PHONE?.trim() || "(609) 977-1129";

export function businessPhoneHref(): string {
  const d = BUSINESS_PHONE_DISPLAY.replace(/\D/g, "");
  if (d.length === 10) return `tel:+1${d}`;
  if (d.length === 11 && d.startsWith("1")) return `tel:+${d}`;
  return `tel:${BUSINESS_PHONE_DISPLAY.replace(/\s/g, "")}`;
}
