import type { ReactNode } from "react";
import { Link } from "wouter";
import { Bot, ArrowRight } from "lucide-react";
import MotionReveal from "@/components/MotionReveal";
import { MarkArcWeave, MarkEyebrow, MarkPulseRing, MarkRhombusStack } from "@/components/icons/AestheticMarks";

const ORANGE = "#D4622A";

const IMG_WITHOUT = "/showcase/hvac-without-ai.png";
const IMG_WITH = "/showcase/hvac-with-ai.png";

const serviceLinks: { label: string; href: string; icon: ReactNode; blurb: string }[] = [
  {
    label: "AI phone assistant",
    href: "/services#ai-phone-assistant",
    icon: <Bot size={18} strokeWidth={2} aria-hidden />,
    blurb: "Answers while you’re in the crawl space",
  },
  {
    label: "Google Ads + LSAs",
    href: "/services#google-ads-lsa",
    icon: <MarkArcWeave size={18} />,
    blurb: "Intent when the AC dies or the heat fails",
  },
  {
    label: "Local SEO & Maps",
    href: "/services#local-seo",
    icon: <MarkRhombusStack size={18} />,
    blurb: "Own “HVAC near me” in your towns",
  },
  {
    label: "Speed-to-lead",
    href: "/services#speed-to-lead",
    icon: <MarkPulseRing size={18} />,
    blurb: "Text back before they call the next guy",
  },
];

/**
 * Creative before/after still layout after hero. HVAC narrative plus sticky service rail.
 */
