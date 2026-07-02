"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

const HEADLINE = "Where elegance meets flavor";
const EASE = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // Measure the viewport so the image can grow to an exact full-bleed rectangle
  // (px width/height, not transform-scale, so the arch curve genuinely flattens
  // and the overlaid text never scales). Seeded with a constant for stable SSR.
  const [vp, setVp] = useState({ w: 1280, h: 800 });
  useEffect(() => {
    const update = () => setVp({ w: window.innerWidth, h: window.innerHeight });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Scroll progress across the 200vh container. With ["start start", "end end"]
  // progress reaches 1 exactly as the sticky pin releases — the image hits
  // full-bleed at the moment the hero hands off to the next section.
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end end"] });

  const isMobile = vp.w < 640;
  const archW = Math.min(440, vp.w * 0.86);
  const archH = isMobile ? Math.min(360, vp.h * 0.46) : Math.min(560, vp.h * 0.66);

  // Continuously scroll-scrubbed image geometry. Reduced motion → static
  // full-bleed at every scroll position.
  const width = useTransform(scrollYProgress, [0, 1], reduce ? [vp.w, vp.w] : [archW, vp.w]);
  const height = useTransform(scrollYProgress, [0, 1], reduce ? [vp.h, vp.h] : [archH, vp.h]);
  // One motion value → one style prop. Shorthand rounds only the top corners
  // (TL TR BR BL) so the box reads as an arch, then flattens to a rectangle.
  const radius = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? ["0% 0% 0% 0%", "0% 0% 0% 0%"] : ["48% 48% 0% 0%", "0% 0% 0% 0%"],
  );
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], reduce ? [0.4, 0.4] : [0.4, 0.85]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  return (
    <section ref={heroRef} id="top" className={`relative ${reduce ? "h-[100svh]" : "h-[200vh]"}`}>
      {/* Flanking copy — normal-flow layer pinned to the first viewport of the
          section, NOT to the sticky group, so it scrolls away as the reveal
          begins. Desktop: left/right at headline height. Mobile: above/below. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-[100svh]">
        <p className="absolute left-6 right-6 top-[14%] mx-auto max-w-[16rem] text-center text-sm leading-relaxed text-cream/70 md:left-12 md:right-auto md:top-[60%] md:mx-0 md:max-w-[13rem] md:-translate-y-1/2 md:text-left">
          From sunrise brunches to candlelit dinners, every plate has a story.
        </p>
        <p className="absolute bottom-[15%] left-6 right-6 mx-auto max-w-[16rem] text-center text-sm leading-relaxed text-cream/70 md:bottom-auto md:left-auto md:right-12 md:top-[60%] md:mx-0 md:max-w-[13rem] md:-translate-y-1/2 md:text-right">
          Sarajevo&apos;s quiet corner since 2015.
        </p>
      </div>

      {/* Pinned group: image + text overlay + scroll indicator share one
          stacking context and stay centered in the viewport the whole time. */}
      <div className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden">
        {/* Image background layer */}
        <motion.div
          style={{ width, height, borderRadius: radius }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: reduce ? 0.6 : 1, ease: EASE }}
          className="relative z-0 overflow-hidden"
        >
          <Image
            src="/images/terrace-night.jpg"
            alt="Paper Moon's candlelit terrace at night, set with mosaic-tile tables under a glowing chandelier"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          {/* Gradient overlay keeps the headline legible as the photo enlarges. */}
          <motion.div
            style={{ opacity: overlayOpacity }}
            className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/15"
          />
        </motion.div>

        {/* Text overlay — floats directly on the photo, pinned in place. */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center">
          <motion.h1
            className="font-serif italic font-light leading-[1.05] text-cream [text-shadow:0_2px_30px_rgba(0,0,0,0.55)]"
            style={{ fontSize: "clamp(2.8rem, 8.5vw, 7rem)", letterSpacing: "-0.01em" }}
            initial={{ opacity: 0, y: reduce ? 0 : 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
          >
            {HEADLINE}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: reduce ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7, ease: EASE }}
            className="mt-6 max-w-md text-base text-cream/85 [text-shadow:0_2px_20px_rgba(0,0,0,0.5)] sm:text-lg"
          >
            Crafted for memorable dining.
          </motion.p>

          <motion.a
            href="#reserve"
            initial={{ opacity: 0, y: reduce ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.7, ease: EASE }}
            className="pill-cream mt-8"
          >
            Reserve a Table
          </motion.a>
        </div>

        {/* Scroll indicator — part of the pinned group, fades as the reveal starts. */}
        <motion.div
          style={{ opacity: hintOpacity }}
          className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3"
        >
          <span className="relative h-12 w-px overflow-hidden bg-cream/15">
            <span className="absolute inset-0 origin-top animate-scroll-draw bg-cream" />
          </span>
          <span className="text-[0.7rem] uppercase tracking-eyebrow text-cream/60">Scroll</span>
        </motion.div>
      </div>
    </section>
  );
}
