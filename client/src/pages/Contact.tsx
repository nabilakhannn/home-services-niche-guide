// ScaleBuds Marketing: Contact — full strategy-call layout + dual SMS opt-in checkboxes (TCPA-style)
import { useState, useEffect } from "react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JsonLdBreadcrumb from "@/components/JsonLdBreadcrumb";
import type { Crumb } from "@/components/JsonLdBreadcrumb";
import { SITE_ORIGIN } from "@/content/articles";
import { SERVICE_NAV_ITEMS } from "@/content/serviceSections";
import { BUSINESS_ADDRESS_LINES, BUSINESS_EMAIL } from "@/config/businessContact";
import { usePageSeo } from "@/hooks/usePageSeo";
import { ArrowRight, CheckCircle2, Clock, Mail, MapPin } from "lucide-react";
import { toast } from "sonner";
import { submitLead } from "@/lib/submitLead";

const BUSINESS_NAME = "ScaleBuds Marketing";
const ORANGE = "#D4622A";
const CONTACT_BREADCRUMB: Crumb[] = [{ name: "Contact", path: "/contact" }];

const NICHES = [
  "HVAC",
  "Plumbing",
  "Roofing",
  "Electrical",
  "Remodeling",
  "Landscaping",
  "General contractor",
  "Other",
];

const EXPECT_POINTS = [
  "We audit your current marketing and find revenue leaks",
  "We show you how many calls you're missing and what they're worth",
  "We build a custom 90-day growth plan for your business",
  "Zero pressure. If it's not a fit, we'll tell you.",
];

function digitsOnly(s: string): string {
  return s.replace(/\D/g, "");
}

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  companyName: string;
  phone: string;
  niche: string;
  service: string;
  message: string;
  agreedToTerms: boolean;
  smsMarketing: boolean;
  smsTransactional: boolean;
};

const initialForm: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  companyName: "",
  phone: "",
  niche: "",
  service: "",
  message: "",
  agreedToTerms: false,
  smsMarketing: false,
  smsTransactional: false,
};

