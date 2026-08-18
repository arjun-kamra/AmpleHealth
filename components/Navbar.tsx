"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { navLinks, site } from "@/lib/data";
import { CreditCard } from "./Icons";
import Logo from "./Logo";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock scroll while the mobile menu is open.
  // Locks <html> as well as <body> — iOS Safari frequently ignores
  // overflow:hidden on <body> alone. Restores the exact prior inline values,
  // and the cleanup runs on every close path (X, nav link, route change,
  // breakpoint change, unmount).
  useEffect(() => {
    if (!open) return;
    const html = document.documentElement;
    const { body } = document;
    const prev = {
      htmlOverflow: html.style.overflow,
      bodyOverflow: body.style.overflow,
      overscroll: body.style.overscrollBehavior,
    };
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    body.style.overscrollBehavior = "none";
    return () => {
      html.style.overflow = prev.htmlOverflow;
      body.style.overflow = prev.bodyOverflow;
      body.style.overscrollBehavior = prev.overscroll;
    };
  }, [open]);

  // Close on route change so the lock can never outlive the menu — also
  // covers back/forward navigation, which never fires the links' onClick.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Close on Escape, and if the viewport grows past `lg` the menu and the
  // hamburger both become `lg:hidden` — without this the scroll lock would
  // stay on with no visible control to release it.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    // Mirrors Tailwind's `lg` breakpoint, so it fires exactly when the menu
    // and hamburger flip to `lg:hidden`.
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onBreakpoint = () => {
      if (desktop.matches) setOpen(false);
    };
    onBreakpoint(); // catch a viewport already past `lg` on mount
    window.addEventListener("keydown", onKey);
    // Both: `change` is the precise signal, `resize` is the belt-and-braces
    // fallback for environments that resize without emitting an MQL change.
    desktop.addEventListener("change", onBreakpoint);
    window.addEventListener("resize", onBreakpoint);
    return () => {
      window.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onBreakpoint);
      window.removeEventListener("resize", onBreakpoint);
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        open
          ? // The panel below starts at top-[72px], so this 72px band must be
            // opaque too — otherwise the page bleeds through behind the logo
            // and hamburger while the menu is open.
            "border-b border-ink/10 bg-paper"
          : scrolled
          ? "border-b border-ink/10 bg-paper/85 backdrop-blur-xl"
          : "border-b border-transparent bg-paper/0"
      }`}
    >
      <nav className="container-page flex h-[72px] items-center justify-between">
        <Logo priority />

        {/* Center links */}
        <ul className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => {
            const active =
              pathname === link.href || pathname.startsWith(link.href + "/");
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="group relative text-sm text-ink-soft transition-colors hover:text-ink"
                >
                  <span className={active ? "text-ink" : ""}>{link.label}</span>
                  <span
                    className={`absolute -bottom-1.5 left-0 h-px bg-brand transition-all duration-300 ${
                      active ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href={site.payBillUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center justify-center gap-2 rounded-full bg-payment px-5 py-3.5 text-sm font-medium tracking-wide text-white transition-all duration-300 hover:bg-payment-hover hover:shadow-[0_12px_30px_-12px_rgba(8,127,123,0.7)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-payment lg:inline-flex"
          >
            <CreditCard className="h-4 w-4" aria-hidden="true" />
            Pay My Bill
          </a>

          <a
            href={site.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary hidden sm:inline-flex"
          >
            Book Online
          </a>

          {/* Hamburger */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="grid h-10 w-10 place-items-center rounded-lg border border-ink/15 lg:hidden"
          >
            <div className="relative h-4 w-5">
              <span
                className={`absolute left-0 h-0.5 w-5 bg-ink transition-all duration-300 ${
                  open ? "top-1.5 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 top-1.5 h-0.5 w-5 bg-ink transition-all duration-300 ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 h-0.5 w-5 bg-ink transition-all duration-300 ${
                  open ? "top-1.5 -rotate-45" : "top-3"
                }`}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 top-[72px] z-40 bg-paper lg:hidden"
          >
            <div className="bg-grid absolute inset-0 opacity-60" />
            <div className="container-page relative flex h-full flex-col py-8">
              <ul className="flex flex-col">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.05 }}
                    className="border-b border-ink/10"
                  >
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="block py-4 font-serif text-2xl"
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <a
                href={site.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="btn-primary mt-8 w-full"
              >
                Book Online
              </a>
              <a
                href={site.payBillUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full bg-payment px-7 py-3.5 text-sm font-medium tracking-wide text-white transition-all duration-300 hover:bg-payment-hover"
              >
                <CreditCard className="h-4 w-4" aria-hidden="true" />
                Pay My Bill
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
