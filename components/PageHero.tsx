"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

const easeOut = [0.22, 1, 0.36, 1] as const;

export default function PageHero({
  kicker,
  title,
  highlight,
  description,
  children,
}: {
  kicker: string;
  title: string;
  /** Optional word/phrase rendered in brand blue inside the title. */
  highlight?: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-ink/10 bg-paper-deep">
      {/* layered geometric background */}
      <div className="bg-grid absolute inset-0 opacity-70" />
      <div className="bg-dots absolute right-0 top-0 h-72 w-72 opacity-60 mask-fade-b" />
      <div className="bg-hatch absolute -left-10 bottom-0 h-48 w-48 opacity-70" />
      <div className="pointer-events-none absolute -right-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-brand/10 blur-3xl" />

      <div className="container-page relative py-20 md:py-28">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeOut }}
          className="kicker"
        >
          {kicker}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: easeOut, delay: 0.08 }}
          className="mt-5 max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl"
        >
          {title}{" "}
          {highlight && <span className="text-brand italic">{highlight}</span>}
        </motion.h1>

        {description && (
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: easeOut, delay: 0.16 }}
            className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-ink-muted"
          >
            {description}
          </motion.p>
        )}

        {children && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: easeOut, delay: 0.24 }}
            className="mt-8"
          >
            {children}
          </motion.div>
        )}
      </div>
    </section>
  );
}