export default function Contact() {
  usePageSeo({
    title: "Book a Free Strategy Call | ScaleBuds Marketing",
    description:
      "Book a free strategy call with ScaleBuds Marketing. Marketing and transactional SMS opt-in options. Home service contractors.",
    path: "/contact",
  });

  useEffect(() => {
    const structured = {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      url: `${SITE_ORIGIN}/contact`,
      name: "Contact ScaleBuds Marketing",
      description: "Book a free strategy call with ScaleBuds Marketing for home service contractor marketing.",
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

  const [form, setForm] = useState<FormState>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;
    const checked = type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.agreedToTerms) {
      toast.error("Please confirm you agree to the Privacy Policy and Terms of Service.");
      return;
    }
    if (!form.firstName.trim() || !form.lastName.trim() || !form.companyName.trim() || !form.niche) {
      toast.error("Please fill in all required fields.");
      return;
    }
    const phoneDigits = digitsOnly(form.phone);
    if (form.smsMarketing || form.smsTransactional) {
      if (phoneDigits.length < 10) {
        toast.error("Enter a valid mobile number (10+ digits) to opt in to SMS.");
        return;
      }
    }
    setLoading(true);
    const fn = form.firstName.trim();
    const ln = form.lastName.trim();
    const res = await submitLead({
      formId: "strategy-call-booking",
      firstName: fn,
      lastName: ln,
      fullName: `${fn} ${ln}`.trim(),
      email: form.email.trim(),
      companyName: form.companyName.trim(),
      phone: form.phone.trim() || undefined,
      niche: form.niche,
      service: form.service || undefined,
      message: form.message.trim() || undefined,
      smsMarketingConsent: form.smsMarketing,
      smsTransactionalConsent: form.smsTransactional,
      smsConsent: form.smsMarketing || form.smsTransactional,
    });
    setLoading(false);
    if (res.ok || res.error === "not_configured") {
      setSubmitted(true);
      setForm(initialForm);
      return;
    }
    toast.error(res.error || "Submission failed. Please email us or try again.");
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main id="main-content" tabIndex={-1}>
        <section className="pt-28 pb-6 border-b border-slate-100">
          <div className="container max-w-6xl mx-auto px-4">
            <JsonLdBreadcrumb items={CONTACT_BREADCRUMB} />
            <p className="mt-4 text-center text-sm text-slate-500" style={{ fontFamily: "'DM Sans',sans-serif" }}>
              {BUSINESS_ADDRESS_LINES[0]}
            </p>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-white">
          <div className="container max-w-6xl mx-auto px-4">
            {submitted ? (
              <div className="max-w-lg mx-auto rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50">
                  <CheckCircle2 className="h-8 w-8 text-emerald-600" aria-hidden />
                </div>
                <h2 className="text-lg font-bold text-slate-900" style={{ fontFamily: "'Sora',sans-serif" }}>
                  You&apos;re booked in
                </h2>
                <p
                  className="mt-2 text-sm text-slate-600"
                  style={{ fontFamily: "'DM Sans',sans-serif", lineHeight: 1.65 }}
                >
                  We received your request. If you opted in to SMS, message frequency may vary. Reply STOP to opt out,
                  HELP for help.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
                {/* Left column */}
                <div className="space-y-8">
                  <div>
                    <h2
                      className="text-xl font-bold text-slate-900 mb-6"
                      style={{ fontFamily: "'Sora',sans-serif" }}
                    >
                      What to Expect on the Call
                    </h2>
                    <ol className="space-y-4">
                      {EXPECT_POINTS.map((text, i) => (
                        <li key={i} className="flex gap-3">
                          <span
                            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                            style={{ background: ORANGE, fontFamily: "'Sora',sans-serif" }}
                          >
                            {i + 1}
                          </span>
                          <span className="text-slate-700 pt-1" style={{ fontFamily: "'DM Sans',sans-serif", lineHeight: 1.6 }}>
                            {text}
                          </span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                    <h3 className="font-bold text-slate-900 mb-4" style={{ fontFamily: "'Sora',sans-serif" }}>
                      Mailing &amp; contact
                    </h3>
                    <ul className="space-y-3 text-sm text-slate-700" style={{ fontFamily: "'DM Sans',sans-serif" }}>
                      <li className="flex gap-2">
                        <MapPin className="h-5 w-5 shrink-0 text-slate-500" aria-hidden />
                        <span>
                          {BUSINESS_ADDRESS_LINES.map((line, idx) => (
                            <span key={idx}>
                              {line}
                              {idx < BUSINESS_ADDRESS_LINES.length - 1 ? <br /> : null}
                            </span>
                          ))}
                        </span>
                      </li>
                      <li className="flex gap-2 items-center">
                        <Mail className="h-5 w-5 shrink-0 text-slate-500" aria-hidden />
                        <a href={`mailto:${BUSINESS_EMAIL}`} className="underline" style={{ color: ORANGE }}>
                          {BUSINESS_EMAIL}
                        </a>
                      </li>
                      <li className="flex gap-2 items-center">
                        <Clock className="h-5 w-5 shrink-0 text-slate-500" aria-hidden />
                        <span>Mon to Fri, 9am to 6pm EST</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Right column — form */}
                <div
                  className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm"
                  style={{ fontFamily: "'DM Sans',sans-serif" }}
                >
                  <h2
                    className="text-xl font-bold text-slate-900 mb-6"
                    style={{ fontFamily: "'Sora',sans-serif" }}
                  >
                    Book My Free Strategy Call
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="form-label" htmlFor="firstName">
                          First Name <span className="text-red-600">*</span>
                        </label>
                        <input
                          id="firstName"
                          name="firstName"
                          className="form-input"
                          value={form.firstName}
                          onChange={handleChange}
                          placeholder="John"
                          autoComplete="given-name"
                          required
                        />
                      </div>
                      <div>
                        <label className="form-label" htmlFor="lastName">
                          Last Name <span className="text-red-600">*</span>
                        </label>
                        <input
                          id="lastName"
                          name="lastName"
                          className="form-input"
                          value={form.lastName}
                          onChange={handleChange}
                          placeholder="Smith"
                          autoComplete="family-name"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="form-label" htmlFor="email">
                        Email Address <span className="text-red-600">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        className="form-input"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        autoComplete="email"
                        required
                      />
                    </div>
                    <div>
                      <label className="form-label" htmlFor="companyName">
                        Business Name <span className="text-red-600">*</span>
                      </label>
                      <input
                        id="companyName"
                        name="companyName"
                        className="form-input"
                        value={form.companyName}
                        onChange={handleChange}
                        placeholder="Smith HVAC & Cooling"
                        autoComplete="organization"
                        required
                      />
                    </div>
                    <div>
                      <label className="form-label" htmlFor="phone">
                        Phone Number
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        className="form-input"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="Enter your phone number here"
                        autoComplete="tel"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="form-label" htmlFor="niche">
                          Your Trade / Niche <span className="text-red-600">*</span>
                        </label>
                        <select
                          id="niche"
                          name="niche"
                          className="form-input"
                          value={form.niche}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select your trade…</option>
                          {NICHES.map((n) => (
                            <option key={n} value={n}>
                              {n}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="form-label" htmlFor="service">
                          Service You&apos;re Interested In
                        </label>
                        <select id="service" name="service" className="form-input" value={form.service} onChange={handleChange}>
                          <option value="">Select a service…</option>
                          {SERVICE_NAV_ITEMS.map((s) => (
                            <option key={s.id} value={s.label}>
                              {s.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="form-label" htmlFor="message">
                        Tell Us About Your Business (Optional)
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        className="form-input min-h-[100px] resize-y"
                        value={form.message}
                        onChange={handleChange}
                        placeholder="How many calls do you get per week? What's your biggest marketing challenge?"
                        rows={4}
                      />
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-4">
                      <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-slate-700">
                        <input
                          type="checkbox"
                          name="agreedToTerms"
                          checked={form.agreedToTerms}
                          onChange={handleChange}
                          className="mt-1 h-4 w-4 shrink-0 rounded border-slate-300"
                          style={{ accentColor: ORANGE }}
                        />
                        <span>
                          I have read and agree to the{" "}
                          <Link href="/privacy-policy" className="font-semibold underline" style={{ color: ORANGE }}>
                            Privacy Policy
                          </Link>{" "}
                          and{" "}
                          <Link href="/terms-of-service" className="font-semibold underline" style={{ color: ORANGE }}>
                            Terms of Service
                          </Link>
                          . I request follow-up about this inquiry by email.
                        </span>
                      </label>

                      <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-slate-700">
                        <input
                          type="checkbox"
                          name="smsMarketing"
                          checked={form.smsMarketing}
                          onChange={handleChange}
                          className="mt-1 h-4 w-4 shrink-0 rounded border-slate-300"
                          style={{ accentColor: ORANGE }}
                        />
                        <span>
                          I consent to receive marketing text messages from {BUSINESS_NAME} at the phone number
                          provided. Frequency may vary. Message &amp; data rates may apply. Text HELP for assistance,
                          reply STOP to opt out.
                        </span>
                      </label>
                      <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-slate-700">
                        <input
                          type="checkbox"
                          name="smsTransactional"
                          checked={form.smsTransactional}
                          onChange={handleChange}
                          className="mt-1 h-4 w-4 shrink-0 rounded border-slate-300"
                          style={{ accentColor: ORANGE }}
                        />
                        <span>
                          I consent to receive non-marketing text messages from {BUSINESS_NAME} about my order updates,
                          appointment reminders etc. Frequency may vary. Message &amp; data rates may apply. Text HELP for
                          assistance, reply STOP to opt out.
                        </span>
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-orange w-full justify-center text-base py-3.5 disabled:opacity-70"
                    >
                      {loading ? (
                        "Sending…"
                      ) : (
                        <>
                          Book My Free Strategy Call <ArrowRight size={18} className="inline ml-1" aria-hidden />
                        </>
                      )}
                    </button>
                    <p className="text-xs text-center text-slate-500">
                      Your information is 100% secure. We never share or sell your data. See our{" "}
                      <Link href="/privacy-policy" className="underline font-medium" style={{ color: ORANGE }}>
                        Privacy Policy
                      </Link>
                      .
                    </p>
                  </form>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
