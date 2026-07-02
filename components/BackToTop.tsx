"use client";

import { motion, useReducedMotion } from "framer-motion";

export function BackToTop() {
  const reduce = useReducedMotion();
  
  return (
    <motion.button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" })}
      animate={reduce ? {} : { y: [0, -4, 0] }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      whileHover={{ scale: 1.1 }}
      className="group flex h-11 w-11 items-center justify-center rounded-full bg-charcoal text-cream shadow-md transition-all duration-300 hover:shadow-lg hover:shadow-charcoal/25 focus:outline-none"
      aria-label="Back to top"
    >
      <motion.div
        whileHover={{ y: -2 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.8}>
          <path d="M12 19V5M5 12l7-7 7 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>
    </motion.button>
  );
}
