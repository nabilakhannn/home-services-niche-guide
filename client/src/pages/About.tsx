// ScaleBuds Marketing: About Page
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { usePageSeo } from "@/hooks/usePageSeo";
import JsonLdBreadcrumb from "@/components/JsonLdBreadcrumb";
import type { Crumb } from "@/components/JsonLdBreadcrumb";
import { ArrowRight, Phone, Target, Heart, Zap } from "lucide-react";

const ORANGE = "#D4622A";
const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663206244947/jt9SAM2mN4CpsewZpdVEXA/hero_final-Ntzfdq7xpqFKUpVcM3dcPJ.webp";

const ABOUT_BREADCRUMB: Crumb[] = [{ name: "About", path: "/about" }];

const values = [
  { icon: <Target size={22} />, title: "Results First", desc: "We measure everything in calls, booked jobs, and revenue. Not impressions or clicks. If your phone isn't ringing, we're not doing our job." },
  { icon: <Zap size={22} />, title: "Speed Wins", desc: "In home services, the contractor who responds first wins the job. We build systems that make you the fastest responder in your market." },
  { icon: <Heart size={22} />, title: "We Only Work in Trades", desc: "We don't serve restaurants, salons, or e-commerce. 100% of our focus is on home service contractors. We know your business better than any generalist agency." },
];

export default function About() {
  usePageSeo({
    title: "About ScaleBuds Marketing",
    description:
      "ScaleBuds is a home services marketing agency built for HVAC, plumbing, roofing, and trades. We focus on calls booked, not vanity metrics.",
    path: "/about",
  });
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main id="main-content" tabIndex={-1}>
      {/* Hero */}
      <section className="pt-32 pb-16 relative overflow-hidden" style={{ background: "#0F172A" }}>
        <div className="container max-w-3xl mx-auto text-center">
          <JsonLdBreadcrumb items={ABOUT_BREADCRUMB} />
          <div className="section-divider mx-auto" />
          <h1 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: "clamp(2rem,4vw,3rem)", color: "#fff", lineHeight: 1.15, marginBottom: "1.25rem" }}>
            We Built ScaleBuds Because Contractors Deserve Better Marketing
          </h1>
          <p style={{ fontFamily: "'DM Sans',sans-serif", color: "#94A3B8", fontSize: "1.05rem", lineHeight: 1.8 }}>
            Most marketing agencies treat home service contractors as an afterthought. We built ScaleBuds exclusively for the trades because we know the difference between a $500 HVAC repair and a $12,000 roof replacement. And we know how to market both.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="rounded-2xl overflow-hidden shadow-xl" style={{ height: "420px" }}>
              <img src={HERO_IMG} alt="ScaleBuds Marketing team" className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div>
              <div className="section-divider" />
              <h2 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: "clamp(1.6rem,2.5vw,2.1rem)", color: "#0F172A", marginBottom: "1.25rem", lineHeight: 1.2 }}>
                The Problem We Saw and Decided to Fix
              </h2>
              <p style={{ fontFamily: "'DM Sans',sans-serif", color: "#475569", lineHeight: 1.85, marginBottom: "1.25rem" }}>
                After studying hundreds of home service businesses, we kept seeing the same pattern: skilled contractors losing tens of thousands of dollars every year. Not because they lacked talent. Because their phones went unanswered and their marketing was run by agencies that didn't understand the trades.
              </p>
              <p style={{ fontFamily: "'DM Sans',sans-serif", color: "#475569", lineHeight: 1.85, marginBottom: "1.25rem" }}>
                The average contractor misses 27 to 62% of inbound calls. 85% of those callers never call back. That's a revenue hemorrhage. And it's completely fixable.
              </p>
              <p style={{ fontFamily: "'DM Sans',sans-serif", color: "#475569", lineHeight: 1.85, marginBottom: "2rem" }}>
                ScaleBuds was built to solve this. We combine AI-powered call answering, speed to lead automation, Google Ads, Local SEO, and social media marketing into one system that keeps your calendar full without you having to think about it.
              </p>
              <Link href="/contact">
                <button className="btn-orange text-sm px-6 py-3 flex items-center gap-2">
                  Work With Us <ArrowRight size={15} />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20" style={{ background: "#F8F7F5" }}>
        <div className="container">
          <div className="text-center max-w-xl mx-auto mb-14">
            <div className="section-divider mx-auto" />
            <h2 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: "clamp(1.6rem,2.5vw,2.1rem)", color: "#0F172A", marginBottom: "1rem" }}>
              What We Stand For
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {values.map(v => (
              <div key={v.title} className="bg-white rounded-xl p-7 border border-gray-100 shadow-sm">
                <div className="w-11 h-11 rounded-lg flex items-center justify-center mb-4" style={{ background: "rgba(212,98,42,0.1)", color: ORANGE }}>
                  {v.icon}
                </div>
                <h3 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: "1rem", color: "#0F172A", marginBottom: "0.6rem" }}>{v.title}</h3>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.875rem", color: "#64748B", lineHeight: 1.75 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission statement */}
      <section className="py-20 bg-white">
        <div className="container max-w-3xl mx-auto text-center">
          <div className="section-divider mx-auto" />
          <blockquote style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: "clamp(1.3rem,2.2vw,1.8rem)", color: "#0F172A", lineHeight: 1.5, marginBottom: "1.5rem" }}>
            "Our mission is simple: make sure every home service contractor we work with never loses another lead to a missed call or slow follow-up."
          </blockquote>
          <p style={{ fontFamily: "'DM Sans',sans-serif", color: "#64748B" }}>The ScaleBuds Marketing Team</p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20" style={{ background: `linear-gradient(135deg, ${ORANGE} 0%, #B34E20 100%)` }}>
        <div className="container text-center">
          <h2 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: "clamp(1.7rem,3vw,2.5rem)", color: "#fff", marginBottom: "1rem" }}>
            Let's Build Something Together
          </h2>
          <p style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,0.85)", marginBottom: "2.5rem" }}>
            Book a free strategy call and let's talk about your business.
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
