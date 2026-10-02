"use client";

/**
 * SectionWrap
 * Wraps any page section with a Framer Motion whileInView reveal.
 * Uses blur+translateY so it feels cinematic, not just a simple fade.
 */

import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

const sectionVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 48,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

interface Props {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** How far into the viewport to trigger (0-1). Default 0.1 */
  threshold?: number;
}

export function SectionWrap({
  children,
  className = "",
  delay = 0,
  threshold = 0.1,
}: Props) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: sectionVariants.hidden,
        visible: {
          ...(sectionVariants.visible as object),
          transition: {
            duration: 0.8,
            delay,
            ease: [0.16, 1, 0.3, 1],
          },
        },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: threshold }}
    >
      {children}
    </motion.div>
  );
}
