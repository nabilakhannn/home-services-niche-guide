import { useState } from "react";
import { MessageCircle } from "lucide-react";
import LeadCapturePopup from "@/components/LeadCapturePopup";

/** Opens email-only lead popup. Positioned above Lead Connector chat launcher to avoid overlap. */
export default function LeadFloatingCta() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Book a free strategy call"
        className="fixed bottom-[calc(6.5rem+env(safe-area-inset-bottom,0px))] right-[max(1.5rem,env(safe-area-inset-right,0px))] z-40 flex items-center gap-2 rounded-full px-5 py-3.5 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-[1.03] active:scale-[0.98] md:bottom-[calc(7.5rem+env(safe-area-inset-bottom,0px))] md:right-8"
        style={{
          fontFamily: "'Sora',sans-serif",
          background: "linear-gradient(135deg, oklch(0.60 0.18 42) 0%, oklch(0.50 0.18 42) 100%)",
          boxShadow: "0 12px 40px rgba(212, 98, 42, 0.35)",
        }}
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <MessageCircle size={20} strokeWidth={2.25} aria-hidden />
        Free strategy call
      </button>
      <LeadCapturePopup open={open} onOpenChange={setOpen} />
    </>
  );
}
