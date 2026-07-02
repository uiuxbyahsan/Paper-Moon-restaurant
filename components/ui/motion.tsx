"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** vertical offset to animate from (px) */
  y?: number;
  /** horizontal offset to animate from (px) */
  x?: number;
  delay?: number;
  duration?: number;
  amount?: number;
  once?: boolean;
};

/** Single element that fades + slides into view once. Honours reduced motion. */
export function Reveal({
  children,
  className,
  y = 24,
  x = 0,
  delay = 0,
  duration = 0.6,
  amount = 0.25,
  once = true,
}: RevealProps) {
  const reduce = useReducedMotion();
  const variants: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : y, x: reduce ? 0 : x },
    show: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: { duration: reduce ? 0.2 : duration, ease: EASE, delay: reduce ? 0 : delay },
    },
  };
  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
    >
      {children}
    </motion.div>
  );
}

type StaggerProps = {
  children: ReactNode;
  className?: string;
  gap?: number;
  amount?: number;
  once?: boolean;
  delayChildren?: number;
};

/** Parent that staggers its <StaggerItem> children into view. */
export function Stagger({
  children,
  className,
  gap = 0.08,
  amount = 0.2,
  once = true,
  delayChildren = 0,
}: StaggerProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: gap, delayChildren } } }}
    >
      {children}
    </motion.div>
  );
}

type StaggerItemProps = {
  children: ReactNode;
  className?: string;
  y?: number;
  x?: number;
  duration?: number;
};

export function StaggerItem({ children, className, y = 24, x = 0, duration = 0.6 }: StaggerItemProps) {
  const reduce = useReducedMotion();
  const variants: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : y, x: reduce ? 0 : x },
    show: { opacity: 1, y: 0, x: 0, transition: { duration: reduce ? 0.2 : duration, ease: EASE } },
  };
  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  );
}
