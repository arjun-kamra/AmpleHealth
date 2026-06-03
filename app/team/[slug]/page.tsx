import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CTABand from "@/components/CTABand";
import { Reveal } from "@/components/Motion";
import Placeholder from "@/components/Placeholder";
import { ArrowRight, Check } from "@/components/Icons";
import { providers, site } from "@/lib/data";

export function generateStaticParams() {
  return providers.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const provider = providers.find((p) => p.slug === params.slug);
  if (!provider) return { title: "Provider not found" };
  return {
    title: `${provider.name}, ${provider.credentials}`,
    description: provider.shortBio,
  };
}

export default function ProviderPage({ params }: { params: { slug: string } }) {
  const provider = providers.find((p) => p.slug === params.slug);
  if (!provider) notFound();

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-ink/10 bg-paper-deep">
        <div className="bg-grid absolute inset-0 opacity-60" />
        <div
          className="pointer-events-none absolute -right-24 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full opacity-15 blur-3xl"
          style={{ backgroundColor: provider.tone }}
        />

        <div className="container-page relative py-16 md:py-24">
          <Reveal>
            <Link href="/team" className="link-underline text-sm font-medium">
              <ArrowRight className="h-4 w-4 rotate-180" /> Our team
            </Link>
          </Reveal>

          <div className="mt-8 grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <Reveal delay={0.05}>
              <Placeholder
                tone={provider.tone}
                ratio="3 / 4"
                monogram={provider.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
                label={`${provider.name}, ${provider.credentials}`}
                className="max-w-sm"
              />
            </Reveal>

            <Reveal delay={0.1}>
              <p
                className="font-serif text-6xl font-semibold leading-none opacity-20"
                style={{ color: provider.tone }}
              >
                {provider.credentials}
              </p>
              <h1 className="mt-3 text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
                {provider.name}
              </h1>
              <p className="mt-2 text-lg font-medium text-brand">
                {provider.credentials}
              </p>
              <p className="text-ink-muted">{provider.title}</p>

              <p className="mt-6 text-pretty text-lg leading-relaxed text-ink-muted">
                {provider.shortBio}
              </p>

              <a
                href={site.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary mt-8"
              >
                Book with {provider.name.split(" ")[0]}{" "}
                <ArrowRight className="h-4 w-4" />
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* BIO */}
      <section className="container-page py-20 md:py-28">
        <div className="grid gap-14 lg:grid-cols-[1.3fr_0.7fr]">
          <Reveal>
            <p className="kicker">Biography</p>
            <div className="mt-6 space-y-5 text-pretty text-lg leading-relaxed text-ink-soft">
              {provider.fullBio.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="card-surface p-7">
              <p className="text-xs uppercase tracking-kicker text-ink-muted">
                Credentials &amp; highlights
              </p>
              <ul className="mt-5 space-y-4">
                {provider.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3">
                    <span
                      className="mt-0.5 grid h-5 w-5 flex-none place-items-center rounded-full text-white"
                      style={{ backgroundColor: provider.tone }}
                    >
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-sm text-ink-soft">{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* OTHER PROVIDERS */}
      <section className="border-t border-ink/10 bg-paper-deep">
        <div className="container-page py-12">
          <p className="text-xs uppercase tracking-kicker text-ink-muted">
            Also on our team
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {providers
              .filter((p) => p.slug !== provider.slug)
              .map((p) => (
                <Link
                  key={p.slug}
                  href={`/team/${p.slug}`}
                  className="card-surface inline-flex items-center gap-2 px-4 py-2.5 text-sm transition-colors hover:border-brand/40"
                >
                  <span
                    className="grid h-7 w-7 place-items-center rounded-lg font-serif text-xs font-semibold text-white"
                    style={{ backgroundColor: p.tone }}
                  >
                    {p.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                  <span>
                    <span className="font-medium">{p.name}</span>
                    <span className="ml-1 text-ink-muted">{p.credentials}</span>
                  </span>
                </Link>
              ))}
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
