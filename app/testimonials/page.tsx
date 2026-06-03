import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import CTABand from "@/components/CTABand";
import { Stagger, StaggerItem } from "@/components/Motion";
import Stars from "@/components/Stars";
import { reviews, testimonials } from "@/lib/data";

export const metadata: Metadata = {
  title: "Testimonials",
  description:
    "What patients say about AmpleHealth — real care, real relationships, across Carmichael and Sacramento.",
};

export default function TestimonialsPage() {
  return (
    <>
      <PageHero
        kicker="Testimonials"
        title="In our patients'"
        highlight="words."
        description="The trust our patients place in us is the measure that matters most. Here's a sample of what they share (placeholder reviews)."
      >
        <div className="flex items-center gap-3">
          <Stars rating={reviews.rating} size={20} />
          <span className="text-ink-soft">
            <span className="font-medium">{reviews.rating}</span> · {reviews.count}+
            reviews
          </span>
        </div>
      </PageHero>

      <section className="container-page py-20 md:py-28">
        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <StaggerItem key={t.name}>
              <figure className="card-surface flex h-full flex-col p-7">
                <span className="font-serif text-5xl leading-none text-brand/25">
                  &ldquo;
                </span>
                <blockquote className="-mt-3 flex-1 text-pretty leading-relaxed text-ink-soft">
                  {t.quote}
                </blockquote>
                <div className="mt-6 border-t border-ink/10 pt-5">
                  <Stars rating={t.rating} />
                  <figcaption className="mt-2 text-sm">
                    <span className="font-medium">{t.name}</span>
                    <span className="text-ink-muted"> · {t.detail}</span>
                  </figcaption>
                </div>
              </figure>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <CTABand
        title="Become a patient"
        description="Experience the care our patients write home about. Book online today."
      />
    </>
  );
}
