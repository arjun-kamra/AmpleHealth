import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import CTABand from "@/components/CTABand";
import { Reveal, Stagger, StaggerItem } from "@/components/Motion";
import Placeholder from "@/components/Placeholder";
import { ArrowRight, Clock } from "@/components/Icons";
import { blogPosts } from "@/lib/data";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Health insights and practice news from the AmpleHealth care team in Carmichael and Sacramento.",
};

export default function BlogPage() {
  const [featured, ...rest] = blogPosts;

  return (
    <>
      <PageHero
        kicker="Journal"
        title="Notes on health, from your"
        highlight="physicians."
        description="Practical, evidence-informed writing on prevention, chronic care, and living well. All posts below are placeholders."
      />

      {/* FEATURED */}
      <section className="container-page py-20 md:py-24">
        <Reveal>
          <article className="card-surface group grid overflow-hidden lg:grid-cols-2">
            <div className="relative">
              <Placeholder
                tone={featured.tone}
                ratio="16 / 11"
                rounded="rounded-none"
                label={featured.category}
                className="h-full"
              />
            </div>
            <div className="flex flex-col justify-center p-8 md:p-12">
              <div className="flex items-center gap-3 text-xs uppercase tracking-kicker text-ink-muted">
                <span className="text-brand">{featured.category}</span>
                <span>·</span>
                <span>{featured.date}</span>
              </div>
              <h2 className="mt-4 text-3xl font-semibold leading-tight md:text-4xl">
                {featured.title}
              </h2>
              <p className="mt-4 text-pretty leading-relaxed text-ink-muted">
                {featured.excerpt}
              </p>
              <div className="mt-6 flex items-center gap-4">
                {/* TODO: link to individual post once built */}
                <span className="inline-flex items-center gap-1.5 font-medium text-brand">
                  Read article
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
                <span className="inline-flex items-center gap-1.5 text-sm text-ink-muted">
                  <Clock className="h-4 w-4" /> {featured.readTime}
                </span>
              </div>
            </div>
          </article>
        </Reveal>
      </section>

      {/* GRID */}
      <section className="container-page pb-20 md:pb-28">
        <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((post) => (
            <StaggerItem key={post.slug}>
              <article className="group flex h-full flex-col">
                <Placeholder
                  tone={post.tone}
                  ratio="16 / 10"
                  label={post.category}
                  className="transition-transform duration-300 group-hover:-translate-y-1"
                />
                <div className="mt-5 flex items-center gap-3 text-xs uppercase tracking-kicker text-ink-muted">
                  <span className="text-brand">{post.category}</span>
                  <span>·</span>
                  <span>{post.date}</span>
                </div>
                <h3 className="mt-3 text-xl font-semibold leading-snug">
                  {post.title}
                </h3>
                <p className="mt-2 flex-1 text-pretty text-sm leading-relaxed text-ink-muted">
                  {post.excerpt}
                </p>
                <div className="mt-4 flex items-center gap-4 text-sm">
                  <span className="inline-flex items-center gap-1.5 font-medium text-brand">
                    Read
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-ink-muted">
                    <Clock className="h-3.5 w-3.5" /> {post.readTime}
                  </span>
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <CTABand
        title="Care that goes beyond the article"
        description="Have a question the blog didn't answer? Book a visit and let's talk."
      />
    </>
  );
}
