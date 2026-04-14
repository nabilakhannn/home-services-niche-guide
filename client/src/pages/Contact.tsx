// ScaleBuds Marketing: Contact Page (policies + callback; SMS opt-in via chat widget — GHL compliance)
import { useState, useEffect } from "react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JsonLdBreadcrumb from "@/components/JsonLdBreadcrumb";
import type { Crumb } from "@/components/JsonLdBreadcrumb";
import { SITE_ORIGIN } from "@/content/articles";
import { BUSINESS_ADDRESS_LINES, BUSINESS_EMAIL } from "@/config/businessContact";
import { usePageSeo } from "@/hooks/usePageSeo";
import { Mail, Clock, CheckCircle2, ArrowRight, MapPin } from "lucide-react";
import { toast } from "sonner";
import { submitLead } from "@/lib/submitLead";

const ORANGE = "#D4622A";

const services = [
  "AI Phone Assistant",
  "Google Ads / Local Service Ads",
  "Local SEO",
  "Facebook & Instagram Ads",
  "Review Generation",
  "Speed-to-Lead System",
  "Full Marketing Package",
];

const niches = ["HVAC", "Plumbing", "Roofing", "Electrical", "Home Improvement / Remodeling", "Landscaping", "Other"];

const CONTACT_BREADCRUMB: Crumb[] = [{ name: "Contact", path: "/contact" }];

