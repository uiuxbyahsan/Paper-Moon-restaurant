"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";
import { translations, type Language } from "@/lib/translations";

// Primary language first.
const LANGUAGES: Language[] = ["bs", "en"];

const EASE = [0.22, 1, 0.36, 1] as const;

function ChevronDown({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`h-3.5 w-3.5 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      aria-hidden="true"
    >
      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Flag({ code }: { code: Language }) {
  return (
    <img
      src={translations[code].meta.flag}
      alt=""
      width={20}
      height={20}
      className="h-5 w-5 rounded-full object-cover"
    />
  );
}

type LanguageSwitcherProps = {
  variant?: "desktop" | "mobile";
  /** Called after a language is chosen (e.g. so the parent can close a drawer). */
  onSelect?: () => void;
};

export function LanguageSwitcher({ variant = "desktop", onSelect }: LanguageSwitcherProps) {
  const { language, setLanguage, t } = useLanguage();
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  // Close on Escape (both variants).
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // Close on outside click — desktop floating card only. The mobile accordion
  // lives inside the drawer, so it has no outside-click handler.
  useEffect(() => {
    if (variant !== "desktop" || !open) return;
    const onClick = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [variant, open]);

  const choose = (code: Language) => {
    setLanguage(code);
    setOpen(false);
    onSelect?.();
  };

  const trigger = (
    <button
      type="button"
      onClick={() => setOpen((v) => !v)}
      aria-label={t.nav.changeLanguage}
      aria-haspopup="true"
      aria-expanded={open}
      aria-controls={menuId}
      className={
        variant === "desktop"
          ? "flex items-center gap-1.5 text-sm tracking-wide2 text-cream/85 transition-colors hover:text-cream"
          : "flex items-center gap-1.5 py-4 font-serif text-3xl text-cream"
      }
    >
      <span>{t.meta.abbr}</span>
      <ChevronDown open={open} />
    </button>
  );

  // ---- Desktop: floating card dropdown ----
  if (variant === "desktop") {
    return (
      <div ref={rootRef} className="relative">
        {trigger}
        <AnimatePresence>
          {open && (
            <motion.ul
              id={menuId}
              role="menu"
              initial={{ opacity: 0, y: reduce ? 0 : -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reduce ? 0 : -6 }}
              transition={{ duration: 0.2, ease: EASE }}
              className="absolute right-0 top-full z-50 mt-3 min-w-[10rem] overflow-hidden rounded-xl border border-cream/10 bg-charcoal py-2 text-cream shadow-xl shadow-black/40"
            >
              {LANGUAGES.map((code) => {
                const active = code === language;
                return (
                  <li key={code} role="none">
                    <button
                      type="button"
                      role="menuitem"
                      onClick={() => choose(code)}
                      className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors hover:bg-cream/5"
                    >
                      <Flag code={code} />
                      <span
                        className={
                          active
                            ? "font-medium text-cream underline decoration-cream decoration-2 underline-offset-4"
                            : "text-cream/60"
                        }
                      >
                        {translations[code].meta.label}
                      </span>
                    </button>
                  </li>
                );
              })}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // ---- Mobile: inline accordion (no floating card) ----
  return (
    <div>
      {trigger}
      <AnimatePresence initial={false}>
        {open && (
          <motion.ul
            id={menuId}
            role="menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.28, ease: EASE }}
            className="overflow-hidden"
          >
            {LANGUAGES.map((code) => {
              const active = code === language;
              return (
                <li key={code} role="none">
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => choose(code)}
                    className="flex w-full items-center gap-3 py-3 text-left"
                  >
                    <Flag code={code} />
                    <span className={`font-serif text-2xl ${active ? "text-cream" : "text-cream/60"}`}>
                      {translations[code].meta.label}
                    </span>
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
