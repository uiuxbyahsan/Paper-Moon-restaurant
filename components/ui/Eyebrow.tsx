import type { ReactNode } from "react";

/** Small flowing-script section label used above headings (brief §2, §5). */
export function Eyebrow({
  children,
  dark = false,
  className = "",
}: {
  children: ReactNode;
  dark?: boolean;
  className?: string;
}) {
  return <span className={`eyebrow ${dark ? "eyebrow--dark" : ""} ${className}`}>{children}</span>;
}
