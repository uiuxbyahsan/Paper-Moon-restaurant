"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Logo } from "@/components/Logo";
import { NAV_LINKS } from "@/lib/site";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Not sticky/fixed (brief Fix 6): the header sits at the top, overlaps the hero,
  // and scrolls away with the page. Transparent the whole time it's on screen.
  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav className="shell flex h-20 items-center justify-between" aria-label="Primary">
        <a href="#top" className="flex items-center" aria-label="Paper Moon — home">
          <Logo tone="onDark" className="h-11 w-auto sm:h-12" priority />
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-9 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative text-sm tracking-wide2 text-cream/85 transition-colors hover:text-cream"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-cream transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
          <a href="#reserve" className="pill-cream">
            Reserve a Table
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          <span
            className={`block h-px w-6 bg-cream transition-all duration-300 ${
              open ? "translate-y-[3.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-px w-6 bg-cream transition-all duration-300 ${
              open ? "-translate-y-[3.5px] -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/60 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              id="mobile-menu"
              className="fixed right-0 top-0 z-40 flex h-[100dvh] w-[78%] max-w-sm flex-col bg-black px-8 pb-10 pt-28 lg:hidden"
              initial={{ x: reduce ? 0 : "100%", opacity: reduce ? 0 : 1 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: reduce ? 0 : "100%", opacity: reduce ? 0 : 1 }}
              transition={{ type: "tween", duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.ul
                className="flex flex-col gap-2"
                initial="hidden"
                animate="show"
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } } }}
              >
                {NAV_LINKS.map((link) => (
                  <motion.li
                    key={link.href}
                    variants={{
                      hidden: { opacity: 0, x: reduce ? 0 : 20 },
                      show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
                    }}
                  >
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="block border-b border-cream/10 py-4 font-serif text-3xl text-cream"
                    >
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </motion.ul>
              <a href="#reserve" onClick={() => setOpen(false)} className="pill-cream mt-8 w-full">
                Reserve a Table
              </a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
