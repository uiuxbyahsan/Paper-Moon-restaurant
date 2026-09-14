"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FoodImage } from "@/components/ui/FoodImage";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { SIGNATURES, SIGNATURE_DEFAULT_ID, type SignatureWord } from "@/lib/content";
import { useLanguage } from "@/lib/LanguageContext";

const ALL_WORDS = [...SIGNATURES.left, ...SIGNATURES.right];

function WordColumn({
  words,
  side,
  hoveredItem,
  setHoveredItem,
  setActive,
  label,
}: {
  words: readonly SignatureWord[];
  side: "left" | "right";
  hoveredItem: string | null;
  setHoveredItem: (id: string | null) => void;
  setActive: (id: string) => void;
  label: (id: string) => string;
}) {
  const align = side === "left" ? "lg:items-start lg:text-left" : "lg:items-end lg:text-right";
  const fromX = side === "left" ? -48 : 48;
  return (
    <Stagger gap={0.1} amount={0.4} className={`flex flex-col items-center gap-2 text-center ${align}`}>
      {words.map(({ id }) => {
        const isHovered = id === hoveredItem;
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
          <StaggerItem key={id} x={fromX} duration={0.55}>
            <button
              type="button"
              onMouseEnter={() => {
                setHoveredItem(id);
                setActive(id);
              }}
              onFocus={() => {
                setHoveredItem(id);
                setActive(id);
              }}
              onMouseLeave={() => setHoveredItem(null)}
              onBlur={() => setHoveredItem(null)}
              className={`block font-serif uppercase leading-[0.9] transition-all duration-500 ease-out font-light ${textOpacityClass}`}
              style={{
                fontSize,
              }}
            >
              {label(id)}
            </button>
          </StaggerItem>
        );
      })}
    </Stagger>
  );
}

export function Signatures() {
  const { t } = useLanguage();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [active, setActive] = useState(SIGNATURE_DEFAULT_ID);
  const current = ALL_WORDS.find((w) => w.id === active) ?? ALL_WORDS[0];
  const wordLabel = (id: string) => t.signatures.words[id];
  const dishName = t.menu.items[current.dishId].name;

  return (
    <section className="overflow-hidden bg-black py-24 sm:py-32">
      <Reveal className="shell mb-14 text-center">
        <Eyebrow>{t.signatures.eyebrow}</Eyebrow>
      </Reveal>

      {/* Leaving the whole block reverts to the default (KADAIF) image. */}
      <div
        className="shell grid grid-cols-1 items-center gap-y-12 lg:grid-cols-[1fr_auto_1fr] lg:gap-x-10"
        onMouseLeave={() => {
          setHoveredItem(null);
          setActive(SIGNATURE_DEFAULT_ID);
        }}
      >
        <div className="order-2 lg:order-1">
          <WordColumn
            words={SIGNATURES.left}
            side="left"
            hoveredItem={hoveredItem}
            setHoveredItem={setHoveredItem}
            setActive={setActive}
            label={wordLabel}
          />
        </div>

        <Reveal y={0} duration={0.9} className="order-1 mx-auto lg:order-2">
          <div className="relative h-[clamp(260px,34vw,360px)] w-[clamp(230px,27vw,310px)] overflow-hidden rounded-sm">
            <AnimatePresence initial={false}>
              <motion.div
                key={current.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                className="absolute inset-0"
              >
                <div className="absolute inset-0 animate-ken-burns">
                  <FoodImage
                    src={current.image}
                    alt={dishName}
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
                  key={current.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.28 }}
                  className="text-center font-serif text-lg text-cream [text-shadow:0_1px_12px_rgba(0,0,0,0.8)]"
                >
                  {dishName}
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
            label={wordLabel}
          />
        </div>
      </div>
    </section>
  );
}
