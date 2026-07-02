"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { StarRating } from "@/components/ui/StarRating";
import { TESTIMONIALS } from "@/lib/content";

const ROTATE_MS = 6500;
const EASE = [0.22, 1, 0.36, 1] as const;

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = TESTIMONIALS.length;

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % count), ROTATE_MS);
    return () => clearInterval(id);
  }, [paused, count]);

  const current = TESTIMONIALS[index];

  return (
    <section
      className="relative overflow-hidden py-28 sm:py-36"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {/* Faint accent image */}
      <div className="absolute inset-0">
        <Image
          src="/images/table-setting.jpg"
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-black/80" />
      </div>

      <div className="shell relative mx-auto max-w-3xl text-center">
        <Eyebrow>Kind Words</Eyebrow>

        <motion.span
          initial={{ opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mt-2 block font-script text-7xl leading-none text-cream/40"
          aria-hidden="true"
        >
          &ldquo;
        </motion.span>

        <div className="relative mt-2 min-h-[12rem] sm:min-h-[10rem]">
          <AnimatePresence mode="wait">
            <motion.figure
              key={index}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <blockquote className="font-serif text-2xl leading-snug text-cream sm:text-3xl">
                {current.quote}
              </blockquote>
              <figcaption className="mt-7 flex flex-col items-center gap-3">
                <StarRating rating={current.rating} className="text-cream/80" />
                <span className="text-sm uppercase tracking-wide2 text-cream/60">
                  {current.author}
                </span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        <div className="mt-10 flex items-center justify-center gap-2.5">
          {TESTIMONIALS.map((t, i) => (
            <button
              key={t.author}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show review ${i + 1} of ${count}`}
              aria-current={i === index}
              className={`h-2 rounded-full transition-all duration-500 ${
                i === index ? "w-7 bg-cream" : "w-2 bg-cream/30 hover:bg-cream/60"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
