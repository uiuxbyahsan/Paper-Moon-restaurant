"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/motion";

export function Philosophy() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-8%", "8%"]);

  return (
    <section ref={ref} className="bg-black py-20 sm:py-28">
      <div className="shell grid items-stretch gap-8 lg:grid-cols-2">
        {/* Image with parallax */}
        <div className="relative h-[340px] overflow-hidden sm:h-[460px] lg:h-auto lg:min-h-[520px]">
          <motion.div style={{ y }} className="absolute inset-x-0 -inset-y-[10%]">
            <Image
              src="/images/interior-wide.jpg"
              alt="Paper Moon's interior with a wood-beam ceiling, brick wine wall and staircase"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </motion.div>
        </div>

        {/* Message card. Mask-wipe reveal: an overflow-hidden frame with the
            content sliding up into it (transform-only, reliably animatable). */}
        <div className="flex items-center bg-cream px-8 py-14 text-charcoal sm:px-14">
          <div className="overflow-hidden">
            <Reveal y={reduce ? 0 : 90} duration={0.9} amount={0.3}>
              <Eyebrow dark>Our Philosophy</Eyebrow>
              <h2 className="mt-4 text-4xl leading-tight sm:text-5xl">
                Make Every Evening Worth Remembering
              </h2>
              <p className="mt-6 max-w-prose text-base leading-relaxed text-charcoal/75">
                Every plate at Paper Moon is sourced with care, prepared with patience, and served
                with warmth — from early-morning pastries to candlelit dinners. Since 2015, our
                kitchen has celebrated the beauty of simplicity.
              </p>
              <p className="mt-8 font-serif text-2xl italic text-charcoal/60">— Since 2015</p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
