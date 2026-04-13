import { useState, type FormEvent } from "react";
import { Link } from "wouter";
import { ArrowRight, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { submitLead } from "@/lib/submitLead";

const ORANGE = "#D4622A";

const PERSONAL = /@(gmail|yahoo|hotmail|icloud|outlook|aol|live|msn)\./i;

type Props = {
  variant?: "dark" | "light";
  eyebrow?: string;
  title: string;
  subtitle?: string;
};

export default function LeadCaptureBand({
  variant = "dark",
  eyebrow,
  title,
  subtitle,
}: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    const em = email.trim();
    if (!em || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    if (PERSONAL.test(em)) {
      toast.message("Tip: use your company email for priority routing.", {
        description: "You can still continue. We review every request.",
      });
    }
    const parts = name.trim().split(/\s+/);
    const firstName = parts[0] || "";
    const lastName = parts.slice(1).join(" ") || "";
    setBusy(true);
    const res = await submitLead({
      formId: `home-lead-band-${variant}`,
      firstName,
      lastName,
      email: em,
      phone: phone.trim(),
    });
    setBusy(false);
    if (res.ok || res.error === "not_configured") {
      toast.success("Thanks. We’ll reach out shortly.", {
        description: "Prefer faster? Book a call from the next screen.",
      });
      setName("");
      setEmail("");
      setPhone("");
      return;
    }
    toast.error(res.error || "Could not send. Try again or call us.");
  }

  const isDark = variant === "dark";
  const bg = isDark
    ? "linear-gradient(145deg, #0f172a 0%, #1e293b 55%, #0f172a 100%)"
    : "#F8F7F5";
  const border = isDark ? "border-slate-700/80" : "border-slate-200";
  const titleColor = isDark ? "#fff" : "#0F172A";
  const subColor = isDark ? "#94A3B8" : "#64748B";

  return (
    <section
      className={`py-16 md:py-20 border-y ${border}`}
      style={{ background: bg }}
      aria-labelledby="lead-capture-heading"
    >
      <div className="container max-w-4xl">
        {eyebrow && (
          <p
            className="text-center text-xs font-semibold uppercase tracking-[0.2em] mb-3"
            style={{ color: isDark ? ORANGE : ORANGE, fontFamily: "'DM Sans',sans-serif" }}
          >
            {eyebrow}
          </p>
        )}
        <h2
          id="lead-capture-heading"
          className="text-center text-balance mb-3"
          style={{
            fontFamily: "'Sora',sans-serif",
            fontWeight: 800,
            fontSize: "clamp(1.35rem,2.5vw,2rem)",
            color: titleColor,
            lineHeight: 1.2,
          }}
        >
          {title}
        </h2>
        {subtitle && (
          <p
            className="text-center text-pretty mb-8 max-w-2xl mx-auto"
            style={{ fontFamily: "'DM Sans',sans-serif", color: subColor, lineHeight: 1.7 }}
          >
            {subtitle}
          </p>
        )}
        <form
          onSubmit={submit}
          className={`rounded-2xl p-6 md:p-8 border ${isDark ? "border-slate-600/50 bg-slate-900/40" : "border-slate-200 bg-white shadow-sm"}`}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="form-label" htmlFor={`lc-name-${variant}`}>
                Name
              </label>
              <input
                id={`lc-name-${variant}`}
                className="form-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Alex, Owner"
                autoComplete="name"
              />
            </div>
            <div>
              <label className="form-label" htmlFor={`lc-email-${variant}`}>
                Work email
              </label>
              <input
                id={`lc-email-${variant}`}
                type="email"
                className="form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                autoComplete="email"
                required
              />
            </div>
          </div>
          <div className="mb-6">
            <label className="form-label" htmlFor={`lc-phone-${variant}`}>
              Phone
            </label>
            <input
              id={`lc-phone-${variant}`}
              type="tel"
              className="form-input"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="(555) 000-0000"
              autoComplete="tel"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
            <button
              type="submit"
              disabled={busy}
              className="btn-orange text-sm px-8 py-3.5 justify-center disabled:opacity-70"
            >
              {busy ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Sending…
                </>
              ) : (
                <>
                  Request a strategy call <ArrowRight size={16} />
                </>
              )}
            </button>
            <Link href="/contact" className="text-sm font-semibold text-center sm:text-left" style={{ color: ORANGE, fontFamily: "'DM Sans',sans-serif" }}>
              Or open the full contact form →
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}
