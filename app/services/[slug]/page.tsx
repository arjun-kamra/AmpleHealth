import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import CTABand from "@/components/CTABand";
import { Reveal } from "@/components/Motion";
import { ArrowRight, Check } from "@/components/Icons";
import { services } from "@/lib/data";

export function generateStaticParams() {
  // metabolic-syndrome has its own dedicated page at /services/metabolic-syndrome/
  return services
    .filter((s) => s.slug !== "metabolic-syndrome")
    .map((s) => ({ slug: s.slug }));
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
              {/* STOCK PLACEHOLDER — replace with real practice photo */}
              <div
                className="relative overflow-hidden rounded-2xl"
                style={{ aspectRatio: "4 / 3" }}
              >
                <Image
                  src={service.stockImage}
                  alt={service.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
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
              {service.body?.map((para) => (
                <p key={para.slice(0, 40)}>{para}</p>
              ))}
            </div>

            <div className="mt-8">
              <Link
                href="/book-online"
                className="btn-primary"
              >
                Book this service <ArrowRight className="h-4 w-4" />
              </Link>
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

      {/* DETAIL SECTIONS */}
      {service.sections?.length ? (
        <section className="border-t border-ink/10 bg-paper-deep">
          <div className="container-page py-20 md:py-28">
            <div className="space-y-16">
              {service.sections.map((section) => (
                <Reveal key={section.heading}>
                  <h2 className="text-3xl font-semibold leading-tight md:text-4xl">
                    {section.heading}
                  </h2>

                  {section.body?.length ? (
                    <div className="mt-5 max-w-3xl space-y-4 text-pretty text-lg leading-relaxed text-ink-muted">
                      {section.body.map((para) => (
                        <p key={para.slice(0, 40)}>{para}</p>
                      ))}
                    </div>
                  ) : null}

                  {section.bullets?.length ? (
                    <ul className="mt-6 grid max-w-3xl gap-3 sm:grid-cols-2">
                      {section.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-3">
                          <span
                            className="mt-1 grid h-5 w-5 flex-none place-items-center rounded-full text-white"
                            style={{ backgroundColor: service.tone }}
                          >
                            <Check className="h-3.5 w-3.5" />
                          </span>
                          <span className="text-ink-soft">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  {section.items?.length ? (
                    <div className="mt-8 grid gap-5 sm:grid-cols-2">
                      {section.items.map((item) => (
                        <div
                          key={item.title}
                          className="card-surface flex h-full flex-col p-7"
                        >
                          <h3 className="text-xl font-semibold leading-snug">
                            {item.title}
                          </h3>
                          <p className="mt-3 flex-1 text-pretty leading-relaxed text-ink-muted">
                            {item.body}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : null}

                  {section.footnote?.length ? (
                    <div className="mt-6 max-w-3xl space-y-4 text-pretty text-lg leading-relaxed text-ink-muted">
                      {section.footnote.map((para) => (
                        <p key={para.slice(0, 40)}>{para}</p>
                      ))}
                    </div>
                  ) : null}
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

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
