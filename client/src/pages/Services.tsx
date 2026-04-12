// ScaleBuds Marketing: Services Page
import type { ReactNode } from "react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JsonLdBreadcrumb from "@/components/JsonLdBreadcrumb";
import { usePageSeo } from "@/hooks/usePageSeo";
import { ArrowRight, Bot, Search, TrendingUp, Facebook, Star, Zap, Phone, CheckCircle2 } from "lucide-react";
import { SERVICE_NAV_ITEMS } from "@/content/serviceSections";

const ORANGE = "#D4622A";

/** Brand photography (CloudFront). Each service uses a different asset so panels never repeat. */
const AI_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663206244947/jt9SAM2mN4CpsewZpdVEXA/ai_phone_final-87xGi7RNUhXrHPNxNmAPEo.webp";
const HVAC_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663206244947/jt9SAM2mN4CpsewZpdVEXA/hvac_final-VhhUSna7nPcvseBQBb57fo.webp";
const PLUMB_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663206244947/jt9SAM2mN4CpsewZpdVEXA/plumbing_final-Ga6JjwjPyKVuqv2G5F7ZRF.webp";
const ROOF_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663206244947/jt9SAM2mN4CpsewZpdVEXA/roofing_final-95Vem9XTkVJkZvUmbNJ9db.webp";

/**
 * Speed-to-Lead: neutral trade + phone (no third-party logo on clothing). Replace with
 * `public/services/speed-to-lead-scalebuds.webp` when you have a shoot or render with ScaleBuds branding.
 * Review: distinct from AI panel (trust / handshake). Replace with brand asset if preferred.
 */
const SPEED_IMG =
  "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1800&q=85";
const REVIEW_IMG =
  "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1800&q=85";

type ServiceBlock = {
  icon: ReactNode;
  title: string;
  tagline: string;
  desc: string;
  bullets: string[];
  sideImage: string;
  sideImageAlt: string;
};

const services: ServiceBlock[] = [
  {
    icon: <Bot size={28} />,
    title: "AI Phone Assistant",
    tagline: "Never miss a lead again. Day or night.",
    desc: "Our AI phone assistant answers every inbound call with your business name, qualifies the lead, and books the appointment directly into your calendar. It works 24/7 including weekends, holidays, and peak season surges when your team is overwhelmed.",
    bullets: ["Answers in your business name", "Qualifies lead: service type, location, urgency", "Books directly into your calendar", "Sends instant SMS confirmation to caller", "Escalates emergencies to you immediately"],
    sideImage: AI_IMG,
    sideImageAlt: "Contractor using a phone and headset so no inbound lead goes to voicemail",
  },
  {
    icon: <Zap size={28} />,
    title: "Speed-to-Lead System",
    tagline: "Contact every lead within 5 minutes. Automatically.",
    desc: "Research proves leads contacted within 5 minutes are 21x more likely to convert. Our speed to lead system automatically texts and calls every new lead the moment they submit a form or miss a call. Before they call your competitor.",
    bullets: ["Instant SMS + call to every new lead", "Automated follow-up sequences", "Lead scoring and prioritization", "CRM integration and tracking", "Weekly conversion reports"],
    sideImage: SPEED_IMG,
    sideImageAlt: "Technician using a mobile phone for fast lead follow-up and SMS",
  },
  {
    icon: <Search size={28} />,
    title: "Google Ads + Local Service Ads",
    tagline: "Be the first call when homeowners search",
    desc: "We manage your Google Ads and Local Service Ads to put your business at the very top of search results when homeowners search 'HVAC near me' or 'emergency plumber'. LSAs deliver leads at 30 to 50% lower cost than traditional ads.",
    bullets: ["Full Google Ads campaign management", "Local Service Ads (LSA) setup and management", "Keyword research and negative keyword lists", "Call tracking and conversion optimization", "Monthly performance reporting"],
    sideImage: HVAC_IMG,
    sideImageAlt: "HVAC technician on a job representing high-intent local search demand",
  },
  {
    icon: <TrendingUp size={28} />,
    title: "Local SEO",
    tagline: "Rank #1 on Google Maps in your service area",
    desc: "We optimize your Google Business Profile, build local citations, and create keyword-rich content that gets you ranking on Google Maps and organic search for every service you offer in every city you serve.",
    bullets: ["Google Business Profile optimization", "Local citation building (50+ directories)", "On-page SEO for your website", "Service area page creation", "Monthly ranking reports"],
    sideImage: PLUMB_IMG,
    sideImageAlt: "Plumbing professional representing local visibility and trust in the community",
  },
  {
    icon: <Facebook size={28} />,
    title: "Facebook & Instagram Ads",
    tagline: "Visual campaigns that generate leads from social",
    desc: "Before-and-after photos of roofing jobs, remodels, and landscaping projects are some of the highest-performing content on social media. We create and manage campaigns that put your work in front of homeowners in your service area.",
    bullets: ["Custom audience targeting by zip code", "Before/after creative production", "Lead form and landing page campaigns", "Retargeting website visitors", "A/B testing and optimization"],
    sideImage: ROOF_IMG,
    sideImageAlt: "Roofing crew and finished project imagery suited to Meta ad creative",
  },
  {
    icon: <Star size={28} />,
    title: "Review Generation",
    tagline: "Build a 5-star reputation that sells for you",
    desc: "81% of homeowners check Google Reviews before calling a contractor. We automate the process of collecting 5-star reviews from every satisfied customer so your reputation grows on autopilot.",
    bullets: ["Automated post-job review requests via SMS", "Google and Facebook review management", "Review response templates", "Negative review mitigation strategy", "Monthly reputation report"],
    sideImage: REVIEW_IMG,
    sideImageAlt: "Team collaboration and client trust after quality work, supporting strong reviews",
  },
];

