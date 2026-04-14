// ScaleBuds Marketing: Footer
// Design: Clean Authority (dark slate bg, burnt orange accents)
import { Link } from "wouter";
import { Mail, MapPin, Phone } from "lucide-react";
import {
  BUSINESS_ADDRESS_LINES,
  BUSINESS_EMAIL,
  BUSINESS_PHONE_DISPLAY,
  businessPhoneHref,
} from "@/config/businessContact";

const LOGO_URL = "/logo-scalebuds.png";

/** Footer service labels map to `/services` section anchors (see `serviceSections.ts`). */
const footerServiceLinks: { label: string; href: string }[] = [
  { label: "AI Phone Assistant", href: "/services#ai-phone-assistant" },
  { label: "Google Ads Management", href: "/services#google-ads-lsa" },
  { label: "Local SEO", href: "/services#local-seo" },
  { label: "Facebook & Instagram Ads", href: "/services#meta-ads" },
  { label: "Google Local Service Ads", href: "/services#google-ads-lsa" },
  { label: "Review Generation", href: "/services#review-generation" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{ backgroundColor: "#0F172A", color: "#CBD5E1" }} className="pt-16 pb-8">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img
                src={LOGO_URL}
                alt="ScaleBuds Marketing logo"
                className="h-12 w-auto"
                style={{ filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.35))" }}
                width={120}
                height={48}
              />
              <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: "1.1rem", color: "#fff" }}>
                Scale<span style={{ color: "oklch(0.60 0.18 42)" }}>Buds</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed text-slate-400 mb-5">
              We help HVAC, plumbing, roofing, and home improvement contractors stop losing leads and start growing with AI-powered marketing that works 24/7.
            </p>
            <div className="flex flex-col gap-3 text-sm">
              <div className="flex items-start gap-2 text-slate-400">
                <MapPin size={14} className="mt-0.5 shrink-0" style={{ color: "oklch(0.60 0.18 42)" }} />
                <span style={{ lineHeight: 1.55 }}>
                  {BUSINESS_ADDRESS_LINES.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </span>
              </div>
              <a
                href={businessPhoneHref()}
                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors no-underline"
              >
                <Phone size={14} style={{ color: "oklch(0.60 0.18 42)" }} />
                {BUSINESS_PHONE_DISPLAY}
              </a>
              <a
                href={`mailto:${BUSINESS_EMAIL}`}
                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors no-underline"
              >
                <Mail size={14} style={{ color: "oklch(0.60 0.18 42)" }} />
                {BUSINESS_EMAIL}
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, color: "#fff", marginBottom: "1rem", fontSize: "0.95rem" }}>
              Services
            </h4>
            <ul className="flex flex-col gap-2 text-sm text-slate-400">
              {footerServiceLinks.map((s) => (
                <li key={s.label}>
                  <Link href={s.href} className="hover:text-white transition-colors no-underline">
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Niches */}
          <div>
            <h4 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, color: "#fff", marginBottom: "1rem", fontSize: "0.95rem" }}>
              Who We Serve
            </h4>
            <ul className="flex flex-col gap-2 text-sm text-slate-400">
              {["HVAC Companies", "Plumbing Contractors", "Roofing Companies", "Electrical Contractors", "Home Improvement", "General Contractors"].map(n => (
                <li key={n}>
                  <Link href="/services" className="hover:text-white transition-colors no-underline">{n}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, color: "#fff", marginBottom: "1rem", fontSize: "0.95rem" }}>
              Company
            </h4>
            <ul className="flex flex-col gap-2 text-sm text-slate-400">
              <li><Link href="/resources" className="hover:text-white transition-colors no-underline">Resources</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors no-underline">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors no-underline">Contact</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-white transition-colors no-underline">Privacy Policy</Link></li>
              <li><Link href="/terms-of-service" className="hover:text-white transition-colors no-underline">Terms of Service</Link></li>
            </ul>

            <div className="mt-8">
              <Link href="/contact">
                <button className="btn-orange text-sm w-full justify-center">
                  Book Free Strategy Call
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© {year} ScaleBuds Marketing. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy-policy" className="hover:text-slate-300 transition-colors no-underline">Privacy Policy</Link>
            <Link href="/terms-of-service" className="hover:text-slate-300 transition-colors no-underline">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
