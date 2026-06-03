import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import CTABand from "@/components/CTABand";
import { Stagger, StaggerItem } from "@/components/Motion";
import { ArrowRight } from "@/components/Icons";
import { services } from "@/lib/data";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Family medicine, women's health, geriatrics, telehealth, hospital care, post-acute care, and Botox & fillers — the full range of AmpleHealth services.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        kicker="Services"
        title="Care for every chapter of your"
        highlight="health."
        description="Seven focused service lines, one continuous relationship. Explore what we offer and how we can help."
      />

      <section className="container-page py-20 md:py-28">
        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <StaggerItem key={s.slug}>
              <Link
                href={`/services/${s.slug}`}
                className="card-surface group relative flex h-full flex-col overflow-hidden p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-24px_rgba(11,31,51,0.35)]"
              >
                <span
                  className="absolute left-0 top-0 h-1 w-full origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
                  style={{ backgroundColor: s.tone }}
                />
                <span
                  className="grid h-11 w-11 place-items-center rounded-xl font-serif text-lg font-semibold text-white"
                  style={{ backgroundColor: s.tone }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="mt-5 text-2xl font-semibold">{s.title}</h2>
                <p className="mt-2 flex-1 text-pretty text-sm leading-relaxed text-ink-muted">
                  {s.summary}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-brand">
                  Learn more
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <CTABand />
    </>
  );
}
