"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FoodImage } from "@/components/ui/FoodImage";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/motion";
import { GALLERY } from "@/lib/content";

const EASE = [0.22, 1, 0.36, 1] as const;
const AUTO_MS = 4500;
const N = GALLERY.length;

export function Gallery() {
  const reduce = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState({ w: 1000, h: 520 });
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);

  // Measure the carousel area so card geometry scales with the viewport.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => setBox({ w: el.clientWidth, h: el.clientHeight });
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Auto-advance (paused on hover / when the lightbox is open / reduced motion).
  useEffect(() => {
    if (reduce || paused || lightbox !== null) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % N), AUTO_MS);
    return () => clearInterval(id);
  }, [reduce, paused, lightbox]);

  const cardW = Math.min(box.w * 0.62, 720);
  const cardH = box.h * 0.86;
  const half = cardW / 2;
  const cy = -cardH / 2;

  // Where each card sits, by its slot distance from the centered card.
  const target = (slot: number) => {
    if (slot === 0) return { x: -half, y: cy, scale: 1, opacity: 1, zIndex: 40 };
    
    // Right side slots (1 to 3)
    if (slot >= 1 && slot <= 3) {
      const off = box.w * (0.12 + slot * 0.13);
      return {
        x: -half + off,
        y: cy,
        scale: 1 - slot * 0.12,
        opacity: slot === 1 ? 0.9 : slot === 2 ? 0.6 : 0.35,
        zIndex: 40 - slot,
      };
    }
    
    // Left side slots (N-3 to N-1, mirrored)
    if (slot >= N - 3 && slot <= N - 1) {
      const mirrorSlot = N - slot; // 1 for N-1, 2 for N-2, 3 for N-3
      const off = box.w * (0.12 + mirrorSlot * 0.13);
      return {
        x: -half - off,
        y: cy,
        scale: 1 - mirrorSlot * 0.12,
        opacity: mirrorSlot === 1 ? 0.9 : mirrorSlot === 2 ? 0.6 : 0.35,
        zIndex: 40 - mirrorSlot,
      };
    }
    
    // Hidden cards
    return { x: -half, y: cy, scale: 0.55, opacity: 0, zIndex: 0 };
  };

  const close = useCallback(() => setLightbox(null), []);
  const step = useCallback(
    (dir: number) => setLightbox((i) => (i === null ? i : (i + dir + N) % N)),
    [],
  );

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, close, step]);

  const lb = lightbox === null ? null : GALLERY[lightbox];

  return (
    <section id="gallery" className="scroll-mt-24 overflow-hidden bg-black py-24 sm:py-32">
      <div className="shell">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow>Moments</Eyebrow>
          <h2 className="mt-3 text-4xl sm:text-5xl">Evenings at Paper Moon</h2>
        </Reveal>
      </div>

      {/* Carousel */}
      <div
        ref={containerRef}
        className="relative mt-12 h-[360px] w-full overflow-hidden sm:h-[460px] lg:h-[540px]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {GALLERY.map((item, i) => {
          const slot = (i - index + N) % N;
          const t = reduce ? target(0) : target(slot);
          const isCenter = slot === 0;
          return (
            <motion.button
              key={item.caption}
              type="button"
              initial={false}
              animate={t}
              transition={{ duration: 0.6, ease: EASE, zIndex: { duration: 0 } }}
              onClick={() => (isCenter ? setLightbox(i) : setIndex(i))}
              aria-label={isCenter ? `Open ${item.caption}` : `Show ${item.caption}`}
              aria-hidden={reduce && !isCenter ? true : undefined}
              style={{
                width: cardW,
                height: cardH,
                left: "50%",
                top: "50%",
                position: "absolute",
                pointerEvents: t.opacity < 0.2 ? "none" : "auto",
                display: reduce && !isCenter ? "none" : "block",
              }}
              className="group overflow-hidden rounded-lg shadow-2xl shadow-black/60 ring-1 ring-cream/5"
            >
              <FoodImage
                src={item.image}
                alt={item.alt}
                fill
                sizes="(max-width: 768px) 70vw, 45vw"
                className={isCenter ? "transition-transform duration-700 group-hover:scale-105" : ""}
              />
            </motion.button>
          );
        })}
      </div>

      {/* Caption + dots */}
      <div className="shell mt-8 flex flex-col items-center gap-5">
        <div className="relative flex h-7 items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
              className="text-sm uppercase tracking-wide2 text-cream/70"
            >
              {GALLERY[index].caption}
            </motion.p>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-center gap-2.5">
          {GALLERY.map((item, i) => (
            <button
              key={item.caption}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show ${item.caption}`}
              aria-current={i === index}
              className={`h-2 rounded-full transition-all duration-500 ${
                i === index ? "w-7 bg-cream" : "w-2 bg-cream/30 hover:bg-cream/60"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lb && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label={lb.caption}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-cream/30 text-cream transition-colors hover:bg-cream hover:text-charcoal"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5}>
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              </svg>
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                step(-1);
              }}
              aria-label="Previous"
              className="absolute left-4 flex h-11 w-11 items-center justify-center rounded-full border border-cream/30 text-cream transition-colors hover:bg-cream hover:text-charcoal sm:left-8"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5}>
                <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                step(1);
              }}
              aria-label="Next"
              className="absolute right-4 flex h-11 w-11 items-center justify-center rounded-full border border-cream/30 text-cream transition-colors hover:bg-cream hover:text-charcoal sm:right-8"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5}>
                <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <motion.figure
              key={lightbox}
              initial={{ opacity: 0, scale: reduce ? 1 : 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: reduce ? 1 : 0.95 }}
              transition={{ duration: 0.4, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
              className="relative flex max-h-[85vh] w-full max-w-4xl flex-col items-center"
            >
              <div className="relative h-[70vh] w-full">
                <Image src={lb.image} alt={lb.alt} fill sizes="100vw" className="object-contain" />
              </div>
              <figcaption className="mt-4 text-sm uppercase tracking-wide2 text-cream/70">
                {lb.caption}
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
