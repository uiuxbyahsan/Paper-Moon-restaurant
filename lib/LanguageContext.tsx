"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { motion, useAnimationControls } from "framer-motion";
import { translations, type Language, type Translation } from "@/lib/translations";

const STORAGE_KEY = "papermoon-lang";
const DEFAULT_LANGUAGE: Language = "bs";

type LanguageContextValue = {
  language: Language;
  setLanguage: (lang: Language) => void;
  /** Shorthand for translations[language]. */
  t: Translation;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function isLanguage(value: string | null): value is Language {
  return value === "bs" || value === "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Start on the primary language on both server and first client render so the
  // markup matches — the stored preference is applied in an effect after mount.
  const [language, setLanguageState] = useState<Language>(DEFAULT_LANGUAGE);
  const controls = useAnimationControls();
  const mounted = useRef(false);

  // Read the persisted preference once, after hydration.
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (isLanguage(stored) && stored !== DEFAULT_LANGUAGE) {
        setLanguageState(stored);
      }
    } catch {
      // localStorage may be unavailable (private mode, blocked storage) — ignore.
    }
  }, []);

  // Keep <html lang> in sync with the active language.
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  // Subtle cross-fade on every change after the first render. We animate the
  // opacity of the SAME wrapper node (never remount / re-key the tree) so
  // entrance and scroll animations are not replayed.
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    controls.set({ opacity: 0.3 });
    controls.start({ opacity: 1, transition: { duration: 0.2, ease: "easeOut" } });
  }, [language, controls]);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // Persisting is best-effort; ignore storage failures.
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] }}>
      <motion.div initial={false} animate={controls}>
        {children}
      </motion.div>
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}
