// ScaleBuds Marketing: Home Page
// Design: Clean Authority (white bg, burnt orange CTAs, Sora headlines, asymmetric layout)
// UX Principles: F-pattern reading, visual hierarchy, progressive disclosure, social proof, clear CTAs
// SEO/AEO/GEO optimized with schema markup, FAQ structured data, keyword-rich headings

import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LeadCaptureBand from "@/components/LeadCaptureBand";
import IndustriesMarquee from "@/components/IndustriesMarquee";
import MotionReveal from "@/components/MotionReveal";
import HvacDualRealityShowcase from "@/components/HvacDualRealityShowcase";
import { usePageSeo } from "@/hooks/usePageSeo";
import { articles } from "@/content/articles";
import {
  Mail, CheckCircle2, ArrowRight, Bot,
  ChevronDown, ChevronUp, Clock,
  Quote,
} from "lucide-react";

// ── Image CDN URLs (ultra-realistic final batch) ──
const HERO_IMG    = "https://d2xsxph8kpxj0f.cloudfront.net/310519663206244947/jt9SAM2mN4CpsewZpdVEXA/hero_final-Ntzfdq7xpqFKUpVcM3dcPJ.webp";
const AI_IMG      = "https://d2xsxph8kpxj0f.cloudfront.net/310519663206244947/jt9SAM2mN4CpsewZpdVEXA/ai_phone_final-87xGi7RNUhXrHPNxNmAPEo.webp";
const HVAC_IMG    = "https://d2xsxph8kpxj0f.cloudfront.net/310519663206244947/jt9SAM2mN4CpsewZpdVEXA/hvac_final-VhhUSna7nPcvseBQBb57fo.webp";
const PLUMB_IMG   = "https://d2xsxph8kpxj0f.cloudfront.net/310519663206244947/jt9SAM2mN4CpsewZpdVEXA/plumbing_final-Ga6JjwjPyKVuqv2G5F7ZRF.webp";
const ROOF_IMG    = "https://d2xsxph8kpxj0f.cloudfront.net/310519663206244947/jt9SAM2mN4CpsewZpdVEXA/roofing_final-95Vem9XTkVJkZvUmbNJ9db.webp";

/** “Missed calls” block: robot takes the phone so the tech can work — local asset in `client/public/` */
const ROBOT_HANDOFF_IMG = "/contractor-robot-phone-handoff.jpg";

const ORANGE = "#D4622A";

// ── Intersection Observer hook for scroll animations ──
function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

// ── Animated counter ──
function Counter({ end, suffix, prefix = "" }: { end: number; suffix: string; prefix?: string }) {
  const [val, setVal] = useState(0);
  const { ref, visible } = useInView(0.3);
  const ran = useRef(false);
  useEffect(() => {
    if (!visible || ran.current) return;
    ran.current = true;
    const dur = 1600, steps = 60;
    const inc = end / steps;
    let cur = 0, i = 0;
    const t = setInterval(() => {
      i++; cur += inc;
      if (i >= steps) { setVal(end); clearInterval(t); }
      else setVal(Math.floor(cur));
    }, dur / steps);
  }, [visible, end]);
  return (
    <span ref={ref}>
      {prefix}
      {val}
      {suffix}
    </span>
  );
}

// ── FAQ item ──
function FAQ({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-4 p-5 text-left bg-white hover:bg-gray-50 transition-colors"
        aria-expanded={open}
      >
        <span style={{ fontFamily: "'Sora',sans-serif", fontWeight: 600, fontSize: "0.95rem", color: "#0F172A", lineHeight: 1.4 }}>{q}</span>
        {open
          ? <ChevronUp size={18} style={{ color: ORANGE, flexShrink: 0, marginTop: 2 }} />
          : <ChevronDown size={18} style={{ color: "#94A3B8", flexShrink: 0, marginTop: 2 }} />}
      </button>
      {open && (
        <div className="px-5 pb-5 bg-white">
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.9rem", color: "#475569", lineHeight: 1.75 }}>{a}</p>
        </div>
      )}
    </div>
  );
}

