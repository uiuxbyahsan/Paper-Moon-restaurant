"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FoodImage } from "@/components/ui/FoodImage";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { SIGNATURES, SIGNATURE_DEFAULT_WORD, type SignatureWord } from "@/lib/content";

const ALL_WORDS = [...SIGNATURES.left, ...SIGNATURES.right];

function WordColumn({
  words,
  side,
  hoveredItem,
  setHoveredItem,
  setActive,
}: {
  words: readonly SignatureWord[];
  side: "left" | "right";
  hoveredItem: string | null;
  setHoveredItem: (word: string | null) => void;
  setActive: (word: string) => void;
}) {
  const align = side === "left" ? "lg:items-start lg:text-left" : "lg:items-end lg:text-right";
  const fromX = side === "left" ? -48 : 48;
  return (
    <Stagger gap={0.1} amount={0.4} className={`flex flex-col items-center gap-2 text-center ${align}`}>
      {words.map(({ word }) => {
        const isHovered = word === hoveredItem;
        const isAnyHovered = hoveredItem !== null;
        
        // All items smaller by default, only active/hovered scales up
        const fontSize = isHovered 
          ? "clamp(3rem, 7vw, 6rem)" 
          : "clamp(1.4rem, 2.6vw, 2.4rem)";
          
        let textOpacityClass = "text-cream/80 hover:text-cream";
        if (isAnyHovered) {
          textOpacityClass = isHovered ? "text-cream" : "text-cream/25";
        }

        return (
          <StaggerItem key={word} x={fromX} duration={0.55}>
            <button
              type="button"
              onMouseEnter={() => {
                setHoveredItem(word);
                setActive(word);
              }}
              onFocus={() => {
                setHoveredItem(word);
                setActive(word);
              }}
              onMouseLeave={() => setHoveredItem(null)}
              onBlur={() => setHoveredItem(null)}
              className={`block font-serif uppercase leading-[0.9] transition-all duration-500 ease-out font-light ${textOpacityClass}`}
              style={{
                fontSize,
              }}
            >
              {word}
            </button>
          </StaggerItem>
        );
      })}
    </Stagger>
  );
}

export function Signatures() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [active, setActive] = useState(SIGNATURE_DEFAULT_WORD);
  const current = ALL_WORDS.find((w) => w.word === active) ?? ALL_WORDS[0];

  return (
    <section className="overflow-hidden bg-black py-24 sm:py-32">
      <Reveal className="shell mb-14 text-center">
        <Eyebrow>Our Signatures</Eyebrow>
      </Reveal>

      {/* Leaving the whole block reverts to the default (KADAIF) image. */}
      <div
        className="shell grid grid-cols-1 items-center gap-y-12 lg:grid-cols-[1fr_auto_1fr] lg:gap-x-10"
        onMouseLeave={() => {
          setHoveredItem(null);
          setActive(SIGNATURE_DEFAULT_WORD);
        }}
      >
        <div className="order-2 lg:order-1">
          <WordColumn
            words={SIGNATURES.left}
            side="left"
            hoveredItem={hoveredItem}
            setHoveredItem={setHoveredItem}
            setActive={setActive}
          />
        </div>

        <Reveal y={0} duration={0.9} className="order-1 mx-auto lg:order-2">
          <div className="relative h-[clamp(260px,34vw,360px)] w-[clamp(230px,27vw,310px)] overflow-hidden rounded-sm">
            <AnimatePresence initial={false}>
              <motion.div
                key={current.word}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                className="absolute inset-0"
              >
                <div className="absolute inset-0 animate-ken-burns">
                  <FoodImage
                    src={current.image}
                    alt={current.dish}
                    fill
                    sizes="(max-width: 1024px) 70vw, 310px"
                  />
                </div>
              </motion.div>
            </AnimatePresence>
            {/* Caption of the active dish */}
            <div className="absolute inset-x-0 bottom-0 z-10 p-4">
              <AnimatePresence mode="wait">
                <motion.p
                  key={current.word}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.28 }}
                  className="text-center font-serif text-lg text-cream [text-shadow:0_1px_12px_rgba(0,0,0,0.8)]"
                >
                  {current.dish}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
        </Reveal>

        <div className="order-3">
          <WordColumn
            words={SIGNATURES.right}
            side="right"
            hoveredItem={hoveredItem}
            setHoveredItem={setHoveredItem}
            setActive={setActive}
          />
        </div>
      </div>
    </section>
  );
}
