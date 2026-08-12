import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { Stagger, StaggerItem } from "@/components/Motion";
import Stars from "@/components/Stars";
import { ArrowRight } from "@/components/Icons";
import { testimonials } from "@/lib/data";

export const metadata: Metadata = {
  title: "Testimonials",
  description:
    "What patients say about AmpleHealth — real care, real relationships, across Carmichael and Sacramento.",
};

const GOOGLE_REVIEW_URL = "https://www.google.com/search?q=AmpleHealth+reviews";

function initials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function TestimonialsPage() {
  return (
    <>
      <PageHero
        kicker="Testimonials"
        title="What Our Patients"
        highlight="Say."
        description="The trust our patients place in us is the measure that matters most. Here's what they share in their own words."
      >
        <div className="flex items-center gap-3">
          <Stars rating={4.9} size={20} />
          <span className="text-ink-soft">
            <span className="font-medium">4.9</span> · 180+ reviews
          </span>
        </div>
      </PageHero>

      <section className="container-page py-20 md:py-28">
        <Stagger className="gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
          {testimonials.map((t) => (
            <StaggerItem key={`${t.name}-${t.date}`} className="break-inside-avoid">
              <figure className="card-surface flex flex-col p-7">
                <Stars rating={t.rating} />
                <blockquote className="mt-4 flex-1 text-pretty leading-relaxed text-ink-soft">
                  {t.text}
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-ink/10 pt-5">
                  <span className="grid h-10 w-10 flex-none place-items-center rounded-full bg-brand/10 text-sm font-semibold text-brand">
                    {initials(t.name)}
                  </span>
                  <span className="text-sm">
                    <span className="block font-medium text-ink">{t.name}</span>
                    <span className="text-ink-muted">{t.date}</span>
                  </span>
                </figcaption>
              </figure>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="relative overflow-hidden bg-brand text-white">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.25) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.25) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        <div className="container-page relative py-16 text-center md:py-20">
          <h2 className="text-3xl font-semibold leading-tight md:text-4xl">
            Loved your visit?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-pretty text-white/85">
            Your words help other patients find care they can trust. We&apos;d
            be grateful if you shared your experience on Google.
          </p>
          <a
            href={GOOGLE_REVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-medium text-brand transition-all duration-300 hover:bg-paper hover:shadow-lg"
          >
            Leave a Google review <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>
    </>
  );
}
