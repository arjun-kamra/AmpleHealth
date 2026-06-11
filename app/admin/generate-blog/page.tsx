"use client";

import { useState } from "react";
import Link from "next/link";

type Result =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; title: string; slug: string }
  | { status: "error"; message: string };

export default function GenerateBlogAdminPage() {
  const [result, setResult] = useState<Result>({ status: "idle" });

  async function generate() {
    setResult({ status: "loading" });
    try {
      const res = await fetch("/api/generate-blog", { method: "POST" });
      const data = await res.json();
      if (!res.ok) {
        setResult({
          status: "error",
          message: data.error ?? "Something went wrong.",
        });
        return;
      }
      setResult({
        status: "success",
        title: data.post.title,
        slug: data.post.slug,
      });
    } catch {
      setResult({ status: "error", message: "Network error. Please try again." });
    }
  }

  const loading = result.status === "loading";

  return (
    <section className="container-page flex min-h-[70vh] flex-col items-center justify-center py-20">
      <div className="card-surface w-full max-w-lg p-8 text-center md:p-10">
        <p className="kicker">Admin</p>
        <h1 className="mt-3 text-3xl font-semibold">Generate a blog post</h1>
        <p className="mt-3 text-ink-muted">
          Create a new AI-written article on a rotating internal-medicine topic.
          It publishes immediately to the blog.
        </p>

        <button
          onClick={generate}
          disabled={loading}
          className="btn-primary mt-8 w-full justify-center disabled:opacity-60"
        >
          {loading ? "Generating…" : "Generate New Blog Post"}
        </button>

        {result.status === "success" && (
          <div className="mt-6 rounded-xl border border-green-200 bg-green-50 p-5 text-left">
            <p className="font-medium text-green-800">Published!</p>
            <p className="mt-1 text-sm text-green-700">{result.title}</p>
            <Link
              href={`/blog/${result.slug}`}
              className="mt-3 inline-block text-sm font-medium text-brand hover:underline"
            >
              View post →
            </Link>
          </div>
        )}

        {result.status === "error" && (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-5 text-left">
            <p className="font-medium text-red-800">Couldn&apos;t generate post</p>
            <p className="mt-1 text-sm text-red-700">{result.message}</p>
          </div>
        )}

        <Link
          href="/blog"
          className="mt-6 inline-block text-sm text-ink-muted hover:text-ink"
        >
          ← Back to blog
        </Link>
      </div>
    </section>
  );
}
