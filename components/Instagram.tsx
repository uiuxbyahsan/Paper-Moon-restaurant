"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Reveal } from "@/components/ui/motion";

const REELS = [
  {
    src: "/images/food/fig-prosciutto-crostini.jpg",
    alt: "Fig & Prosciutto Crostini Reel",
    views: "14.2K",
    likes: "1,248",
  },
  {
    src: "/images/food/morning-croissant.jpg",
    alt: "Morning Croissant Reel",
    views: "28.5K",
    likes: "2,840",
  },
  {
    src: "/images/food/kadaif.jpg",
    alt: "Kadaif Recipe Reel",
    views: "19.8K",
    likes: "1,980",
  },
  {
    src: "/images/food/burrata-heirloom-tomato.jpg",
    alt: "Burrata & Tomato Plating Reel",
    views: "11.3K",
    likes: "942",
  },
  {
    src: "/images/table-setting.jpg",
    alt: "Dining Room Ambience Reel",
    views: "8.9K",
    likes: "612",
  },
  {
    src: "/images/food/cheesecake.jpg",
    alt: "Cheesecake Slicing Reel",
    views: "16.4K",
    likes: "1,310",
  },
];

export function Instagram() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, scrollLeft: 0 });

  const onPointerDown = (e: React.PointerEvent) => {
    const track = trackRef.current;
    if (!track) return;
    setIsDragging(true);
    dragStart.current = {
      x: e.clientX,
      scrollLeft: track.scrollLeft,
    };
    track.setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const track = trackRef.current;
    if (!track) return;
    const dx = e.clientX - dragStart.current.x;
    track.scrollLeft = dragStart.current.scrollLeft - dx;
  };

  const onPointerUp = () => {
    setIsDragging(false);
  };

  return (
    <section className="bg-black py-24 sm:py-32 overflow-hidden border-t border-cream/5">
      <div className="shell mb-14 text-center">
        <Reveal>
          <h2 className="text-4xl sm:text-5xl font-serif">Follow us on Instagram</h2>
          <p className="mt-4 text-cream/60 max-w-xl mx-auto text-base">
            See our latest dishes, evening moments, and behind-the-scenes stories.
          </p>
          <a
            href="https://www.instagram.com/papermoon.sarajevo_/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block font-sans text-lg tracking-wide text-cream/60 hover:text-cream transition-colors duration-300"
          >
            @papermoon.sarajevo_
          </a>
        </Reveal>
      </div>

      {/* Draggable track of portrait/reel cards */}
      <div className="relative w-full">
        <div
          ref={trackRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          className="flex gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory touch-pan-y select-none cursor-grab active:cursor-grabbing px-6 sm:px-12 py-4"
        >
          {REELS.map((reel, i) => (
            <a
              key={i}
              href="https://www.instagram.com/papermoon.sarajevo_/"
              target="_blank"
              rel="noopener noreferrer"
              className="snap-start shrink-0 w-[240px] sm:w-[280px] aspect-[9/16] relative overflow-hidden group rounded-none"
              draggable={false}
            >
              {/* Image base */}
              <Image
                src={reel.src}
                alt={reel.alt}
                fill
                sizes="(max-width: 640px) 240px, 280px"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                draggable={false}
              />
              
              {/* Subtle gradient overlay at bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent z-10" />

              {/* Hover overlay (darker gradient + interaction details) */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out z-20" />

              {/* Reels icon indicator top-right */}
              <div className="absolute top-4 right-4 z-30 bg-black/45 backdrop-blur-md p-2 text-cream">
                <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth={1.8}>
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M3 9h18M9 21V9M14 9l-2-3M9 9l2-3M19 9l-2-3M14 9l2 3M9 9l2 3" />
                </svg>
              </div>

              {/* Social Metrics overlay bottom-left */}
              <div className="absolute bottom-0 inset-x-0 p-5 z-30 flex flex-col justify-end">
                <div className="flex items-center gap-4 text-cream/90 text-sm font-sans tracking-wide">
                  <div className="flex items-center gap-1.5">
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                    <span>{reel.views}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                    <span>{reel.likes}</span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