const niches = [
  { name: "HVAC", img: HVAC_IMG, services: ["AI Phone Assistant", "Google Ads and LSAs", "Local SEO", "Speed to Lead"], avgTicket: "$320 to $8,000+", missedCallRate: "35 to 50%" },
  { name: "Plumbing", img: PLUMB_IMG, services: ["AI Phone Assistant", "Google Ads and LSAs", "Speed to Lead", "Review Generation"], avgTicket: "$150 to $2,500", missedCallRate: "27 to 45%" },
  { name: "Roofing", img: ROOF_IMG, services: ["Facebook Ads", "Google Ads and LSAs", "AI Phone Assistant", "Review Generation"], avgTicket: "$7,500 to $12,000", missedCallRate: "30 to 60%" },
];

const SERVICES_BREADCRUMB = [{ name: "Services", path: "/services" }];

export default function Services() {
  usePageSeo({
    title: "Marketing Services for Home Service Contractors",
    description:
      "AI phone assistant, speed to lead, Google Ads and Local Service Ads, local SEO, Meta ads, and review generation for HVAC, plumbing, roofing, and trades.",
    path: "/services",
    keywords:
      "contractor marketing services, AI phone assistant, Local Service Ads, HVAC Google Ads, local SEO contractors",
  });
  return (
    <div className="min-h-screen bg-white" data-testid="page-services">
      <Navbar />

      <main id="main-content" tabIndex={-1}>
      {/* Hero */}
      <section className="pt-32 pb-16" style={{ background: "#0F172A" }} data-testid="services-hero">
        <div className="container text-center max-w-2xl mx-auto">
          <JsonLdBreadcrumb items={SERVICES_BREADCRUMB} />
          <div className="section-divider mx-auto" />
          <h1 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: "clamp(2rem,4vw,3rem)", color: "#fff", lineHeight: 1.15, marginBottom: "1rem" }}>
            Marketing Services for Home Service Contractors
          </h1>
          <p style={{ fontFamily: "'DM Sans',sans-serif", color: "#94A3B8", fontSize: "1.05rem", lineHeight: 1.75 }}>
            We don't just run ads. We build a complete lead generation and lead capture system that works around the clock so you never miss a job again.
          </p>
        </div>
      </section>

      {/* Services list */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="flex flex-col gap-16">
            {services.map((s, i) => (
              <div
                key={s.title}
                id={SERVICE_NAV_ITEMS[i].id}
                className={`scroll-mt-28 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start ${i % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
              >
                <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: "rgba(212,98,42,0.1)", color: ORANGE }}>
                    {s.icon}
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: ORANGE, fontFamily: "'DM Sans',sans-serif" }}>{s.tagline}</p>
                  <h2 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: "clamp(1.5rem,2.5vw,2rem)", color: "#0F172A", marginBottom: "1rem", lineHeight: 1.2 }}>{s.title}</h2>
                  <p style={{ fontFamily: "'DM Sans',sans-serif", color: "#475569", lineHeight: 1.8, marginBottom: "1.5rem" }}>{s.desc}</p>
                  <div className="flex flex-col gap-2.5 mb-6">
                    {s.bullets.map(b => (
                      <div key={b} className="flex items-center gap-2.5">
                        <CheckCircle2 size={16} style={{ color: ORANGE, flexShrink: 0 }} />
                        <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.9rem", color: "#334155" }}>{b}</span>
                      </div>
                    ))}
                  </div>
                  <Link href="/contact">
                    <button className="btn-orange text-sm px-6 py-3 flex items-center gap-2">
                      Get Started <ArrowRight size={15} />
                    </button>
                  </Link>
                </div>
                <div
                  className={`relative overflow-hidden rounded-2xl shadow-lg ring-1 ring-slate-200/80 ${i % 2 === 1 ? "lg:order-1" : ""}`}
                >
                  <div className="relative aspect-[4/3] w-full min-h-[240px] sm:min-h-[280px] md:aspect-[5/4] md:max-h-[min(100%,480px)]">
                    <img
                      src={s.sideImage}
                      alt={s.sideImageAlt}
                      className="absolute inset-0 h-full w-full object-cover"
                      loading="lazy"
                      decoding="async"
                      width={1200}
                      height={960}
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-slate-950/88 via-slate-900/25 to-transparent"
                      aria-hidden
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                      <p
                        className="text-base font-bold tracking-tight text-white sm:text-lg"
                        style={{ fontFamily: "'Sora',sans-serif" }}
                      >
                        {s.title}
                      </p>
                      <p
                        className="mt-1 text-xs font-medium text-white/85 sm:text-sm"
                        style={{ fontFamily: "'DM Sans',sans-serif" }}
                      >
                        Included in every plan
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Niches */}
      <section className="py-20" style={{ background: "#F8F7F5" }}>
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="section-divider mx-auto" />
            <h2 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: "clamp(1.7rem,2.8vw,2.2rem)", color: "#0F172A", marginBottom: "1rem" }}>
              Specialized by Niche
            </h2>
            <p style={{ fontFamily: "'DM Sans',sans-serif", color: "#64748B", lineHeight: 1.75 }}>
              We know which services work best for each trade. We've studied the data so you don't have to.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {niches.map(n => (
              <div key={n.name} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-shadow">
                <div className="relative h-48 overflow-hidden">
                  <img src={n.img} alt={`${n.name} marketing`} className="w-full h-full object-cover" loading="lazy" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(15,23,42,0.7) 0%, transparent 60%)" }} />
                  <span className="absolute bottom-4 left-4" style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: "1.4rem", color: "#fff" }}>{n.name}</span>
                </div>
                <div className="p-5">
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="rounded-lg p-3 text-center" style={{ background: "rgba(212,98,42,0.06)" }}>
                      <div style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: "0.85rem", color: ORANGE }}>{n.avgTicket}</div>
                      <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.7rem", color: "#64748B" }}>Avg Job Ticket</div>
                    </div>
                    <div className="rounded-lg p-3 text-center" style={{ background: "rgba(220,38,38,0.06)" }}>
                      <div style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: "0.85rem", color: "#DC2626" }}>{n.missedCallRate}</div>
                      <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.7rem", color: "#64748B" }}>Calls Missed</div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5 mb-4">
                    {n.services.map(sv => (
                      <div key={sv} className="flex items-center gap-2">
                        <CheckCircle2 size={13} style={{ color: ORANGE, flexShrink: 0 }} />
                        <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.8rem", color: "#334155" }}>{sv}</span>
                      </div>
                    ))}
                  </div>
                  <Link href="/contact">
                    <button className="btn-orange w-full justify-center text-sm py-2.5">
                      Get {n.name} Leads
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20" style={{ background: `linear-gradient(135deg, ${ORANGE} 0%, #B34E20 100%)` }}>
        <div className="container text-center">
          <h2 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: "clamp(1.7rem,3vw,2.5rem)", color: "#fff", marginBottom: "1rem" }}>
            Ready to Get Started?
          </h2>
          <p style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,0.85)", fontSize: "1.05rem", marginBottom: "2.5rem" }}>
            Book a free strategy call and we'll build your custom growth plan.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <button className="bg-white font-bold px-9 py-3.5 rounded-md text-sm flex items-center gap-2 justify-center hover:bg-orange-50 transition-colors" style={{ color: "#0F172A", fontFamily: "'Sora',sans-serif" }}>
                Book Free Strategy Call <ArrowRight size={16} />
              </button>
            </Link>
            <a href="tel:+16099771129">
              <button className="border-2 border-white/60 text-white font-semibold px-9 py-3.5 rounded-md text-sm flex items-center gap-2 justify-center hover:bg-white/10 transition-colors" style={{ fontFamily: "'Sora',sans-serif" }}>
                <Phone size={16} /> Call (609) 977-1129
              </button>
            </a>
          </div>
        </div>
      </section>

      </main>
      <Footer />
    </div>
  );
}
