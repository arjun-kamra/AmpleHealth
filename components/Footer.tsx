import Link from "next/link";
import { locations, navLinks, site } from "@/lib/data";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-paper">
      <div className="bg-grid absolute inset-0 opacity-[0.08]" />
      <div className="bg-hatch absolute -right-20 -top-20 h-64 w-64 rotate-12 opacity-50" />

      <div className="container-page relative py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr]">
          {/* Brand + locations */}
          <div>
            <Logo className="[&_span:last-child]:text-paper" />
            <p className="mt-5 max-w-sm text-pretty text-sm leading-relaxed text-paper/70">
              Internal medicine and primary care for Carmichael, Sacramento, and
              the communities we&apos;re proud to call home.
            </p>

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {locations.map((loc) => (
                <div key={loc.city}>
                  <p className="font-serif text-lg text-paper">{loc.label}</p>
                  <p className="mt-1 text-sm text-paper/70">{loc.address1}</p>
                  <p className="text-sm text-paper/70">{loc.address2}</p>
                  <a
                    href={loc.phoneHref}
                    className="mt-1 inline-block text-sm text-brand-200 hover:text-white"
                  >
                    {loc.phone}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Nav links */}
          <div>
            <p className="text-xs uppercase tracking-kicker text-paper/50">
              Explore
            </p>
            <ul className="mt-5 space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-paper/75 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + CTA */}
          <div>
            <p className="text-xs uppercase tracking-kicker text-paper/50">
              Get in touch
            </p>
            <a
              href={`mailto:${site.email}`}
              className="mt-5 block text-sm text-paper/75 transition-colors hover:text-white"
            >
              {site.email}
            </a>
            <a
              href={site.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-6"
            >
              Book Online
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-paper/10 pt-6 text-xs text-paper/55 sm:flex-row sm:items-center">
          <p>
            © {site.copyrightYear} {site.name}. All rights reserved.
          </p>
          <p>
            Carmichael &amp; Sacramento, California · Dheeraj Kamra, MD, FACP
          </p>
        </div>
      </div>
    </footer>
  );
}
