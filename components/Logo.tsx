import Image from "next/image";

type LogoProps = {
  /** "onDark" shows the white mark; "onLight" renders it dark for cream surfaces. */
  tone?: "onDark" | "onLight";
  className?: string;
  priority?: boolean;
};

/**
 * The supplied logo artwork (brief §2 — never redrawn) with its solid black
 * canvas removed to transparency (see scripts/make-logo.mjs). Shown as-is on
 * dark surfaces; inverted to dark on light ones. Alpha is preserved either way.
 */
export function Logo({ tone = "onDark", className = "h-14 w-auto", priority = false }: LogoProps) {
  return (
    <Image
      src="/images/logo.png"
      alt="Paper Moon"
      width={689}
      height={537}
      priority={priority}
      className={`object-contain ${tone === "onLight" ? "[filter:invert(1)]" : ""} ${className}`}
    />
  );
}
