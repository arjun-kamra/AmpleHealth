"use client";

import { useState } from "react";
import { ArrowRight, Check } from "@/components/Icons";

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  // Placeholder submit — wire up to a real handler / API route later.
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  if (sent) {
    return (
      <div className="card-surface flex flex-col items-center justify-center p-12 text-center">
        <span className="grid h-14 w-14 place-items-center rounded-full bg-brand/10 text-brand">
          <Check className="h-7 w-7" />
        </span>
        <h3 className="mt-5 font-serif text-2xl">Thank you</h3>
        <p className="mt-2 max-w-sm text-pretty text-ink-muted">
          This is a placeholder confirmation. Connect this form to your inbox or
          CRM to start receiving messages.
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="btn-ghost mt-6"
        >
          Send another
        </button>
      </div>
    );
  }

  const field =
    "w-full rounded-xl border border-ink/15 bg-paper-card px-4 py-3 text-ink placeholder:text-ink-muted/70 transition-colors focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20";

  return (
    <form onSubmit={handleSubmit} className="card-surface p-7 md:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
            Full name
          </label>
          <input id="name" name="name" required className={field} placeholder="Jane Doe" />
        </div>
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-medium">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            className={field}
            placeholder="(916) 000-0000"
          />
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className={field}
          placeholder="you@email.com"
        />
      </div>

      <div className="mt-4">
        <label htmlFor="location" className="mb-1.5 block text-sm font-medium">
          Preferred location
        </label>
        <select id="location" name="location" className={field} defaultValue="">
          <option value="" disabled>
            Select a location
          </option>
          <option value="carmichael">Carmichael — Coyle Ave</option>
          <option value="sacramento">Sacramento — Arena Blvd</option>
          <option value="either">Either / No preference</option>
        </select>
      </div>

      <div className="mt-4">
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium">
          How can we help?
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          className={`${field} resize-none`}
          placeholder="Tell us a little about what you need…"
        />
      </div>

      <button type="submit" className="btn-primary mt-6 w-full sm:w-auto">
        Send message <ArrowRight className="h-4 w-4" />
      </button>
      <p className="mt-3 text-xs text-ink-muted">
        Please do not include sensitive medical details. This form is a
        placeholder and not yet monitored.
      </p>
    </form>
  );
}
