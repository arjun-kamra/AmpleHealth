import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import GoogleTag from "@/components/GoogleTag";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ample.health"),
  title: {
    default: "AmpleHealth — Internal Medicine in Carmichael & Sacramento, CA",
    template: "%s · AmpleHealth",
  },
  description:
    "AmpleHealth is the internal medicine practice of Dr. Dheeraj Kamra, MD, FACP — exceptional, relationship-driven care across Carmichael and Sacramento, California.",
  keywords: [
    "internal medicine",
    "primary care",
    "Carmichael",
    "Sacramento",
    "Dr. Dheeraj Kamra",
    "FACP",
    "family medicine",
  ],
  openGraph: {
    title: "AmpleHealth — Exceptional care, close to home",
    description:
      "Internal medicine & primary care in Carmichael and Sacramento, CA.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${outfit.variable}`}>
      <head>
        {/*
          UserWay accessibility widget. Emitted as a raw <script> rather than
          next/script because UserWay's install guide requires it to be the
          first entry in <head>: next/script's beforeInteractive strategy emits
          only a preload link plus a deferred client-side bootstrap, which
          neither produces a real script tag nor preserves head ordering.

          data-position="5" puts the widget bottom-left. At its default
          top-right it sat directly on top of the mobile menu button and
          swallowed the taps, leaving the nav unopenable on phones. Bottom-left
          also keeps it clear of the chat bubble in the bottom-right.
        */}
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script
          src="https://cdn.userway.org/widget.js"
          data-account="4KqVvO5Abt"
          data-position="5"
        />
        <GoogleTag />
      </head>
      <body>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
