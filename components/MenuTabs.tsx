"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FoodImage } from "@/components/ui/FoodImage";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/motion";
import { CURRENCY, MENU } from "@/lib/menu";

const EASE = [0.22, 1, 0.36, 1] as const;

export function MenuTabs() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const reduce = useReducedMotion();
  const category = MENU[active];

  const trackRef = useRef<HTMLDivElement>(null);
  const ctrl = useRef({
    paused: false,
    dragging: false,
    startX: 0,
    startLeft: 0,
    setW: 0,
    raf: 0,
    inited: false,
  });

  // Triplicate category items to ensure a seamless infinite scroll loop
  const loopItems = [...category.items, ...category.items, ...category.items];

  // Re-measure scroll boundaries when category changes or screen resizes
  useEffect(() => {
    if (reduce) return;
    const track = trackRef.current;
    if (!track) return;

    const init = () => {
      ctrl.current.setW = track.scrollWidth / 3;
      track.scrollLeft = ctrl.current.setW;
      ctrl.current.inited = true;
    };

    const timer = setTimeout(init, 50);
    window.addEventListener("resize", init);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", init);
    };
  }, [category.id, reduce]);

  // Autoscroll drift loop and boundary wrapping
  useEffect(() => {
    if (reduce) return;
    const track = trackRef.current;
    if (!track) return;

    let rafId = 0;

    const tick = () => {
      const state = ctrl.current;
      if (!state.paused && !state.dragging && state.setW > 0) {
        track.scrollLeft += 0.5; // Slow, premium auto-drift
        if (track.scrollLeft >= state.setW * 2) {
          track.scrollLeft -= state.setW;
        }
      }
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [category.id, reduce]);

  const wrap = () => {
    const track = trackRef.current;
    const c = ctrl.current;
    if (!track || !c.setW) return;
    if (track.scrollLeft >= c.setW * 2) {
      track.scrollLeft -= c.setW;
    } else if (track.scrollLeft < c.setW) {
      track.scrollLeft += c.setW;
    }
  };

  const onPointerDown = (e: React.PointerEvent) => {
    const track = trackRef.current;
    if (!track) return;
    ctrl.current.paused = true;
    ctrl.current.dragging = true;
    ctrl.current.startX = e.clientX;
    ctrl.current.startLeft = track.scrollLeft;
    track.setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const track = trackRef.current;
    const c = ctrl.current;
    if (!track || !c.dragging) return;
    track.scrollLeft = c.startLeft - (e.clientX - c.startX);
    wrap();
  };

  const onPointerUp = () => {
    ctrl.current.dragging = false;
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    let next = active;
    if (e.key === "ArrowRight") next = (active + 1) % MENU.length;
    else if (e.key === "ArrowLeft") next = (active - 1 + MENU.length) % MENU.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = MENU.length - 1;
    else return;
    e.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <section id="menu" className="scroll-mt-24 bg-black py-24 sm:py-32">
      <div className="shell">
        <Reveal>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <Eyebrow>Taste the Menu</Eyebrow>
              <h2 className="mt-2 text-5xl sm:text-6xl">Menu</h2>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-cream/60 sm:text-right">
              Fresh ingredients, made to be enjoyed, shared, and ordered again.
            </p>
          </div>
        </Reveal>

        {/* Tabs */}
        <Reveal className="mt-10">
          <div
            role="tablist"
            aria-label="Menu categories"
            onKeyDown={onKeyDown}
            className="no-scrollbar -mx-6 flex gap-2 overflow-x-auto px-6 pb-1"
          >
            {MENU.map((cat, i) => {
              const selected = i === active;
              return (
                <button
                  key={cat.id}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  role="tab"
                  id={`tab-${cat.id}`}
                  aria-selected={selected}
                  aria-controls={`panel-${cat.id}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(i)}
                  className={`shrink-0 rounded-full border px-5 py-2 text-sm tracking-wide2 transition-colors duration-300 ${
                    selected
                      ? "border-cream bg-cream text-charcoal"
                      : "border-cream/25 text-cream/70 hover:border-cream/60 hover:text-cream"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Endless/Continuous Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            ref={trackRef}
            key={category.id}
            id={`panel-${category.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${category.id}`}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.03 } } }}
            className="no-scrollbar -mx-6 mt-10 flex touch-pan-y cursor-grab select-none items-center gap-6 overflow-x-auto px-6 pb-2"
            onPointerEnter={() => (ctrl.current.paused = true)}
            onPointerLeave={() => {
              ctrl.current.paused = false;
              ctrl.current.dragging = false;
            }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
          >
            {loopItems.map((item, idx) => (
              <motion.article
                key={`${item.name}-${idx}`}
                variants={{
                  hidden: { opacity: 0, y: reduce ? 0 : 24 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
                }}
                className="group w-[60vw] shrink-0 sm:w-52 md:w-56 lg:w-60"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <FoodImage
                    src={item.image}
                    alt={item.name}
                    fill
                    draggable={false}
                    sizes="(max-width: 640px) 40vw, 12rem"
                    className="transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
                <div className="mt-4 flex items-baseline justify-between gap-3">
                  <h3 className="font-serif text-base sm:text-lg text-cream">{item.name}</h3>
                  <span className="shrink-0 text-cream/70 text-sm sm:text-base">
                    {item.price} {CURRENCY}
                  </span>
                </div>
                {item.localName && (
                  <p className="mt-0.5 text-xs sm:text-sm italic text-cream/45">{item.localName}</p>
                )}
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>

        <Reveal className="mt-12 flex justify-center">
          <Link href="/menu" className="pill-outline">
            View Full Menu
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
