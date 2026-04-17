// ScaleBuds Marketing: Contact — compliance-style form (SMS consents + phone); floating CTA removed site-wide
import { useState, useEffect } from "react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JsonLdBreadcrumb from "@/components/JsonLdBreadcrumb";
import type { Crumb } from "@/components/JsonLdBreadcrumb";
import { SITE_ORIGIN } from "@/content/articles";
import { BUSINESS_ADDRESS_LINES, BUSINESS_EMAIL } from "@/config/businessContact";
import { usePageSeo } from "@/hooks/usePageSeo";
import { CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { submitLead } from "@/lib/submitLead";

const BUSINESS_NAME = "ScaleBuds Marketing";
const CONTACT_BREADCRUMB: Crumb[] = [{ name: "Contact", path: "/contact" }];

function digitsOnly(s: string): string {
  return s.replace(/\D/g, "");
}

export default function Contact() {
  usePageSeo({
    title: "Contact ScaleBuds Marketing",
    description:
      "Contact ScaleBuds Marketing — marketing SMS and transactional SMS consent. Home service contractors.",
    path: "/contact",
  });

  useEffect(() => {
    const structured = {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      url: `${SITE_ORIGIN}/contact`,
      name: "Contact ScaleBuds Marketing",
      description: "Contact ScaleBuds Marketing for home service contractor marketing.",
      mainEntity: {
        "@type": "Organization",
        name: BUSINESS_NAME,
        url: SITE_ORIGIN,
        email: BUSINESS_EMAIL,
        address: {
          "@type": "PostalAddress",
          addressCountry: "US",
          streetAddress: BUSINESS_ADDRESS_LINES.slice(1).join(", ") || undefined,
        },
      },
    };
    const id = "jsonld-contact-page";
    let el = document.getElementById(id) as HTMLScriptElement | null;
    if (!el) {
      el = document.createElement("script");
      el.id = id;
      el.type = "application/ld+json";
      document.head.appendChild(el);
    }
    el.textContent = JSON.stringify(structured);
    return () => {
      el?.remove();
    };
  }, []);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    smsMarketing: false,
    smsTransactional: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const phoneDigits = digitsOnly(form.phone);
    if (form.smsMarketing || form.smsTransactional) {
      if (phoneDigits.length < 10) {
        toast.error("Enter a valid mobile number (10+ digits) to opt in to SMS.");
        return;
      }
    }
    setLoading(true);
    const res = await submitLead({
      formId: "contact-sms-compliance",
      fullName: form.fullName.trim(),
      email: form.email.trim(),
      phone: form.phone.trim() || undefined,
      smsMarketingConsent: form.smsMarketing,
      smsTransactionalConsent: form.smsTransactional,
      smsConsent: form.smsMarketing || form.smsTransactional,
    });
    setLoading(false);
    if (res.ok || res.error === "not_configured") {
      setSubmitted(true);
      return;
    }
    toast.error(res.error || "Submission failed. Please email us or try again.");
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main id="main-content" tabIndex={-1}>
        <section className="pt-28 pb-8 border-b border-slate-100">
          <div className="container max-w-lg mx-auto px-4 text-center">
            <JsonLdBreadcrumb items={CONTACT_BREADCRUMB} />
            <h1
              className="mt-4"
              style={{
                fontFamily: "'Sora',sans-serif",
                fontWeight: 800,
                fontSize: "clamp(1.5rem,4vw,1.85rem)",
                color: "#0F172A",
                lineHeight: 1.2,
              }}
            >
              Contact {BUSINESS_NAME}
            </h1>
            <p className="mt-2 text-sm text-slate-500" style={{ fontFamily: "'DM Sans',sans-serif" }}>
              {BUSINESS_ADDRESS_LINES[0]}
            </p>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-slate-50/80">
          <div className="container max-w-lg mx-auto px-4">
            {submitted ? (
              <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50">
                  <CheckCircle2 className="h-8 w-8 text-emerald-600" aria-hidden />
                </div>
                <h2 className="text-lg font-bold text-slate-900" style={{ fontFamily: "'Sora',sans-serif" }}>
                  Thank you
                </h2>
                <p className="mt-2 text-sm text-slate-600" style={{ fontFamily: "'DM Sans',sans-serif", lineHeight: 1.65 }}>
                  We received your submission. If you opted in to SMS, message frequency may vary. Reply STOP to opt out,
                  HELP for help.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm"
                style={{ fontFamily: "'DM Sans',sans-serif" }}
              >
                <div className="space-y-5">
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-slate-900" htmlFor="fullName">
                      Full Name
                    </label>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      required
                      autoComplete="name"
                      value={form.fullName}
                      onChange={handleChange}
                      placeholder="Type your full name"
                      className="form-input w-full rounded-md border-slate-300"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-slate-900" htmlFor="email">
                      Email<span className="text-red-600">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      className="form-input w-full rounded-md border-slate-300"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-slate-900" htmlFor="phone">
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone number here"
                      className="form-input w-full rounded-md border-slate-300"
                    />
                  </div>

                  <div className="space-y-4 pt-2">
                    <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-slate-700">
                      <input
                        type="checkbox"
                        name="smsMarketing"
                        checked={form.smsMarketing}
                        onChange={handleChange}
                        className="mt-1 h-4 w-4 shrink-0 rounded border-slate-300"
                        style={{ accentColor: "#2563eb" }}
                      />
                      <span>
                        I consent to receive marketing text messages from {BUSINESS_NAME} at the phone number provided.
                        Frequency may vary. Message &amp; data rates may apply. Text HELP for assistance, reply STOP to opt
                        out.
                      </span>
                    </label>
                    <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-slate-700">
                      <input
                        type="checkbox"
                        name="smsTransactional"
                        checked={form.smsTransactional}
                        onChange={handleChange}
                        className="mt-1 h-4 w-4 shrink-0 rounded border-slate-300"
                        style={{ accentColor: "#2563eb" }}
                      />
                      <span>
                        I consent to receive non-marketing text messages from {BUSINESS_NAME} about my order updates,
                        appointment reminders etc. Frequency may vary. Message &amp; data rates may apply. Text HELP for
                        assistance, reply STOP to opt out.
                      </span>
                    </label>
                  </div>

                  <p className="text-sm text-blue-600">
                    <Link href="/terms-of-service" className="font-medium underline hover:text-blue-700">
                      Terms of Service
                    </Link>
                    <span className="font-medium">{" & "}</span>
                    <Link href="/privacy-policy" className="font-medium underline hover:text-blue-700">
                      Privacy Policy
                    </Link>
                  </p>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="rounded-md bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 disabled:opacity-60"
                    >
                      {loading ? "Submitting…" : "Submit"}
                    </button>
                  </div>
                </div>
              </form>
            )}

            {!submitted && (
              <p className="mt-8 text-center text-xs text-slate-500" style={{ fontFamily: "'DM Sans',sans-serif" }}>
                Questions?{" "}
                <a href={`mailto:${BUSINESS_EMAIL}`} className="text-slate-700 underline">
                  {BUSINESS_EMAIL}
                </a>
              </p>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
