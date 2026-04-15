/**
 * Infinite “Industries We Serve” ticker — matches Manus reference pacing and trade list.
 */
const ORANGE = "#D4622A";

const INDUSTRIES = [
  "HVAC Companies",
  "Plumbing Contractors",
  "Roofing Companies",
  "Electrical Contractors",
  "General Contractors",
  "Painting Companies",
  "Landscaping",
  "Window & Door",
  "Kitchen & Bath",
  "Pest Control",
] as const;

export default function IndustriesMarquee() {
  const track = [...INDUSTRIES, ...INDUSTRIES];

  return (
    <section
      className="relative overflow-hidden border-y border-white/[0.08] py-8 md:py-10"
      style={{ background: "linear-gradient(180deg, #0B1220 0%, #0F172A 50%, #0B1220 100%)" }}
      aria-label="Industries we serve"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#0B1220] to-transparent md:w-28" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#0B1220] to-transparent md:w-28" />

      <div className="container relative z-20 mb-6 text-center">
        <p
          className="text-[0.7rem] font-bold uppercase tracking-[0.28em] md:text-xs"
          style={{ fontFamily: "'DM Sans',sans-serif", color: ORANGE }}
        >
          Industries We Serve
        </p>
        <p
          className="mx-auto mt-2 max-w-xl text-sm md:text-base"
          style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(226,232,240,0.82)", lineHeight: 1.6 }}
        >
          Home service contractors we help grow — same trades, same urgency, one system that answers every call.
        </p>
      </div>

      <div className="relative overflow-hidden">
        <div className="animate-industries-marquee flex w-max items-center gap-4 md:gap-8">
          {track.map((label, i) => (
            <div key={`${label}-${i}`} className="flex shrink-0 items-center gap-4 md:gap-8">
              <span
                className="whitespace-nowrap text-base font-semibold tracking-tight md:text-lg"
                style={{
                  fontFamily: "'Sora',sans-serif",
                  color: "#F8FAFC",
                  textShadow: "0 1px 2px rgba(0,0,0,0.35)",
                }}
              >
                {label}
              </span>
              <span
                className="h-1.5 w-1.5 shrink-0 rounded-full opacity-90"
                style={{ background: ORANGE, boxShadow: `0 0 12px ${ORANGE}` }}
                aria-hidden
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
