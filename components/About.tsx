"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ABOUT_TABS } from "@/lib/content";

const EASE = [0.22, 1, 0.36, 1] as const;

export function About() {
  const [active, setActive] = useState<(typeof ABOUT_TABS)[number]["id"]>(ABOUT_TABS[0].id);
  const current = ABOUT_TABS.find((t) => t.id === active) ?? ABOUT_TABS[0];

  return (
    <section id="about" className="relative scroll-mt-24 overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 animate-ken-burns">
        <Image
          src="/images/interior-brick.jpg"
          alt="Paper Moon's brick-walled dining room with a wine display and decorative swirl screens"
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-black/55" />

      <div className="shell relative flex justify-center lg:justify-end">
        <div className="w-full max-w-xl bg-cream px-8 py-12 text-charcoal sm:px-12">
          <Eyebrow dark>About</Eyebrow>
          <h2 className="mt-2 text-4xl sm:text-5xl">Our Paper Moon</h2>

          {/* Tab buttons */}
          <div className="mt-8 flex gap-1 border-b border-charcoal/15">
            {ABOUT_TABS.map((tab) => {
              const isActive = tab.id === active;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActive(tab.id)}
                  className={`relative pb-3 pr-5 text-sm tracking-wide transition-colors duration-200 ${
                    isActive ? "text-charcoal" : "text-charcoal/45 hover:text-charcoal/70"
                  }`}
                >
                  {tab.label}
                  {isActive && (
                    <motion.span
                      layoutId="about-tab-underline"
                      className="absolute inset-x-0 bottom-0 h-px bg-charcoal"
                      transition={{ duration: 0.3, ease: EASE }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Tab body */}
          <AnimatePresence mode="wait">
            <motion.p
              key={current.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="mt-7 text-lg leading-relaxed text-charcoal/80"
            >
              {current.body}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
