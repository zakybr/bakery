import type { Variants } from "framer-motion";

/** When prefers-reduced-motion is set, return variants that skip movement. */
export function reducedMotionVariants(
  reduce: boolean | null,
  variants: Variants
): Variants {
  if (reduce) {
    return {
      hidden: { opacity: 1, y: 0, x: 0 },
      visible: { opacity: 1, y: 0, x: 0, transition: { duration: 0 } },
      initial: { opacity: 1, y: 0, x: 0 },
      animate: { opacity: 1, y: 0, x: 0 },
      exit: { opacity: 1, y: 0, x: 0 },
    };
  }
  return variants;
}

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};

export const sectionReveal: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

export const tabContent: Variants = {
  initial: { opacity: 0, y: 16 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2 } },
};

export const slideFromRight: Variants = {
  hidden: { opacity: 0, x: 80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};
