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
            <Logo light imageClassName="h-12 w-auto sm:h-14" />
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
            <Link
              href="/book-online"
              className="btn-primary mt-6"
            >
              Book Online
            </Link>
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

        {/* Notices — regulatory links that must stay reachable from every page,
            independent of the booking flow. Uses a native <details> so the
            disclosure needs no client-side JavaScript. */}
        <div className="mt-4 border-t border-paper/10 pt-4 text-xs text-paper/45">
          <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-3">
            <span className="uppercase tracking-kicker text-paper/35">
              Notices
            </span>
            <Link
              href="/forms/notice-of-privacy-practices"
              className="underline-offset-4 transition-colors hover:text-white hover:underline"
            >
              Notice of Privacy Practices
            </Link>
            <span aria-hidden="true" className="hidden text-paper/20 sm:inline">
              ·
            </span>
            <details className="group">
              <summary className="cursor-pointer list-none underline-offset-4 transition-colors marker:content-none hover:text-white hover:underline [&::-webkit-details-marker]:hidden">
                Sunshine Act Notice
                <span
                  aria-hidden="true"
                  className="ml-1 inline-block transition-transform group-open:rotate-90"
                >
                  ›
                </span>
              </summary>
              <div className="mt-3 max-w-3xl space-y-2 border-l border-paper/15 pl-4 leading-relaxed">
                <p className="font-medium text-paper/70">Sunshine Act Notice</p>
                <p>
                  For informational purposes only, a link to the federal Centers
                  for Medicare and Medicaid Services (CMS) Open Payments web page
                  is provided here. The federal Physician Payments Sunshine Act
                  requires that detailed information about payment and other
                  payments of value worth over ten dollars ($10) from
                  manufacturers of drugs, medical devices, and biologics to
                  physicians and teaching hospitals be made available to the
                  public.
                </p>
                <a
                  href="https://openpaymentsdata.cms.gov/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-brand-200 underline-offset-4 transition-colors hover:text-white hover:underline"
                >
                  CMS Open Payments
                </a>
              </div>
            </details>
          </div>
        </div>
      </div>
    </footer>
  );
}
