"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { locations, reviews, site } from "@/lib/data";
import { ArrowRight, MapPin } from "@/components/Icons";
import Stars from "@/components/Stars";

const easeOut = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // subtle parallax layers
  const yPanel = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const yPattern = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const yBadge = useTransform(scrollYProgress, [0, 1], [0, -40]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden border-b border-ink/10 bg-paper"
    >
      {/* layered geometric background */}
      <motion.div style={{ y: yPattern }} className="absolute inset-0">
        <div className="bg-grid absolute inset-0 opacity-70" />
        <div className="bg-dots absolute right-0 top-24 h-96 w-96 opacity-50 mask-fade-b" />
        <div className="bg-hatch absolute -left-12 top-1/3 h-56 w-56 opacity-60" />
      </motion.div>
      <div className="pointer-events-none absolute -right-32 top-10 h-[28rem] w-[28rem] rounded-full bg-brand/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-amber/10 blur-3xl" />

      <div className="container-page relative grid items-center gap-14 py-20 md:py-28 lg:grid-cols-[1.05fr_0.95fr]">
        {/* Copy */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easeOut }}
            className="kicker"
          >
            Internal Medicine · Carmichael &amp; Sacramento
          </motion.div>

          <h1 className="mt-6 text-5xl font-semibold leading-[1.02] tracking-tight md:text-7xl">
            {["Exceptional", "care, close", "to home."].map((line, i) => (
              <motion.span
                key={line}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  ease: easeOut,
                  delay: 0.1 + i * 0.12,
                }}
                className="block"
              >
                {i === 2 ? (
                  <span className="italic text-brand">{line}</span>
                ) : (
                  line
                )}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: easeOut, delay: 0.5 }}
            className="mt-7 max-w-xl text-pretty text-lg leading-relaxed text-ink-muted"
          >
            The practice of{" "}
            <span className="font-medium text-ink">Dr. Dheeraj Kamra, MD, FACP</span>{" "}
            — relationship-driven internal medicine that follows you from the
            clinic to the hospital and home.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: easeOut, delay: 0.62 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <a
              href={site.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Book Online <ArrowRight className="h-4 w-4" />
            </a>
            <a href="/services" className="btn-ghost">
              Explore our care
            </a>
          </motion.div>

          {/* trust bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-ink-muted"
          >
            <div className="flex items-center gap-2">
              <Stars rating={reviews.rating} />
              <span className="font-medium text-ink">{reviews.rating}</span>
              <span>· {reviews.count}+ Google reviews</span>
            </div>
            <span className="hidden h-4 w-px bg-ink/15 sm:block" />
            <div className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-brand" />
              Two Sacramento-area locations
            </div>
          </motion.div>
        </div>

        {/* Dr. Kamra photo */}
        <motion.div
          style={{ y: yPanel }}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: easeOut, delay: 0.3 }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <div className="overflow-hidden rounded-3xl">
            <img
              src="/team/dheeraj-kamra.jpg"
              alt="Dr. Dheeraj Kamra, MD, FACP"
              className="w-full object-cover object-top"
              style={{ maxHeight: "520px" }}
            />
          </div>

          {/* floating credential badge */}
          <motion.div
            style={{ y: yBadge }}
            className="card-surface absolute -bottom-6 -left-6 hidden max-w-[220px] p-5 sm:block"
          >
            <p className="font-serif text-3xl leading-none text-brand">FACP</p>
            <p className="mt-2 text-xs leading-snug text-ink-muted">
              Fellow of the American College of Physicians — a distinction held
              by Dr. Kamra.
            </p>
          </motion.div>

          {/* floating location chip */}
          <div className="card-surface absolute -right-4 -top-4 hidden items-center gap-2 px-4 py-2.5 md:flex">
            <MapPin className="h-4 w-4 text-brand" />
            <span className="text-xs font-medium">
              {locations.length} locations
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
