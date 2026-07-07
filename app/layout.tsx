import type { Metadata, Viewport } from "next";
import { Sora, Space_Mono } from "next/font/google";
import { SITE } from "@/lib/data";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  variable: "--font-sora",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.domain),
  title: {
    default: SITE.title,
    template: "%s — Prajwal Kakade",
  },
  description: SITE.description,
  keywords: [
    "web developer",
    "UI/UX designer",
    "React developer",
    "Next.js developer",
    "app interface design",
    "design systems",
    "design to code",
    "website development",
    "Prajwal Kakade",
  ],
  authors: [{ name: SITE.name, url: SITE.domain }],
  creator: SITE.name,
  openGraph: {
    type: "website",
    url: SITE.domain,
    title: SITE.title,
    description: SITE.description,
    siteName: "prajwalkakade.dev",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: SITE.title }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.svg",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0f",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sora.variable} ${spaceMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
