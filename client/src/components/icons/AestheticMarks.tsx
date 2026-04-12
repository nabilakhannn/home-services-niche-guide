/**
 * Small stroke icons (not generic Lucide set) for service rails and labels.
 * White on brand gradient backgrounds; currentColor inherits.
 */
export function MarkEyebrow({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden className="shrink-0">
      <path d="M12 2v4M12 18v4M2 12h4M18 12h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M7 7l2 2M15 7l-2 2M7 17l2-2M15 17l-2-2" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" opacity="0.85" />
    </svg>
  );
}

/** Interlocking arcs (paid demand / reach) */
export function MarkArcWeave({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden className="shrink-0">
      <path
        d="M5 18a7 7 0 0114 0"
        stroke="currentColor"
        strokeWidth="1.65"
        strokeLinecap="round"
        opacity="0.95"
      />
      <path
        d="M8 6a8 8 0 018 0"
        stroke="currentColor"
        strokeWidth="1.65"
        strokeLinecap="round"
        opacity="0.65"
      />
      <circle cx="12" cy="12" r="2" fill="currentColor" opacity="0.35" />
    </svg>
  );
}

/** Stacked rhombuses (maps / layers / territory) */
export function MarkRhombusStack({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden className="shrink-0">
      <path d="M12 4l6 5-6 5-6-5 6-5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" opacity="0.55" />
      <path d="M12 8l4.5 3.5L12 15l-4.5-3.5L12 8z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" opacity="0.85" />
      <path d="M12 11l2.5 2L12 15l-2.5-2 2.5-2z" fill="currentColor" opacity="0.95" />
    </svg>
  );
}

/** Concentric pulse (response / loop) */
export function MarkPulseRing({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden className="shrink-0">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.4" opacity="0.35" />
      <circle cx="12" cy="12" r="5.5" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
    </svg>
  );
}

/** Integration weave (strengths row) */
export function MarkWeave({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden className="shrink-0">
      <path d="M4 8h16M4 12h16M4 16h16" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" opacity="0.4" />
      <path d="M8 4v16M12 4v16M16 4v16" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" opacity="0.4" />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" fill="none" />
    </svg>
  );
}

/** Signal columns (reporting) */
export function MarkSignalBars({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden className="shrink-0">
      <path d="M6 18V10M10 18V6M14 18v-7M18 18V8" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}
