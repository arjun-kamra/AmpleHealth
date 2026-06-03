import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";

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
      <body>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