export default function HvacDualRealityShowcase() {
  return (
    <section
      className="relative overflow-hidden border-b border-slate-200/80 bg-gradient-to-b from-[#f8f6f3] via-white to-white py-14 sm:py-16 md:py-24"
      aria-labelledby="dual-reality-heading"
    >
      <div
        className="pointer-events-none absolute -top-24 right-0 h-[420px] w-[420px] rounded-full opacity-[0.14] blur-3xl"
        style={{ background: `radial-gradient(circle, ${ORANGE} 0%, transparent 70%)` }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-0 left-[-80px] h-[300px] w-[300px] rounded-full opacity-[0.08] blur-3xl bg-slate-400"
        aria-hidden
      />

      <div className="container relative max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-10 sm:gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(260px,300px)] lg:gap-10 lg:items-start xl:gap-14">
          <MotionReveal variant="fadeUp">
            <div className="min-w-0">
              <p
                className="mb-3 inline-flex items-center gap-2 rounded-full border border-orange-200/80 bg-orange-50/90 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] sm:px-4"
                style={{ color: ORANGE, fontFamily: "'DM Sans',sans-serif" }}
              >
                <span className="shrink-0" aria-hidden>
                  <MarkEyebrow size={15} />
                </span>
                Field story
              </p>
              <h2
                id="dual-reality-heading"
                className="text-balance max-w-2xl"
                style={{
                  fontFamily: "'Sora',sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(1.5rem,5vw,2.35rem)",
                  color: "#0F172A",
                  lineHeight: 1.12,
                  letterSpacing: "-0.02em",
                }}
              >
                The phone doesn’t wait for you to finish the job.
              </h2>
              <p
                className="mt-3 max-w-xl text-pretty text-[15px] sm:text-base"
                style={{ fontFamily: "'DM Sans',sans-serif", color: "#64748B", lineHeight: 1.75 }}
              >
                On site you’re earning. Every ring pulls you into dispatch mode. When answering and booking run in the background, you stay on the work that actually gets invoiced.
              </p>

              <div className="relative mt-8 sm:mt-10 md:mt-12">
                <div
                  className="pointer-events-none absolute left-1/2 top-[42%] z-0 hidden h-px w-[calc(100%-4rem)] -translate-x-1/2 md:block"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${ORANGE}55, ${ORANGE}, ${ORANGE}55, transparent)`,
                  }}
                  aria-hidden
                />

                <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 md:gap-5">
                  <figure className="group relative z-10 md:pt-6 md:pr-2">
                    <span
                      className="absolute -left-1 -top-2 z-20 flex h-10 w-10 items-center justify-center rounded-2xl border border-white bg-white text-xs font-black shadow-md sm:h-11 sm:w-11 sm:text-sm md:-left-3 md:-top-3"
                      style={{ fontFamily: "'Sora',sans-serif", color: "#94A3B8" }}
                      aria-hidden
                    >
                      01
                    </span>
                    <div
                      className="relative overflow-hidden rounded-2xl border border-slate-200/90 bg-slate-200 shadow-[0_20px_50px_-12px_rgba(15,23,42,0.2)] transition duration-300 group-hover:-translate-y-1 group-hover:shadow-xl md:-rotate-[1.5deg]"
                      style={{ boxShadow: "0 25px 60px -15px rgba(15,23,42,0.18)" }}
                    >
                      <img
                        src={IMG_WITHOUT}
                        alt="HVAC technician on a stressful call while working on equipment in a home garage"
                        className="aspect-[4/3] w-full object-cover md:aspect-[5/4]"
                        loading="lazy"
                        width={800}
                        height={640}
                        decoding="async"
                      />
                      <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-900/85 via-slate-900/35 to-transparent px-3 pb-3 pt-12 sm:px-4 sm:pb-4 sm:pt-16">
                        <p className="text-sm font-semibold text-white" style={{ fontFamily: "'Sora',sans-serif" }}>
                          Without the system
                        </p>
                        <p className="text-xs text-white/75" style={{ fontFamily: "'DM Sans',sans-serif" }}>
                          Phone, tools, homeowner. All at once.
                        </p>
                      </figcaption>
                    </div>
                  </figure>

                  <figure className="group relative z-10 md:pl-2 md:pt-0">
                    <span
                      className="absolute -right-1 -top-2 z-20 flex h-10 w-10 items-center justify-center rounded-2xl border border-white text-xs font-black shadow-md sm:h-11 sm:w-11 sm:text-sm md:-right-2 md:-top-2"
                      style={{
                        fontFamily: "'Sora',sans-serif",
                        color: "#fff",
                        background: `linear-gradient(135deg, ${ORANGE}, #9a3d16)`,
                        boxShadow: `0 8px 24px ${ORANGE}44`,
                      }}
                      aria-hidden
                    >
                      02
                    </span>
                    <div
                      className="relative overflow-hidden rounded-2xl border-2 shadow-xl transition duration-300 group-hover:-translate-y-1 md:rotate-[1.5deg]"
                      style={{
                        borderColor: `${ORANGE}66`,
                        boxShadow: `0 28px 60px -12px rgba(212,98,42,0.22), 0 0 0 1px rgba(255,255,255,0.5) inset`,
                      }}
                    >
                      <img
                        src={IMG_WITH}
                        alt="Same trade context: technician focused on HVAC unit while support systems run in the background"
                        className="aspect-[4/3] w-full object-cover md:aspect-[5/4]"
                        loading="lazy"
                        width={800}
                        height={640}
                        decoding="async"
                      />
                      <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-900/88 via-slate-900/40 to-transparent px-3 pb-3 pt-12 sm:px-4 sm:pb-4 sm:pt-16">
                        <p className="text-sm font-semibold text-white" style={{ fontFamily: "'Sora',sans-serif" }}>
                          With the stack
                        </p>
                        <p className="text-xs text-white/80" style={{ fontFamily: "'DM Sans',sans-serif" }}>
                          Calls and calendar handled. You finish the job.
                        </p>
                      </figcaption>
                    </div>
                  </figure>
                </div>
              </div>
            </div>
          </MotionReveal>

          <aside className="min-w-0 lg:sticky lg:top-28">
            <MotionReveal variant="slideLeft" delay={0.08}>
              <div
                className="mx-auto w-full max-w-lg rounded-2xl border border-slate-200/90 bg-white/95 p-5 shadow-[0_20px_50px_-12px_rgba(15,23,42,0.12)] backdrop-blur-sm sm:p-6 lg:mx-0 lg:max-w-none"
                style={{ boxShadow: "0 20px 50px -12px rgba(15,23,42,0.1), 0 0 0 1px rgba(255,255,255,0.8) inset" }}
              >
                <p
                  className="text-xs font-bold uppercase tracking-[0.16em]"
                  style={{ color: ORANGE, fontFamily: "'DM Sans',sans-serif" }}
                >
                  HVAC
                </p>
                <h3
                  className="mt-2 text-lg font-extrabold text-slate-900"
                  style={{ fontFamily: "'Sora',sans-serif", lineHeight: 1.25 }}
                >
                  HVAC &amp; home service growth
                </h3>
                <p className="mt-2 text-sm text-slate-600" style={{ fontFamily: "'DM Sans',sans-serif", lineHeight: 1.6 }}>
                  The same levers that turn a packed garage into a booked calendar.
                </p>

                <ul className="mt-5 space-y-2 sm:mt-6 sm:space-y-3">
                  {serviceLinks.map((s) => (
                    <li key={s.href}>
                      <Link
                        href={s.href}
                        className="group flex min-h-[48px] items-center gap-3 rounded-xl border border-transparent p-2 transition active:bg-orange-50/80 hover:border-orange-200/80 hover:bg-orange-50/50 sm:min-h-0 sm:p-3"
                      >
                        <span
                          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-white sm:h-10 sm:w-10"
                          style={{ background: `linear-gradient(145deg, ${ORANGE}, #b84e1f)` }}
                        >
                          {s.icon}
                        </span>
                        <span className="min-w-0 flex-1 py-1">
                          <span
                            className="flex items-center gap-1 text-sm font-bold text-slate-900 group-hover:text-[oklch(0.50_0.18_42)]"
                            style={{ fontFamily: "'Sora',sans-serif" }}
                          >
                            {s.label}
                            <ArrowRight size={14} className="opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100" aria-hidden />
                          </span>
                          <span className="block text-xs text-slate-500" style={{ fontFamily: "'DM Sans',sans-serif" }}>
                            {s.blurb}
                          </span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>

                <Link href="/contact">
                  <button type="button" className="btn-orange mt-5 w-full min-h-[48px] justify-center text-sm py-3.5 sm:mt-6 sm:min-h-0">
                    Plan my HVAC leads <ArrowRight size={15} aria-hidden />
                  </button>
                </Link>
              </div>
            </MotionReveal>
          </aside>
        </div>
      </div>
    </section>
  );
}
