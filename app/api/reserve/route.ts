import { NextResponse } from "next/server";

/**
 * Reservation endpoint.
 *
 * Validates the incoming form data then forwards it to papermoon.sa@gmail.com
 * via whichever provider is configured through environment variables:
 *
 *   RESEND_API_KEY  → uses the Resend transactional email API (recommended).
 *   FORMSPREE_URL   → POSTs to a Formspree endpoint (no API key needed).
 *
 * If neither variable is set the request is logged server-side only, which is
 * perfectly fine for local development. Set one of the above in your Netlify
 * (or other host) environment variables panel before going live.
 */

const REQUIRED = ["name", "email", "phone", "date", "time", "guests"] as const;

const RESTAURANT_EMAIL = "papermoon.sa@gmail.com";

/** Build a clean HTML email body from the reservation data. */
function buildHtml(data: Record<string, unknown>): string {
  const row = (label: string, key: string) =>
    `<tr><td style="padding:6px 12px;color:#555;width:130px">${label}</td><td style="padding:6px 12px;font-weight:600">${String(data[key] ?? "—")}</td></tr>`;

  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /><title>New Reservation – Paper Moon</title></head>
<body style="font-family:Georgia,serif;background:#f5f1ea;margin:0;padding:32px">
  <div style="max-width:540px;margin:0 auto;background:#fff;border-top:4px solid #1a1a1a;padding:32px">
    <h1 style="font-size:1.5rem;margin:0 0 4px">New Reservation Request</h1>
    <p style="color:#888;margin:0 0 24px;font-size:0.85rem">Paper Moon · Sarajevo</p>
    <table style="border-collapse:collapse;width:100%">
      ${row("Name", "name")}
      ${row("Email", "email")}
      ${row("Phone", "phone")}
      ${row("Date", "date")}
      ${row("Time", "time")}
      ${row("Guests", "guests")}
      ${row("Seating", "seating")}
      ${row("Message", "message")}
    </table>
    <p style="margin:24px 0 0;font-size:0.75rem;color:#aaa">Sent automatically from the Paper Moon website reservation form.</p>
  </div>
</body>
</html>`;
}

/** Forward the reservation via Resend (https://resend.com). */
async function sendViaResend(data: Record<string, unknown>): Promise<void> {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Paper Moon Website <onboarding@resend.dev>",
      to: [RESTAURANT_EMAIL],
      subject: `New Reservation – ${String(data.name)} on ${String(data.date)}`,
      html: buildHtml(data),
    }),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Resend error ${res.status}: ${body}`);
  }
}

/** Forward the reservation via Formspree (https://formspree.io). */
async function sendViaFormspree(data: Record<string, unknown>): Promise<void> {
  const res = await fetch(process.env.FORMSPREE_URL as string, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Formspree error ${res.status}: ${body}`);
  }
}

export async function POST(req: Request) {
  let data: Record<string, unknown>;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Validate required fields.
  const missing = REQUIRED.filter((key) => {
    const value = data[key];
    return value === undefined || value === null || String(value).trim() === "";
  });
  if (missing.length > 0) {
    return NextResponse.json(
      { error: `Missing required field(s): ${missing.join(", ")}` },
      { status: 400 },
    );
  }

  const email = String(data.email);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
  }

  // Forward the reservation to the restaurant via the configured provider.
  try {
    if (process.env.RESEND_API_KEY) {
      await sendViaResend(data);
      console.log("[paper-moon] reservation forwarded via Resend:", data.name);
    } else if (process.env.FORMSPREE_URL) {
      await sendViaFormspree(data);
      console.log("[paper-moon] reservation forwarded via Formspree:", data.name);
    } else {
      // Development fallback — no provider configured.
      console.log("[paper-moon] new reservation request (no provider set):", data);
    }
  } catch (err) {
    console.error("[paper-moon] failed to forward reservation:", err);
    // Return a 500 so the client can show the phone-number fallback message.
    return NextResponse.json(
      { error: "Could not send reservation. Please call us directly." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
