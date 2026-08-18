"use client";

import { useState } from "react";
import Link from "next/link";
import JotformEmbed from "./JotformEmbed";
import { ArrowRight } from "./Icons";
import { providers, site } from "@/lib/data";

const NEW_PATIENT_FORMS = [
  {
    href: "/forms/patient-intake-form",
    title: "Patient Intake Form",
    description:
      "Tell us about your history, insurance, medications, and lifestyle.",
  },
  {
    href: "/forms/authorization-for-release",
    title: "Authorization for Release of Medical Information",
    description:
      "Authorize AmpleHealth to release or obtain your protected health information.",
  },
  {
    href: "/forms/notice-of-privacy-practices",
    title: "Notice of Privacy Practices",
    description:
      "Review how we protect your health information and acknowledge receipt.",
  },
  {
    href: "/forms/no-show-late-cancellation-policy",
    title: "No-Show & Late Cancellation Policy",
    description:
      "Review and acknowledge our policy on missed appointments and late cancellations.",
  },
  {
    href: "/forms/patient-partnership-plan",
    title: "Patient Partnership Plan",
    description:
      "Our shared commitments — what you can expect from us, and what we ask of you.",
  },
  {
    href: "/forms/telemedicine-consent-agreement",
    title: "Telemedicine Consent Agreement",
    description:
      "Consent to receiving care through our secure telemedicine platform.",
  },
];

// The providers currently active on the practice's Zocdoc account. Names and
// titles come from lib/data.ts so this list can never drift from the team
// pages; only the three with known Zocdoc profiles get a direct booking link.
const ZOCDOC_PROVIDERS = [
  {
    slug: "dheeraj-kamra",
    zocdoc: "https://www.zocdoc.com/doctor/dheeraj-kamra-md-598502",
  },
  {
    slug: "mythli-nagaraj",
    zocdoc: "https://www.zocdoc.com/doctor/mythili-nagaraj-md-599123",
  },
  {
    slug: "alice-phillips",
    zocdoc: "https://www.zocdoc.com/doctor/alice-phillips-np-599124",
  },
  { slug: "sidrah-khan" },
  { slug: "yelena-popova" },
];

const PROVIDER_BOOKING = ZOCDOC_PROVIDERS.flatMap(({ slug, zocdoc }) => {
  const p = providers.find((x) => x.slug === slug);
  return p
    ? [{ name: p.credentials ? `${p.name}, ${p.credentials}` : p.name, title: p.title, zocdoc }]
    : [];
});

type Tab = "new" | "existing";

export default function BookOnlineTabs() {
  const [tab, setTab] = useState<Tab>("new");

  const tabClass = (active: boolean) =>
    `flex-1 rounded-2xl border px-6 py-5 text-center transition-all duration-300 ${
      active
        ? "border-brand bg-brand text-white shadow-[0_12px_30px_-12px_rgba(27,117,187,0.7)]"
        : "border-ink/15 bg-paper-card text-ink hover:border-brand/50 hover:text-brand"
    }`;

  return (
    <section className="container-page pb-20 md:pb-28">
      {/* TABS */}
      <div
        role="tablist"
        aria-label="Patient type"
        className="mx-auto flex max-w-2xl gap-4"
      >
        <button
          type="button"
          role="tab"
          id="tab-new"
          aria-selected={tab === "new"}
          aria-controls="panel-new"
          onClick={() => setTab("new")}
          className={tabClass(tab === "new")}
        >
          <span className="block text-lg font-semibold md:text-xl">
            New Patient
          </span>
          <span
            className={`mt-1 block text-sm ${
              tab === "new" ? "text-white/80" : "text-ink-muted"
            }`}
          >
            First visit with us
          </span>
        </button>
        <button
          type="button"
          role="tab"
          id="tab-existing"
          aria-selected={tab === "existing"}
          aria-controls="panel-existing"
          onClick={() => setTab("existing")}
          className={tabClass(tab === "existing")}
        >
          <span className="block text-lg font-semibold md:text-xl">
            Existing Patient
          </span>
          <span
            className={`mt-1 block text-sm ${
              tab === "existing" ? "text-white/80" : "text-ink-muted"
            }`}
          >
            Already part of the practice
          </span>
        </button>
      </div>

      {/* NEW PATIENT */}
      {tab === "new" && (
        <div
          role="tabpanel"
          id="panel-new"
          aria-labelledby="tab-new"
          className="mt-12"
        >
          <p className="mx-auto max-w-2xl text-center text-pretty text-lg leading-relaxed text-ink-muted">
            Welcome! Before your first visit, please complete these forms so we
            can spend your appointment on your care rather than paperwork.
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {NEW_PATIENT_FORMS.map((form, i) => (
              <Link
                key={form.href}
                href={form.href}
                className="card-surface group flex h-full items-start gap-4 p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-[0_18px_40px_-22px_rgba(11,31,51,0.3)]"
              >
                <span className="grid h-11 w-11 flex-none place-items-center rounded-xl bg-brand/10 font-serif text-base font-semibold text-brand">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>
                  <span className="block text-lg font-semibold leading-snug">
                    {form.title}
                  </span>
                  <span className="mt-1 block text-sm text-ink-muted">
                    {form.description}
                  </span>
                  <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-brand">
                    Fill out form
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </span>
                </span>
              </Link>
            ))}
          </div>

          <div className="card-surface mt-12 p-8 text-center md:p-10">
            <h2 className="text-2xl font-semibold md:text-3xl">
              Ready to book your appointment?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-pretty text-ink-muted">
              Choose a time that works for you — new patients are always
              welcome.
            </p>
            <a
              href={site.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-6"
            >
              Book on Zocdoc <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      )}

      {/* EXISTING PATIENT */}
      {tab === "existing" && (
        <div
          role="tabpanel"
          id="panel-existing"
          aria-labelledby="tab-existing"
          className="mt-12"
        >
          <p className="mx-auto max-w-2xl text-center text-pretty text-lg leading-relaxed text-ink-muted">
            Welcome back. Tell us what you need below and our team will follow
            up, or book directly with your provider.
          </p>

          <div className="mx-auto mt-10 max-w-3xl overflow-hidden rounded-2xl">
            <JotformEmbed
              formId="262297914660061"
              title="Existing Patient - Book an Appointment"
            />
          </div>

          <div className="card-surface mt-12 p-8 text-center md:p-10">
            <h2 className="text-2xl font-semibold md:text-3xl">
              Ready to book your appointment?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-pretty text-ink-muted">
              Book directly with the provider you usually see.
            </p>
            <ul className="mx-auto mt-8 max-w-2xl divide-y divide-ink/10 text-left">
              {PROVIDER_BOOKING.map((p) => (
                <li
                  key={p.name}
                  className="flex flex-col gap-2 py-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <span>
                    <span className="block font-semibold">{p.name}</span>
                    <span className="block text-sm text-ink-muted">
                      {p.title}
                    </span>
                  </span>
                  {p.zocdoc && (
                    <a
                      href={p.zocdoc}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-ghost flex-none px-5 py-2.5"
                    >
                      Book Now
                    </a>
                  )}
                </li>
              ))}
            </ul>
            <p className="mx-auto mt-6 max-w-xl text-pretty text-sm text-ink-muted">
              For all other providers, book with any available provider below.
            </p>
            <a
              href={site.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline mt-4 inline-flex text-sm font-medium"
            >
              Not sure? Book with any provider{" "}
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      )}
    </section>
  );
}
