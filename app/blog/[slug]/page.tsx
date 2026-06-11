import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import CTABand from "@/components/CTABand";
import { Reveal } from "@/components/Motion";
import BlogImage from "@/components/BlogImage";
import { ArrowRight, Clock } from "@/components/Icons";
import { supabase, type BlogRow } from "@/lib/supabase";
import { mapRow } from "@/lib/blog";
import { site } from "@/lib/data";

export const dynamic = "force-dynamic";
export const revalidate = 0;

async function getPost(slug: string) {
  const { data } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .single();
  return data ? mapRow(data as BlogRow) : null;
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getPost(params.slug);
  if (!post) return { title: "Post not found" };
  return { title: post.title, description: post.excerpt };
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPost(params.slug);
  if (!post) notFound();

  const { data: relatedData } = await supabase
    .from("blog_posts")
    .select("*")
    .neq("slug", params.slug)
    .order("published_at", { ascending: false })
    .limit(3);

  const related = ((relatedData as BlogRow[]) ?? []).map(mapRow);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-ink/10 bg-paper-deep">
        <div className="bg-grid absolute inset-0 opacity-60" />
        <div
          className="pointer-events-none absolute -right-24 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full opacity-15 blur-3xl"
          style={{ backgroundColor: post.tone }}
        />
        <div className="container-page relative py-16 md:py-20">
          <Reveal>
            <a href="/blog" className="link-underline text-sm font-medium">
              <ArrowRight className="h-4 w-4 rotate-180" /> All articles
            </a>
          </Reveal>
          <div className="mt-6 max-w-3xl">
            <Reveal delay={0.05}>
              <div className="flex items-center gap-3 text-xs uppercase tracking-kicker text-ink-muted">
                <span style={{ color: post.tone }}>{post.category}</span>
                <span>·</span>
                <time dateTime={post.isoDate}>{post.date}</time>
                <span>·</span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" /> {post.readTime}
                </span>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-tight md:text-5xl lg:text-6xl">
                {post.title}
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-5 text-pretty text-xl leading-relaxed text-ink-muted">
                {post.excerpt}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FULL-WIDTH HERO IMAGE */}
      <div className="container-page -mt-2 pb-0 pt-10">
        <BlogImage
          src={post.imageUrl}
          alt={post.title}
          tone={post.tone}
          ratio="16 / 7"
          rounded="rounded-2xl"
        />
      </div>

      {/* ARTICLE BODY */}
      <article className="container-page py-16 md:py-20">
        <div className="mx-auto max-w-2xl">
          <Reveal>
            <div className="blog-prose space-y-6 text-pretty text-lg leading-relaxed text-ink-soft">
              <ReactMarkdown
                components={{
                  h1: ({ children }) => (
                    <h2 className="mt-10 text-3xl font-semibold text-ink">
                      {children}
                    </h2>
                  ),
                  h2: ({ children }) => (
                    <h2 className="mt-10 text-2xl font-semibold text-ink">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="mt-8 text-xl font-semibold text-ink">
                      {children}
                    </h3>
                  ),
                  p: ({ children }) => <p>{children}</p>,
                  ul: ({ children }) => (
                    <ul className="list-disc space-y-2 pl-6">{children}</ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal space-y-2 pl-6">{children}</ol>
                  ),
                  li: ({ children }) => <li>{children}</li>,
                  strong: ({ children }) => (
                    <strong className="font-semibold text-ink">{children}</strong>
                  ),
                  a: ({ href, children }) => (
                    <a
                      href={href}
                      className="text-brand underline underline-offset-2"
                    >
                      {children}
                    </a>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-brand/30 pl-5 italic text-ink-muted">
                      {children}
                    </blockquote>
                  ),
                }}
              >
                {post.content}
              </ReactMarkdown>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-12 border-t border-ink/10 pt-10">
              <p className="text-sm text-ink-muted">
                This article is provided for educational purposes only and does
                not constitute medical advice. Please consult your AmpleHealth
                provider for guidance specific to your health situation.
              </p>
              <a
                href={site.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary mt-6"
              >
                Book an appointment <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </Reveal>
        </div>
      </article>

      {/* RELATED POSTS */}
      {related.length > 0 && (
        <section className="border-t border-ink/10 bg-paper-deep">
          <div className="container-page py-16 md:py-20">
            <Reveal>
              <p className="kicker">More reading</p>
              <h2 className="mt-3 text-3xl font-semibold">Related articles</h2>
            </Reveal>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <Reveal key={p.slug}>
                  <Link href={`/blog/${p.slug}`} className="group flex flex-col">
                    <BlogImage
                      src={p.imageUrl}
                      alt={p.title}
                      tone={p.tone}
                      ratio="16 / 10"
                      className="transition-transform duration-300 group-hover:-translate-y-1"
                    />
                    <div className="mt-4 flex items-center gap-3 text-xs uppercase tracking-kicker text-ink-muted">
                      <span style={{ color: p.tone }}>{p.category}</span>
                      <span>·</span>
                      <time dateTime={p.isoDate}>{p.date}</time>
                    </div>
                    <h3 className="mt-2 text-lg font-semibold leading-snug">
                      {p.title}
                    </h3>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-brand">
                      Read
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTABand
        title="Have questions about your health?"
        description="Our team is here. Book a visit and let's talk through what's on your mind."
      />
    </>
  );
}