export default function Contact() {
  usePageSeo({
    title: "Contact ScaleBuds Marketing",
    description:
      "Book a free strategy call or message ScaleBuds. Marketing for HVAC, plumbing, roofing, and home service contractors.",
    path: "/contact",
  });

  useEffect(() => {
    const structured = {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      url: `${SITE_ORIGIN}/contact`,
      name: "Contact ScaleBuds Marketing",
      description:
        "Book a free strategy call with ScaleBuds Marketing for home service contractor marketing.",
      mainEntity: {
        "@type": "Organization",
        name: "ScaleBuds Marketing",
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
    firstName: "", lastName: "", email: "", phone: "",
    businessName: "", niche: "", service: "", message: "",
    acceptedPolicies: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.acceptedPolicies) {
      toast.error("Please confirm you agree to our Privacy Policy and Terms of Service.");
      return;
    }
    setLoading(true);
    const res = await submitLead({
      formId: "contact",
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      phone: form.phone.trim() || undefined,
      companyName: form.businessName,
      niche: form.niche,
      service: form.service,
      message: form.message,
      smsConsent: false,
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
      {/* Header */}
      <section className="pt-32 pb-16" style={{ background: "#0F172A" }}>
        <div className="container max-w-2xl mx-auto text-center">
          <JsonLdBreadcrumb items={CONTACT_BREADCRUMB} />
          <div className="section-divider mx-auto" />
          <h1 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: "clamp(2rem,4vw,2.8rem)", color: "#fff", lineHeight: 1.15, marginBottom: "1rem" }}>
            Book Your Free Strategy Call
          </h1>
          <p style={{ fontFamily: "'DM Sans',sans-serif", color: "#94A3B8", lineHeight: 1.75 }}>
            In 30 minutes, we'll show you exactly how many leads you're losing and build a custom plan to get them back. No commitment. No credit card.
          </p>
        </div>
      </section>

      {/* Main content */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-14 max-w-5xl mx-auto">

            {/* Sidebar info */}
            <div className="lg:col-span-2">
              <h2 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: "1.2rem", color: "#0F172A", marginBottom: "1.5rem" }}>
                What to Expect on the Call
              </h2>
              <div className="flex flex-col gap-4 mb-10">
                {[
                  "We audit your current marketing and find revenue leaks",
                  "We show you how many calls you're missing and what they're worth",
                  "We build a custom 90-day growth plan for your business",
                  "Zero pressure. If it's not a fit, we'll tell you.",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold" style={{ background: ORANGE, color: "#fff", fontFamily: "'Sora',sans-serif" }}>{i + 1}</div>
                    <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.9rem", color: "#475569", lineHeight: 1.6 }}>{item}</span>
                  </div>
                ))}
              </div>

              <div className="rounded-xl p-5 border border-gray-100" style={{ background: "#F8F7F5" }}>
                <h3 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: "0.9rem", color: "#0F172A", marginBottom: "1rem" }}>Mailing & contact</h3>
                <div className="flex flex-col gap-3">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: "rgba(212,98,42,0.1)", color: ORANGE }}>
                      <MapPin size={16} />
                    </div>
                    <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.85rem", color: "#334155", lineHeight: 1.55 }}>
                      {BUSINESS_ADDRESS_LINES.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </span>
                  </div>
                  <a href={`mailto:${BUSINESS_EMAIL}`} className="flex items-center gap-3 group">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(212,98,42,0.1)", color: ORANGE }}>
                      <Mail size={16} />
                    </div>
                    <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.9rem", color: "#334155" }} className="group-hover:underline">{BUSINESS_EMAIL}</span>
                  </a>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(212,98,42,0.1)", color: ORANGE }}>
                      <Clock size={16} />
                    </div>
                    <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.9rem", color: "#334155" }}>Mon to Fri, 9am to 6pm EST</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              {submitted ? (
                <div className="text-center py-16">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5" style={{ background: "rgba(212,98,42,0.1)" }}>
                    <CheckCircle2 size={32} style={{ color: ORANGE }} />
                  </div>
                  <h2 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: "1.6rem", color: "#0F172A", marginBottom: "0.75rem" }}>
                    You're on the Calendar!
                  </h2>
                  <p style={{ fontFamily: "'DM Sans',sans-serif", color: "#64748B", lineHeight: 1.75 }}>
                    We'll reach out within 1 business hour to confirm your strategy call. Check your email and phone for a message from ScaleBuds Marketing.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="form-label">First Name *</label>
                      <input name="firstName" required value={form.firstName} onChange={handleChange} className="form-input" placeholder="John" />
                    </div>
                    <div>
                      <label className="form-label">Last Name *</label>
                      <input name="lastName" required value={form.lastName} onChange={handleChange} className="form-input" placeholder="Smith" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="form-label">Email Address *</label>
                      <input name="email" type="email" required value={form.email} onChange={handleChange} className="form-input" placeholder="john@example.com" />
                    </div>
                    <div>
                      <label className="form-label">Phone (optional)</label>
                      <input name="phone" type="tel" value={form.phone} onChange={handleChange} className="form-input" placeholder="Best number to reach you for your strategy call" autoComplete="tel" />
                    </div>
                  </div>
                  <div>
                    <label className="form-label">Business Name *</label>
                    <input name="businessName" required value={form.businessName} onChange={handleChange} className="form-input" placeholder="Smith HVAC & Cooling" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="form-label">Your Trade / Niche *</label>
                      <select name="niche" required value={form.niche} onChange={handleChange} className="form-input">
                        <option value="">Select your trade...</option>
                        {niches.map(n => <option key={n} value={n}>{n}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="form-label">Service You're Interested In</label>
                      <select name="service" value={form.service} onChange={handleChange} className="form-input">
                        <option value="">Select a service...</option>
                        {services.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="form-label">Tell Us About Your Business (Optional)</label>
                    <textarea name="message" value={form.message} onChange={handleChange} className="form-input" rows={3} placeholder="How many calls do you get per week? What's your biggest marketing challenge?" style={{ resize: "vertical" }} />
                  </div>

                  <div className="rounded-xl p-4 border border-gray-200" style={{ background: "#FAFAFA" }}>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="acceptedPolicies"
                        checked={form.acceptedPolicies}
                        onChange={handleChange}
                        className="mt-1 flex-shrink-0"
                        style={{ accentColor: ORANGE, width: "16px", height: "16px" }}
                        required
                      />
                      <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.8rem", color: "#475569", lineHeight: 1.7 }}>
                        I have read and agree to the{" "}
                        <Link href="/privacy-policy" style={{ color: ORANGE, textDecoration: "underline" }}>Privacy Policy</Link>{" "}
                        and{" "}
                        <Link href="/terms-of-service" style={{ color: ORANGE, textDecoration: "underline" }}>Terms of Service</Link>
                        . I request follow-up about this inquiry by email or phone call. For SMS support messages, use the website chat widget and provide your mobile number there (separate consent in that tool).
                      </span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-orange text-sm px-8 py-3.5 flex items-center gap-2 justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? "Submitting..." : (<>Book My Free Strategy Call <ArrowRight size={16} /></>)}
                  </button>

                  <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.75rem", color: "#94A3B8", textAlign: "center" }}>
                    Your information is 100% secure. We never share or sell your data. See our{" "}
                    <a href="/privacy-policy" style={{ color: ORANGE }}>Privacy Policy</a>.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      </main>
      <Footer />
    </div>
  );
}
