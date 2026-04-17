import { useState, type FormEvent } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { submitLead } from "@/lib/submitLead";

const ORANGE = "#D4622A";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function LeadCapturePopup({ open, onOpenChange }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const em = email.trim();
    if (!em || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    const parts = name.trim().split(/\s+/);
    const firstName = parts[0] || "";
    const lastName = parts.slice(1).join(" ") || "";
    setBusy(true);
    const res = await submitLead({
      formId: "floating-popup",
      firstName,
      lastName,
      email: em,
    });
    setBusy(false);
    if (res.ok || res.error === "not_configured") {
      toast.success("Thanks. We’ll be in touch shortly.");
      setName("");
      setEmail("");
      onOpenChange(false);
    } else {
      toast.error(res.error || "Something went wrong. Try again or email nabila@scalebuds.com.");
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md border-slate-200" showCloseButton>
        <DialogHeader>
          <DialogTitle style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800 }}>
            Get a strategy call
          </DialogTitle>
          <DialogDescription>
            Leave your details. We’ll route this to our team.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
          <div>
            <label className="form-label" htmlFor="popup-name">
              Name
            </label>
            <input
              id="popup-name"
              className="form-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Alex Rivera"
              autoComplete="name"
            />
          </div>
          <div>
            <label className="form-label" htmlFor="popup-email">
              Email *
            </label>
            <input
              id="popup-email"
              type="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              autoComplete="email"
              required
            />
          </div>
          <p className="text-xs text-slate-500" style={{ fontFamily: "'DM Sans',sans-serif" }}>
            To share a mobile number for SMS, use the site chat widget — this form stays email-only.
          </p>
          <button
            type="submit"
            disabled={busy}
            className="btn-orange text-sm w-full justify-center disabled:opacity-70"
          >
            {busy ? (
              <>
                <Loader2 size={16} className="animate-spin" /> Sending…
              </>
            ) : (
              "Request a call"
            )}
          </button>
          <p className="text-xs text-slate-500" style={{ fontFamily: "'DM Sans',sans-serif" }}>
            By submitting, you agree we may contact you about ScaleBuds services. See our{" "}
            <a href="/privacy-policy" className="underline" style={{ color: ORANGE }}>
              Privacy Policy
            </a>
            .
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
