"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";

type Status = "idle" | "submitting" | "success" | "error";

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="block text-xs uppercase tracking-wide2 text-charcoal/60"
      >
        {label}
      </label>
      <div className="relative">
        {children}
        <span className="pointer-events-none absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-charcoal transition-transform duration-300 ease-out peer-focus:scale-x-100" />
      </div>
    </div>
  );
}

const inputClass =
  "peer w-full border-b border-charcoal/25 bg-transparent py-2 text-charcoal placeholder-charcoal/40 focus:outline-none";

export function Reservation() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      const res = await fetch("/api/reserve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section
      id="reserve"
      className="relative scroll-mt-24 overflow-hidden bg-black py-24 sm:py-32"
    >
      {/* Faint grid backdrop (brief §5.8) */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(243,239,230,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(243,239,230,0.06) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="shell relative">
        <Reveal className="mx-auto max-w-2xl overflow-hidden rounded-none bg-cream px-7 py-12 text-charcoal shadow-2xl shadow-black/40 sm:px-12">
          <div className="text-center">
            <Eyebrow dark>Reservation</Eyebrow>
            <h2 className="mt-2 text-4xl sm:text-5xl">Reserve a Table</h2>
          </div>

          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="mt-10 flex flex-col items-center gap-4 py-10 text-center"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-none border border-charcoal/30">
                  <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth={1.4}>
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <h3 className="font-serif text-3xl">Thank you</h3>
                <p className="max-w-sm text-charcoal/70">
                  Your request has reached us. We&apos;ll confirm your table by phone or email
                  shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="mt-2 text-sm uppercase tracking-wide2 text-charcoal/60 underline-offset-4 hover:underline"
                >
                  Make another reservation
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={onSubmit}
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mt-10"
              >
                <Stagger gap={0.06} className="grid grid-cols-1 gap-7 sm:grid-cols-2">
                  <StaggerItem>
                    <Field label="Seating Preference" htmlFor="seating">
                      <select id="seating" name="seating" className={inputClass} defaultValue="Indoor">
                        <option>Indoor</option>
                        <option>Terrace</option>
                        <option>Bar</option>
                      </select>
                    </Field>
                  </StaggerItem>
                  <StaggerItem>
                    <Field label="Guests" htmlFor="guests">
                      <input
                        id="guests"
                        name="guests"
                        type="number"
                        min={1}
                        max={30}
                        required
                        placeholder="Number of guests"
                        className={inputClass}
                      />
                    </Field>
                  </StaggerItem>
                  <StaggerItem>
                    <Field label="Date" htmlFor="date">
                      <input id="date" name="date" type="date" required className={inputClass} />
                    </Field>
                  </StaggerItem>
                  <StaggerItem>
                    <Field label="Time" htmlFor="time">
                      <input id="time" name="time" type="time" required className={inputClass} />
                    </Field>
                  </StaggerItem>
                  <StaggerItem className="sm:col-span-2">
                    <Field label="Special Request" htmlFor="message">
                      <textarea
                        id="message"
                        name="message"
                        rows={2}
                        placeholder="A quiet corner, a celebration, dietary notes…"
                        className={`${inputClass} resize-none`}
                      />
                    </Field>
                  </StaggerItem>
                  <StaggerItem>
                    <Field label="Name" htmlFor="name">
                      <input id="name" name="name" required placeholder="Jane Smith" className={inputClass} />
                    </Field>
                  </StaggerItem>
                  <StaggerItem>
                    <Field label="Phone" htmlFor="phone">
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        placeholder="+387 ..."
                        className={inputClass}
                      />
                    </Field>
                  </StaggerItem>
                  <StaggerItem className="sm:col-span-2">
                    <Field label="Email" htmlFor="email">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="sample@gmail.com"
                        className={inputClass}
                      />
                    </Field>
                  </StaggerItem>
                </Stagger>

                <div className="mt-10 flex flex-col items-center gap-3">
                  <motion.button
                    type="submit"
                    disabled={status === "submitting"}
                    whileTap={{ scale: 0.97 }}
                    className="rounded-full border border-charcoal px-10 py-3 text-sm uppercase tracking-wide2 text-charcoal transition-colors duration-300 hover:bg-charcoal hover:text-cream disabled:opacity-60"
                  >
                    {status === "submitting" ? "Sending…" : "Reserve a Table"}
                  </motion.button>
                  {status === "error" && (
                    <p className="text-sm text-red-700">
                      Something went wrong. Please call us at +387 33 956 939.
                    </p>
                  )}
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  );
}