// ── Data ──
const stats: { val: number; suffix: string; label: string; prefix?: string }[] = [
  { prefix: "$", val: 189, suffix: "K", label: "Lost per year from missed calls" },
  { val: 62, suffix: "%", label: "Of calls go unanswered on job sites" },
  { val: 5, suffix: " min", label: "Speed to lead increases close rate 100×" },
  { val: 24, suffix: "/7", label: "AI answers every call, every day" },
];

const niches = [
  { name: "HVAC", img: HVAC_IMG, tag: "Highest Missed Call Rate", stat: "35 to 50% of calls missed during peak season. One missed call equals $500 to $8,000 lost." },
  { name: "Plumbing", img: PLUMB_IMG, tag: "Emergency Driven", stat: "$158B market. Emergency calls go unanswered daily. Homeowners call the next number immediately." },
  { name: "Roofing", img: ROOF_IMG, tag: "Highest Ticket Value", stat: "$7,500 to $12,000 avg job. Storm surges flood phones. Every missed call is a $10K opportunity lost." },
];

const pillars = [
  {
    title: "Capture & book",
    line: "Calls, chats, and missed leads",
    body: "AI answering, instant SMS, and calendar booking so homeowners never hit voicemail when intent is highest.",
    img: AI_IMG,
    alt: "AI assistant booking jobs from inbound calls",
  },
  {
    title: "Paid demand",
    line: "Google & Meta that buy calls",
    body: "LSAs and search campaigns tuned for service intent, plus visual ads when the ticket is visual (roofing, remodel).",
    img: HVAC_IMG,
    alt: "Technician representing high-intent local demand",
  },
  {
    title: "Trust & organic",
    line: "Maps, SEO, and reviews",
    body: "GBP, local pages, and systematic review requests so you earn the click before you pay for it.",
    img: PLUMB_IMG,
    alt: "Plumbing professional representing trust and local visibility",
  },
];

const compactQuotes = [
  { label: "HVAC", sub: "22 trucks, Mid-Atlantic", initials: "DK", quote: "Summer used to mean voicemail roulette. Now calls get answered and booked before we climb the ladder." },
  { label: "Plumbing", sub: "Emergency-first shop", initials: "MR", quote: "Speed-to-lead texts fire the second a form hits. We stopped losing same-hour jobs to the next name on Google." },
  { label: "Roofing", sub: "Storm response", initials: "SL", quote: "Visual ads plus review velocity finally matched our crew capacity. The phone stays the main channel." },
];

const timelineSteps = [
  { range: "Week 1–2", title: "Define & connect", body: "We align on services, zip codes, margins, and seasonality, then connect tracking, call flows, and your calendar." },
  { range: "Week 3–4", title: "Launch & learn", body: "AI answering goes live, LSAs/ads spin up, and first outbound or review flows start with clean measurement." },
  { range: "Month 2", title: "Optimize winners", body: "We cut losers fast, scale what books, and tighten messages using real call and job data." },
  { range: "Month 3", title: "Systematize", body: "Playbooks, lists, and creative get documented so growth repeats without heroics." },
  { range: "After 90 days", title: "Scale or handoff", body: "Quarterly review: pipeline, cost per booked job, and next quarter roadmap, with assets you keep." },
];

const faqs = [
  {
    q: "What are the best marketing services for home improvement and remodeling companies?",
    a: "The strongest home improvement marketing stacks combine local SEO and Google Business Profile, Google Ads and Local Service Ads (where eligible), review generation, Meta ads with project photos, speed-to-lead follow-up, and reliable call answering (including after hours). ScaleBuds bundles these for contractors so spend ties to booked estimates, not vanity metrics. See our guide on the Resources page: “Best Marketing Services for Home Improvement Contractors.”",
  },
  { q: "How does the AI phone assistant work for home service contractors?", a: "Our AI phone assistant answers every inbound call to your business, 24 hours a day, 7 days a week. It greets callers with your business name, qualifies the lead by asking about the service needed and location, and books appointments directly into your calendar. Contractors using our AI assistant report recovering $45,000 to $189,000 in previously lost annual revenue from missed calls." },
  { q: "What is speed-to-lead and why does it matter for HVAC and plumbing businesses?", a: "Speed-to-lead is how quickly a business responds to a new inquiry. Research shows leads contacted within 5 minutes are 21 times more likely to convert than leads contacted after 30 minutes. For HVAC and plumbing, where homeowners call multiple contractors simultaneously, being first to respond is often the difference between winning and losing the job." },
  { q: "How much do home service contractors typically pay per lead?", a: "Lead costs vary by niche. Roofing leads typically cost $80 to $180, HVAC leads $60 to $198, and plumbing leads $55 to $120. With Google Local Service Ads, contractors can often reduce cost per lead by 30 to 50% compared to traditional Google Ads." },
  { q: "What marketing services does ScaleBuds Marketing offer?", a: "ScaleBuds Marketing offers: AI phone answering and speed-to-lead systems, Google Ads and Local Service Ads management, Local SEO and Google Business Profile optimization, Facebook and Instagram advertising, review generation, and after-hours lead capture automation." },
  { q: "Which home service niche benefits most from digital marketing?", a: "HVAC, plumbing, and roofing benefit most because they have high average job tickets ($320 to $12,000+), high emergency urgency, and the highest missed call rates in the industry. Every marketing dollar is highly leveraged." },
];

