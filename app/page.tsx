import Link from "next/link";
import Hero from "@/components/home/Hero";
import CTABand from "@/components/CTABand";
import { Reveal, Stagger, StaggerItem } from "@/components/Motion";
import Placeholder from "@/components/Placeholder";
import ProviderPhoto from "@/components/ProviderPhoto";
import Stars from "@/components/Stars";
import { ArrowRight, Check } from "@/components/Icons";
import {
  insurers,
  providers,
  reviews,
  services,
  testimonials,
} from "@/lib/data";

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* SERVICES GRID */}
      <section className="container-page py-20 md:py-28">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <Reveal className="max-w-2xl">
            <p className="kicker">What we do</p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
              Full-spectrum care, under one roof
            </h2>
            <p className="mt-4 text-pretty text-lg text-ink-muted">
              From everyday primary care to hospital and post-acute coordination
              — a continuous thread of attention through every chapter of your
              health.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <Link href="/services" className="link-underline text-sm font-medium">
              View all services <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>

        <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
                <h3 className="mt-5 text-2xl font-semibold">{s.title}</h3>
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

      {/* ABOUT SNIPPET */}
      <section className="relative overflow-hidden border-y border-ink/10 bg-paper-deep">
        <div className="bg-grid absolute inset-0 opacity-50" />
        <div className="container-page relative grid items-center gap-14 py-20 md:py-28 lg:grid-cols-2">
          <Reveal>
            <div className="relative">
              <div className="max-w-md overflow-hidden rounded-2xl">
                <img
                  src="/team/dheeraj-kamra.jpg"
                  alt="Dr. Dheeraj Kamra, MD, FACP"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="card-surface absolute -bottom-6 right-2 hidden max-w-[230px] p-5 sm:block lg:-right-8">
                <p className="font-serif text-2xl text-brand">FACP</p>
                <p className="mt-1.5 text-xs leading-snug text-ink-muted">
                  Fellow of the American College of Physicians — recognizing
                  excellence and commitment in internal medicine.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="kicker">About AmpleHealth</p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
              Medicine that remembers you&apos;re a{" "}
              <span className="italic text-brand">person</span>
            </h2>
            <p className="mt-5 text-pretty text-lg leading-relaxed text-ink-muted">
              AmpleHealth was founded by Dr. Dheeraj Kamra, MD, FACP, on a simple
              conviction: great internal medicine is built on relationships, not
              transactions. We take the time to know your story so we can make the
              right call — every time.
            </p>
            <ul className="mt-7 space-y-3">
              {[
                "Board-certified internal medicine",
                "Continuity across clinic, hospital & home",
                "Same standard of care, in person or by telehealth",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-5 w-5 flex-none place-items-center rounded-full bg-brand/10 text-brand">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-ink-soft">{item}</span>
                </li>
              ))}
            </ul>
            <Link href="/about" className="btn-ghost mt-8">
              Read our story
            </Link>
          </Reveal>
        </div>
      </section>

      {/* REVIEWS TRUST BAR */}
      <section className="container-page py-20 md:py-28">
        <Reveal className="mx-auto max-w-2xl text-center">
          <div className="flex flex-col items-center gap-2">
            <Stars rating={reviews.rating} size={22} />
            <p className="font-serif text-3xl">
              {reviews.rating} out of 5 · {reviews.count}+ reviews
            </p>
            <p className="text-sm text-ink-muted">
              Patients across Carmichael and Sacramento (placeholder rating).
            </p>
          </div>
        </Reveal>

        <Stagger className="mt-12 grid gap-5 md:grid-cols-3">
          {testimonials.slice(0, 3).map((t) => (
            <StaggerItem key={t.name}>
              <figure className="card-surface flex h-full flex-col p-7">
                <Stars rating={t.rating} />
                <blockquote className="mt-4 flex-1 text-pretty leading-relaxed text-ink-soft">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-5 text-sm">
                  <span className="font-medium">{t.name}</span>
                  <span className="text-ink-muted"> · {t.detail}</span>
                </figcaption>
              </figure>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.1} className="mt-8 text-center">
          <Link href="/testimonials" className="link-underline text-sm font-medium">
            Read more testimonials <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </section>

      {/* INSURANCE */}
      <section className="relative overflow-hidden border-y border-ink/10 bg-ink text-paper">
        <div className="bg-grid absolute inset-0 opacity-[0.08]" />
        <div className="container-page relative py-16 md:py-20">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-center">
            <Reveal>
              <p className="kicker text-brand-200">Coverage</p>
              <h2 className="mt-4 text-3xl font-semibold leading-tight md:text-4xl">
                Insurance &amp; plans accepted
              </h2>
              <p className="mt-4 text-pretty text-paper/70">
                We work with most major insurers. The list below is a placeholder
                — please call to confirm your specific plan and coverage.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {insurers.map((name) => (
                  <li
                    key={name}
                    className="rounded-xl border border-paper/15 bg-paper/[0.04] px-4 py-3.5 text-center text-sm text-paper/85 transition-colors hover:border-brand-300 hover:text-white"
                  >
                    {name}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* TEAM PREVIEW */}
      <section className="container-page py-20 md:py-28">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <Reveal className="max-w-2xl">
            <p className="kicker">Our team</p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
              The people in your corner
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Link href="/team" className="link-underline text-sm font-medium">
              Meet the full team <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>

        <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {providers.slice(0, 4).map((p) => (
            <StaggerItem key={p.name}>
              <Link href={`/team/${p.slug}`} className="group block">
                <ProviderPhoto
                  slug={p.slug}
                  name={p.name}
                  tone={p.tone}
                  ratio="3 / 4"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="transition-transform duration-300 group-hover:-translate-y-1"
                />
                <h3 className="mt-4 text-xl font-semibold">{p.name}</h3>
                <p className="text-sm font-medium text-brand">
                  {p.credentials}
                </p>
                <p className="text-sm text-ink-muted">{p.title}</p>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <CTABand />
    </>
  );
}
