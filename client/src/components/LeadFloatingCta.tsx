import { useState } from "react";
import { MessageCircle } from "lucide-react";
import LeadCapturePopup from "@/components/LeadCapturePopup";

/** Fixed “get leads” entry point; pairs with Go High Level via /api/submit-lead */
export default function LeadFloatingCta() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full px-5 py-3.5 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-[1.03] active:scale-[0.98] md:bottom-8 md:right-8"
        style={{
          fontFamily: "'Sora',sans-serif",
          background: "linear-gradient(135deg, oklch(0.60 0.18 42) 0%, oklch(0.50 0.18 42) 100%)",
          boxShadow: "0 12px 40px rgba(212, 98, 42, 0.35)",
        }}
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <MessageCircle size={20} strokeWidth={2.25} aria-hidden />
        Get leads
      </button>
      <LeadCapturePopup open={open} onOpenChange={setOpen} />
    </>
  );
}