export default function Home() {
  const statsSection = useInView();
  const pillarsSection = useInView();
  const problemSection = useInView();
  const quotesSection = useInView();
  const nichesSection = useInView();
  const timelineSection = useInView();
  const guidesSection = useInView();
  const faqSection = useInView();

  usePageSeo({
    title: "ScaleBuds Marketing | Home Services Marketing & AI Lead Capture",
    description:
      "Marketing for home improvement, HVAC, plumbing, and roofing: Google and Meta ads, local SEO, AI phone answering, and speed to lead so you stop losing jobs to voicemail.",
    path: "/",
    keywords:
      "home improvement marketing, remodeling marketing, home services marketing, HVAC marketing, plumbing leads, roofing leads, AI phone assistant, Local Service Ads, speed to lead, contractor Google Ads",
  });

  return (
    <div className="min-h-screen bg-white" data-testid="page-home">
      <Navbar />

      <main id="main-content" tabIndex={-1}>
      {/* ─────────────── HERO ─────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden" style={{ paddingTop: "80px" }}>
        <div className="absolute inset-0 z-0">
          <img src={HERO_IMG} alt="Home services contractor with smartphone" className="w-full h-full object-cover object-center" loading="eager" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(100deg, rgba(15,23,42,0.92) 0%, rgba(15,23,42,0.72) 45%, rgba(15,23,42,0.15) 100%)" }} />
          {/* On-photo shirt branding (hero asset is stock; overlay replaces any non–ScaleBuds mark) */}
          <div
            className="absolute z-[5] pointer-events-none select-none"
            style={{
              right: "clamp(3%, 8vw, 14%)",
              bottom: "clamp(14%, 20vh, 30%)",
              transform: "rotate(-4deg)",
            }}
            aria-hidden
          >
            <div
              className="rounded-md px-2.5 py-1.5 sm:px-3 sm:py-2 shadow-xl"
              style={{
                background: "linear-gradient(145deg, rgba(15,23,42,0.94) 0%, rgba(30,41,59,0.9) 100%)",
                border: "1px solid rgba(255,255,255,0.3)",
                boxShadow: "0 10px 28px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.12)",
              }}
            >
              <span
                style={{
                  fontFamily: "'Sora', sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(0.75rem, 2.2vw, 1.2rem)",
                  color: "#FFFFFF",
                  letterSpacing: "-0.03em",
                  lineHeight: 1,
                }}
              >
                Scale<span style={{ color: ORANGE }}>Buds</span>
              </span>
            </div>
          </div>
        </div>

        <div className="container relative z-10 py-24">
          <div className="max-w-xl">
            <div className="mb-8">
              <span
                className="inline-block rounded-full px-5 py-2.5 border backdrop-blur-sm"
                style={{
                  fontFamily: "'DM Sans',sans-serif",
                  fontSize: "clamp(0.9rem, 1.6vw, 1.05rem)",
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#FFEDD5",
                  borderColor: "rgba(253,186,116,0.45)",
                  background: "linear-gradient(135deg, rgba(212,98,42,0.35) 0%, rgba(15,23,42,0.55) 100%)",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.12)",
                }}
              >
                AI-Powered Home Services Marketing
              </span>
            </div>

            <p
              className="mb-6 uppercase tracking-[0.18em] text-xs sm:text-sm font-semibold"
              style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,0.72)" }}
            >
              For HVAC, plumbing & roofing teams ready to scale
            </p>

            {/* H1: primary keywords in opening phrase */}
            <h1 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: "clamp(2.45rem,5.2vw,3.85rem)", lineHeight: 1.08, color: "#FFFFFF", marginBottom: "1.35rem" }}>
              We Make Your Phone Ring.{" "}
              <span style={{ color: "#FDBA74" }}>And AI Books Them For You.</span>
            </h1>

            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "1.2rem", color: "#E8EDF5", lineHeight: 1.72, marginBottom: "2rem", fontWeight: 500 }}>
              Stop losing <strong style={{ color: "#fff" }}>$45,000 to $189,000 a year</strong> in missed calls. ScaleBuds runs your ads, ranks you on Google, and deploys an AI assistant that answers every call. Even when you are on the job.
            </p>

            {/* Trust bullets */}
            <div className="flex flex-wrap gap-x-5 gap-y-2 mb-8">
              {["No missed calls. Ever.", "Leads booked automatically", "Ranked #1 before your competitors"].map(t => (
                <div key={t} className="flex items-center gap-2 text-base" style={{ color: "#D1D9E6", fontFamily: "'DM Sans',sans-serif" }}>
                  <CheckCircle2 size={14} style={{ color: "#FDBA74", flexShrink: 0 }} />
                  {t}
                </div>
              ))}
            </div>

            {/* Primary + secondary CTA (clear visual hierarchy) */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/contact">
                <button className="btn-orange text-sm px-7 py-3.5 rounded-md font-semibold flex items-center gap-2 w-full sm:w-auto justify-center">
                  Book Free Strategy Call <ArrowRight size={16} />
                </button>
              </Link>
              <a href="mailto:nabila@scalebuds.com">
                <button className="flex items-center justify-center gap-2 text-sm font-semibold px-7 py-3.5 rounded-md w-full sm:w-auto transition-colors"
                  style={{ border: "1.5px solid rgba(255,255,255,0.25)", color: "#fff", fontFamily: "'Sora',sans-serif", background: "rgba(255,255,255,0.06)" }}>
                  <Mail size={15} /> Email us
                </button>
              </a>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 opacity-60">
          <div className="w-px h-8 bg-white/40 animate-pulse" />
          <ChevronDown size={14} className="text-white/60" />
        </div>
      </section>

      <HvacDualRealityShowcase />

      {/* Three pillars */}
      <MotionReveal variant="scaleIn">
      <section className="py-20 bg-slate-50 border-b border-slate-100">
        <div
          ref={pillarsSection.ref}
          className={`container transition-all duration-700 ${pillarsSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-sm italic mb-2" style={{ fontFamily: "'DM Sans',sans-serif", color: "#64748B" }}>
              Three ways we grow your calendar
            </p>
            <h2 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: "clamp(1.6rem,2.8vw,2.25rem)", color: "#0F172A", lineHeight: 1.15 }}>
              Capture <em className="not-italic text-[#D4622A]">every</em> lead, buy intent with ads, earn trust with organic
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((p) => (
              <div key={p.title} className="rounded-2xl bg-white border border-slate-200 overflow-hidden flex flex-col shadow-sm hover:-translate-y-0.5 transition-transform duration-300">
                <div className="p-6 flex-1">
                  <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: ORANGE }}>{p.line}</p>
                  <h3 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: "1.15rem", color: "#0F172A", marginBottom: "0.75rem" }}>{p.title}</h3>
                  <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.9rem", color: "#475569", lineHeight: 1.7 }}>{p.body}</p>
                </div>
                <div className="h-44 overflow-hidden">
                  <img src={p.img} alt={p.alt} className="w-full h-full object-cover" loading="lazy" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      </MotionReveal>

      {/* ─────────────── STATS BAR ─────────────── */}
      <section style={{ backgroundColor: "#0F172A" }} className="py-14">
        <div
          ref={statsSection.ref}
          className={`container transition-all duration-700 ${statsSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x-0 md:divide-x divide-slate-700/50">
            {stats.map((s, i) => (
              <div key={i} className="text-center px-4">
                <div style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: "2.25rem", color: ORANGE, lineHeight: 1 }}>
                  <Counter end={s.val} suffix={s.suffix} prefix={s.prefix} />
                </div>
                <p className="mt-2 text-xs text-slate-400 leading-snug" style={{ fontFamily: "'DM Sans',sans-serif" }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <IndustriesMarquee />

      {/* ─────────────── PROBLEM / AI SECTION ─────────────── */}
      <section className="py-24 bg-white">
        <div
          ref={problemSection.ref}
          className={`container transition-all duration-700 delay-100 ${problemSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Text: left column */}
            <div>
              <div className="section-divider" />
              <h2 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: "clamp(1.7rem,2.8vw,2.4rem)", color: "#0F172A", lineHeight: 1.2, marginBottom: "1.25rem" }}>
                Every Unanswered Call Is a Job You're Giving to Your Competitor
              </h2>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "1rem", color: "#475569", lineHeight: 1.8, marginBottom: "1.25rem" }}>
                You're on a rooftop. Under a sink. In someone's attic. Your phone rings and you can't answer. That caller has already dialed the next contractor on Google.
              </p>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "1rem", color: "#475569", lineHeight: 1.8, marginBottom: "2rem" }}>
                The average home service contractor misses <strong style={{ color: "#0F172A" }}>27 to 62% of all inbound calls</strong>. At $500 per job, that's tens of thousands walking out the door every year. And <strong style={{ color: "#0F172A" }}>85% of those callers never call back.</strong>
              </p>

              <div className="flex flex-col gap-3 mb-8">
                {[
                  "You're too busy doing the work to answer the phone",
                  "After hours calls go straight to voicemail and disappear",
                  "Peak season creates a flood of calls you can't handle",
                  "Your competitor answers first and books the job",
                ].map(p => (
                  <div key={p} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: "rgba(212,98,42,0.1)" }}>
                      <div className="w-2 h-2 rounded-full" style={{ background: ORANGE }} />
                    </div>
                    <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.9rem", color: "#475569" }}>{p}</span>
                  </div>
                ))}
              </div>

              <Link href="/contact">
                <button className="btn-orange text-sm px-6 py-3 flex items-center gap-2">
                  Fix My Missed Calls <ArrowRight size={15} />
                </button>
              </Link>
            </div>

            {/* Image: right column with floating badge */}
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl" style={{ aspectRatio: "4/3" }}>
                <img
                  src={ROBOT_HANDOFF_IMG}
                  alt="Futuristic assistant robot taking the phone from a contractor on the job so inbound calls are still answered"
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />
              </div>
              {/* Floating status badge (micro-interaction) */}
              <div className="absolute -bottom-5 -left-4 bg-white rounded-xl shadow-xl p-4 border border-gray-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(212,98,42,0.1)" }}>
                  <Bot size={20} style={{ color: ORANGE }} />
                </div>
                <div>
                  <div style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: "0.8rem", color: "#0F172A" }}>Robot on your line</div>
                  <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.72rem", color: "#64748B" }}>Taking the phone so you can work</div>
                </div>
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse ml-1 flex-shrink-0" />
              </div>
              {/* Floating stat badge */}
              <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-xl p-3 border border-gray-100 text-center">
                <div style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: "1.4rem", color: ORANGE }}>0</div>
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.7rem", color: "#64748B", lineHeight: 1.3 }}>missed<br />calls</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <LeadCaptureBand
        variant="dark"
        eyebrow="Get a tailored plan"
        title="Tell us where leads leak. We’ll map the fix"
        subtitle="Share a work email and the best number to reach you. We respond within one business day."
      />

      {/* Testimonial grid */}
      <MotionReveal variant="slideLeft">
      <section className="py-24" style={{ background: "#F8F7F5" }}>
        <div
          ref={quotesSection.ref}
          className={`container transition-all duration-700 ${quotesSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: "clamp(1.6rem,2.6vw,2.1rem)", color: "#0F172A", lineHeight: 1.2, marginBottom: "0.5rem" }}>
              Don’t take our word for it
            </h2>
            <p style={{ fontFamily: "'DM Sans',sans-serif", color: "#64748B" }}>What operators say once the system is live</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {compactQuotes.map((t) => (
              <blockquote
                key={t.initials + t.label}
                className="rounded-2xl bg-white border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <Quote size={18} style={{ color: ORANGE, opacity: 0.85, marginBottom: 12 }} aria-hidden />
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.9rem", color: "#334155", lineHeight: 1.65, marginBottom: "1rem" }}>
                  {t.quote}
                </p>
                <footer className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0" style={{ background: `linear-gradient(135deg, ${ORANGE}, #9A3D16)` }}>
                    {t.initials}
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: "0.85rem", color: "#0F172A" }}>{t.label}</div>
                    <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.75rem", color: "#64748B" }}>{t.sub}</div>
                  </div>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>
      </MotionReveal>

      {/* ─────────────── WHO WE SERVE ─────────────── */}
      <section className="py-24 bg-white">
        <div
          ref={nichesSection.ref}
          className={`container transition-all duration-700 delay-100 ${nichesSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="section-divider mx-auto" />
            <p className="text-xs font-bold uppercase tracking-[0.2em] mb-2" style={{ fontFamily: "'DM Sans',sans-serif", color: ORANGE }}>
              Who We Serve
            </p>
            <h2 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: "clamp(1.7rem,2.8vw,2.4rem)", color: "#0F172A", lineHeight: 1.2, marginBottom: "1rem" }}>
              Built for the Trades That Can't Afford to Miss a Call
            </h2>
            <p style={{ fontFamily: "'DM Sans',sans-serif", color: "#64748B", lineHeight: 1.75 }}>
              Built for home service contractors — HVAC, plumbing, roofing, electrical, and more. We know your seasonality, your margins, and what it takes to keep your phone ringing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {niches.map((n) => (
              <article key={n.name} className="group rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white">
                <div className="relative overflow-hidden" style={{ height: "220px" }}>
                  <img src={n.img} alt={`${n.name} marketing services`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(15,23,42,0.75) 0%, transparent 55%)" }} />
                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                    <span style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: "1.4rem", color: "#fff" }}>{n.name}</span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: ORANGE, color: "#fff", fontFamily: "'DM Sans',sans-serif" }}>{n.tag}</span>
                  </div>
                </div>
                <div className="p-5">
                  <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.875rem", color: "#475569", lineHeight: 1.7, marginBottom: "1rem" }}>{n.stat}</p>
                  <Link href="/contact">
                    <button className="text-sm font-semibold flex items-center gap-1 transition-colors hover:gap-2" style={{ color: ORANGE, fontFamily: "'DM Sans',sans-serif" }}>
                      Get More {n.name} Leads <ArrowRight size={14} />
                    </button>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────── ROLLOUT CADENCE ─────────────── */}
      <section className="py-24" style={{ background: "#0F172A" }}>
        <div
          ref={timelineSection.ref}
          className={`container transition-all duration-700 delay-100 ${timelineSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="section-divider mx-auto" />
            <h2 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: "clamp(1.7rem,2.8vw,2.4rem)", color: "#fff", lineHeight: 1.2, marginBottom: "1rem" }}>
              Your rollout cadence
            </h2>
            <p style={{ fontFamily: "'DM Sans',sans-serif", color: "#94A3B8", lineHeight: 1.75 }}>
              What happens after onboarding: clear phases, clear expectations.
            </p>
          </div>

          <div className="max-w-2xl mx-auto relative pl-2">
            <div className="absolute left-[15px] top-2 bottom-6 w-px bg-gradient-to-b from-orange-500/50 via-slate-600 to-slate-700" aria-hidden />
            <ul className="space-y-0">
              {timelineSteps.map((step) => (
                <li key={step.range} className="relative pl-12 pb-12 last:pb-0">
                  <div
                    className="absolute left-0 top-1.5 w-[30px] h-[30px] rounded-full border-4 border-slate-900 z-10 flex items-center justify-center"
                    style={{ background: ORANGE }}
                    aria-hidden
                  >
                    <Clock size={14} className="text-white" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest" style={{ color: ORANGE }}>{step.range}</span>
                  <h3 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: "1.05rem", color: "#fff", marginBottom: "0.45rem", marginTop: "0.2rem" }}>{step.title}</h3>
                  <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.9rem", color: "#94A3B8", lineHeight: 1.75 }}>{step.body}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-center mt-6">
            <Link href="/contact">
              <button className="btn-orange text-sm px-8 py-3.5 flex items-center gap-2 mx-auto">
                Start Today. Book Your Free Strategy Call <ArrowRight size={16} />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Marketing guides (SEO / AEO / GEO hub) */}
      <section className="py-20 bg-white border-t border-slate-100" aria-labelledby="guides-heading">
        <div
          ref={guidesSection.ref}
          className={`container max-w-4xl transition-all duration-700 ${guidesSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
            <div>
              <div className="section-divider mb-4" />
              <h2 id="guides-heading" style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: "clamp(1.7rem,2.8vw,2.35rem)", color: "#0F172A", lineHeight: 1.2, marginBottom: "0.5rem" }}>
                Free marketing guides for contractors
              </h2>
              <p style={{ fontFamily: "'DM Sans',sans-serif", color: "#475569", lineHeight: 1.75, maxWidth: "36rem" }}>
                Long-form articles on HVAC and plumbing marketing, Local Service Ads, speed to lead, AI call answering, and more. Written for search and for answer engines that quote clear definitions and steps.
              </p>
            </div>
            <Link href="/resources">
              <button type="button" className="btn-outline-orange text-sm px-6 py-3 whitespace-nowrap">
                View all guides
              </button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {articles.slice(0, 3).map((a) => (
              <article key={a.slug} className="rounded-xl border border-slate-200 bg-slate-50/80 p-5 flex flex-col">
                <h3 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: "1rem", color: "#0F172A", marginBottom: "0.5rem", lineHeight: 1.35 }}>
                  {a.title}
                </h3>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.875rem", color: "#64748B", lineHeight: 1.65, flex: 1, marginBottom: "1rem" }}>
                  {a.description}
                </p>
                <Link href={`/resources/${a.slug}`} className="text-sm font-semibold no-underline" style={{ color: ORANGE, fontFamily: "'DM Sans',sans-serif" }}>
                  Read article →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-white">
        <div
          ref={faqSection.ref}
          className={`container transition-all duration-700 delay-100 ${faqSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <div className="section-divider mx-auto" />
              <h2 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: "clamp(1.7rem,2.8vw,2.4rem)", color: "#0F172A", lineHeight: 1.2, marginBottom: "1rem" }}>
                Frequently Asked Questions
              </h2>
              <p style={{ fontFamily: "'DM Sans',sans-serif", color: "#64748B" }}>
                Everything home service contractors ask before getting started.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              {faqs.map(f => <FAQ key={f.q} q={f.q} a={f.a} />)}
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────── FINAL CTA BANNER ─────────────── */}
      <section className="py-20 relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${ORANGE} 0%, #B34E20 100%)` }}>
        {/* Subtle texture overlay */}
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
        <div className="container relative z-10 text-center">
          <h2 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: "clamp(1.7rem,3vw,2.5rem)", color: "#fff", marginBottom: "1rem", lineHeight: 1.2 }}>
            Ready to Stop Losing Leads?
          </h2>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "1.1rem", color: "rgba(255,255,255,0.85)", lineHeight: 1.75, marginBottom: "2.5rem", maxWidth: "520px", margin: "0 auto 2.5rem" }}>
            Book your free strategy call. We'll show you exactly how many leads you're losing and how to get them back.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <button className="bg-white text-slate-900 font-bold px-9 py-3.5 rounded-md hover:bg-orange-50 transition-colors text-sm flex items-center gap-2 justify-center" style={{ fontFamily: "'Sora',sans-serif" }}>
                Book Free Strategy Call <ArrowRight size={16} />
              </button>
            </Link>
            <a href="mailto:nabila@scalebuds.com">
              <button className="border-2 border-white/60 text-white font-semibold px-9 py-3.5 rounded-md hover:bg-white/10 transition-colors text-sm flex items-center gap-2 justify-center" style={{ fontFamily: "'Sora',sans-serif" }}>
                <Mail size={16} /> Email us
              </button>
            </a>
          </div>
          <p className="mt-6 text-xs" style={{ color: "rgba(255,255,255,0.55)", fontFamily: "'DM Sans',sans-serif" }}>
            No commitment. No credit card. Just a 30-minute call that could change your business.
          </p>
        </div>
      </section>

      </main>
      <Footer />
    </div>
  );
}
