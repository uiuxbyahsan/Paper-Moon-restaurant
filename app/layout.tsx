import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, Petit_Formal_Script } from "next/font/google";
import "./globals.css";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const script = Petit_Formal_Script({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-script",
  display: "swap",
});

const SITE_URL = "https://papermoon.ba";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Paper Moon | Sarajevo Brasserie Since 2015",
    template: "%s | Paper Moon",
  },
  description: "Where elegance meets flavor since 2015.",
  keywords: [
    "Paper Moon",
    "Sarajevo restaurant",
    "brasserie",
    "fine dining Sarajevo",
    "brunch Sarajevo",
    "Bosnia restaurant",
  ],
  openGraph: {
    title: "Paper Moon | Sarajevo Brasserie Since 2015",
    description: "Where elegance meets flavor since 2015.",
    url: SITE_URL,
    siteName: "Paper Moon",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/terrace-night.jpg",
        width: 1200,
        height: 630,
        alt: "Paper Moon's candlelit terrace in Sarajevo at night",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Paper Moon | Sarajevo Brasserie Since 2015",
    description: "Where elegance meets flavor since 2015.",
    images: ["/images/terrace-night.jpg"],
  },
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable} ${script.variable}`}>
      <body className="bg-black text-cream antialiased">{children}</body>
    </html>
  );
}
