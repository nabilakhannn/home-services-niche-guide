import { motion } from "framer-motion";
import type { ReactNode } from "react";

const presets = {
  fadeUp: {
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
  },
  fadeDown: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.94 },
    animate: { opacity: 1, scale: 1 },
  },
  slideLeft: {
    initial: { opacity: 0, x: 36 },
    animate: { opacity: 1, x: 0 },
  },
  slideRight: {
    initial: { opacity: 0, x: -36 },
    animate: { opacity: 1, x: 0 },
  },
  /** Softer reveal without blur (better performance than filter animations) */
  softGlow: {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
  },
} as const;

type VariantKey = keyof typeof presets;

type Props = {
  children: ReactNode;
  variant?: VariantKey;
  className?: string;
  delay?: number;
};

/**
 * Scroll-triggered motion (once). Use different `variant` values across sections for variety.
 */
export default function MotionReveal({ children, variant = "fadeUp", className, delay = 0 }: Props) {
  const p = presets[variant] ?? presets.fadeUp;
  return (
    <motion.div
      className={className}
      initial={p.initial}
      whileInView={p.animate}
      viewport={{ once: true, amount: 0.12, margin: "0px 0px -8% 0px" }}
      transition={{
        duration: 0.55,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
