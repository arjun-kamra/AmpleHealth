import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CTABand from "@/components/CTABand";
import { Reveal } from "@/components/Motion";
import Placeholder from "@/components/Placeholder";
import { ArrowRight, Check } from "@/components/Icons";
import { services, site } from "@/lib/data";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const service = services.find((s) => s.slug === params.slug);
  if (!service) return { title: "Service not found" };
  return {
    title: service.title,
    description: service.summary,
  };
}

export default function ServiceDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const service = services.find((s) => s.slug === params.slug);
  if (!service) notFound();

  const index = services.findIndex((s) => s.slug === service.slug);
  const next = services[(index + 1) % services.length];

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-ink/10 bg-paper-deep">
        <div className="bg-grid absolute inset-0 opacity-60" />
        <div
          className="pointer-events-none absolute -right-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full opacity-20 blur-3xl"
          style={{ backgroundColor: service.tone }}
        />
        <div className="container-page relative py-16 md:py-24">
          <Reveal>
            <Link
              href="/services"
              className="link-underline text-sm font-medium"
            >
              <ArrowRight className="h-4 w-4 rotate-180" /> All services
            </Link>
          </Reveal>
          <div className="mt-6 grid items-end gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <Reveal delay={0.05}>
              <p
                className="font-serif text-6xl font-semibold leading-none"
                style={{ color: service.tone }}
              >
                {String(index + 1).padStart(2, "0")}
              </p>
              <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
                {service.title}
              </h1>
              <p className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-ink-muted">
                {service.summary}
              </p>
            </Reveal>
            <Reveal delay={0.12}>
              <Placeholder
                tone={service.tone}
                ratio="4 / 3"
                label={service.title}
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* BODY */}
      <section className="container-page py-20 md:py-28">
        <div className="grid gap-14 lg:grid-cols-[1.3fr_0.7fr]">
          <Reveal>
            <p className="kicker">Overview</p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight md:text-4xl">
              What to expect
            </h2>
            <div className="mt-5 space-y-4 text-pretty text-lg leading-relaxed text-ink-muted">
              <p>{service.description}</p>
              <p>
                This is placeholder content for the {service.title.toLowerCase()}{" "}
                service page. Replace it with detailed information about your
                approach, conditions treated, what a visit involves, and
                frequently asked questions.
              </p>
            </div>

            <div className="mt-8">
              <a
                href={site.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Book this service <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="card-surface p-7">
              <p className="text-xs uppercase tracking-kicker text-ink-muted">
                What&apos;s included
              </p>
              <ul className="mt-5 space-y-4">
                {service.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3">
                    <span
                      className="mt-0.5 grid h-5 w-5 flex-none place-items-center rounded-full text-white"
                      style={{ backgroundColor: service.tone }}
                    >
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-ink-soft">{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* NEXT SERVICE */}
      <section className="border-t border-ink/10 bg-paper-deep">
        <div className="container-page py-12">
          <Link
            href={`/services/${next.slug}`}
            className="group flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center"
          >
            <div>
              <p className="text-xs uppercase tracking-kicker text-ink-muted">
                Next service
              </p>
              <p className="mt-1 font-serif text-2xl">{next.title}</p>
            </div>
            <span className="inline-flex items-center gap-2 font-medium text-brand">
              Continue
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5" />
            </span>
          </Link>
        </div>
      </section>

      <CTABand />
    </>
  );
}
