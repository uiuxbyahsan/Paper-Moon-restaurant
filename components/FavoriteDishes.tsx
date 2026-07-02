"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FoodImage } from "@/components/ui/FoodImage";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/motion";
import { FAVORITE_DISHES } from "@/lib/content";

const SPEED = 0.6; // px per frame — slow, steady right-to-left drift

export function FavoriteDishes() {
  const reduce = useReducedMotion();
  const items = FAVORITE_DISHES;
  // Triplicate so the loop seam is invisible and drag works in both directions.
  const loop = [...items, ...items, ...items];

  const trackRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const ctrl = useRef({
    paused: false,
    dragging: false,
    startX: 0,
    startLeft: 0,
    setW: 0,
    raf: 0,
    inited: false,
  });
  const [activeChild, setActiveChild] = useState(0);
  const active = activeChild % items.length;

  // Measure one copy's width and start in the middle copy.
  useEffect(() => {
    if (reduce) return;
    const track = trackRef.current;
    if (!track) return;
    const init = () => {
      ctrl.current.setW = track.scrollWidth / 3;
      if (!ctrl.current.inited && ctrl.current.setW > 0) {
        track.scrollLeft = ctrl.current.setW;
        ctrl.current.inited = true;
      }
    };
    init();
    window.addEventListener("resize", init);
    return () => window.removeEventListener("resize", init);
  }, [reduce]);

  // Continuous auto-scroll + center detection.
  useEffect(() => {
    if (reduce) return;
    const track = trackRef.current;
    if (!track) return;

    const recompute = () => {
      const center = track.scrollLeft + track.clientWidth / 2;
      let best = 0;
      let bestDist = Infinity;
      itemRefs.current.forEach((el, i) => {
        if (!el) return;
        const c = el.offsetLeft + el.offsetWidth / 2;
        const d = Math.abs(c - center);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      });
      setActiveChild(best);
    };

    const state = ctrl.current;
    const tick = () => {
      if (!state.paused && !state.dragging && state.setW > 0) {
        track.scrollLeft += SPEED;
        if (track.scrollLeft >= state.setW * 2) track.scrollLeft -= state.setW;
      }
      recompute();
      state.raf = requestAnimationFrame(tick);
    };
    state.raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(state.raf);
  }, [reduce]);

  // Keep the scroll position inside the middle copy during manual drag.
  const wrap = () => {
    const track = trackRef.current;
    const c = ctrl.current;
    if (!track || !c.setW) return;
    if (track.scrollLeft >= c.setW * 2) track.scrollLeft -= c.setW;
    else if (track.scrollLeft < c.setW) track.scrollLeft += c.setW;
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

  if (reduce) {
    // Static, evenly-spaced row — no auto-loop.
    return (
      <section className="overflow-hidden bg-black py-24 sm:py-28">
        <Reveal className="shell mb-12 text-center">
          <Eyebrow>Favorite Dishes</Eyebrow>
        </Reveal>
        <div className="shell flex flex-wrap items-start justify-center gap-x-8 gap-y-10">
          {items.map((dish) => (
            <div key={dish.name} className="flex flex-col items-center gap-3 group cursor-pointer">
              <div className="relative block h-60 w-44 sm:h-80 sm:w-60 overflow-hidden">
                <div className="absolute inset-0 z-0 transition-transform duration-700 ease-out group-hover:scale-105">
                  <FoodImage src={dish.image} alt={dish.name} fill sizes="(max-width: 640px) 11rem, 15rem" />
                </div>
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out z-10" />
                {/* Dish name reveal */}
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-4 opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-300 ease-out">
                  <p className="text-center font-serif text-lg sm:text-xl text-cream">
                    {dish.name}
                  </p>
                </div>
              </div>
              <span className="text-center font-serif text-lg leading-tight text-cream/85 group-hover:text-cream transition-colors duration-300">
                {dish.name}
              </span>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="overflow-hidden bg-black py-24 sm:py-28">
      <Reveal className="shell mb-12 text-center">
        <Eyebrow>Favorite Dishes</Eyebrow>
      </Reveal>

      <div
        ref={trackRef}
        className="no-scrollbar flex touch-pan-y cursor-grab select-none items-center gap-8 overflow-x-hidden active:cursor-grabbing sm:gap-12"
        onPointerEnter={() => (ctrl.current.paused = true)}
        onPointerLeave={() => {
          ctrl.current.paused = false;
          ctrl.current.dragging = false;
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        {loop.map((dish, i) => {
          const isActive = i === activeChild;
          const dishName = i < items.length ? dish.name : items[i % items.length].name;
          return (
            <div
              key={i}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              className="shrink-0 group cursor-pointer"
              aria-hidden={i >= items.length}
            >
              <div
                className={`relative block overflow-hidden transition-all duration-500 ease-out h-60 w-44 sm:h-80 sm:w-60 ${
                  isActive
                    ? "scale-105 opacity-100 shadow-2xl shadow-black/60"
                    : "scale-95 opacity-45 hover:opacity-80"
                }`}
              >
                <div className="absolute inset-0 z-0 transition-transform duration-700 ease-out group-hover:scale-105">
                  <FoodImage
                    src={dish.image}
                    alt={i < items.length ? dish.name : ""}
                    fill
                    draggable={false}
                    sizes="(max-width: 640px) 11rem, 15rem"
                  />
                </div>
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/65 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out z-10" />
                {/* Dish name reveal */}
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-4 opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-300 ease-out">
                  <p className="text-center font-serif text-lg sm:text-xl text-cream px-2">
                    {dishName}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="relative mt-10 flex h-8 items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-2xl text-cream"
          >
            {items[active]?.name}
          </motion.p>
        </AnimatePresence>
      </div>
    </section>
  );
}
