"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Download } from "./Icons";

type FormCard = {
  href: string;
  title: string;
  description: string;
  /** Set for documents downloaded rather than filled out in the browser. */
  download?: boolean;
};

type TabKey = "intake" | "records" | "medication" | "directives";

const TABS: {
  key: TabKey;
  label: string;
  blurb: string;
  intro: string;
  forms: FormCard[];
}[] = [
  {
    key: "intake",
    label: "Intake & Consent",
    blurb: "Start here before your first visit",
    intro:
      "Welcome! Completing these ahead of time means we can spend your appointment on your care rather than paperwork.",
    forms: [
      {
        href: "/forms/patient-intake-form",
        title: "Patient Intake Form",
        description:
          "Tell us about your history, insurance, medications, and lifestyle before your first visit.",
      },
      {
        href: "/forms/telemedicine-consent-agreement",
        title: "Telemedicine Consent Agreement",
        description:
          "Consent to receiving care from AmpleHealth through our secure telemedicine platform.",
      },
      {
        href: "/forms/patient-partnership-plan",
        title: "Patient Partnership Plan",
        description:
          "Our shared commitments — what you can expect from us, and what we ask of you.",
      },
      {
        href: "/forms/no-show-late-cancellation-policy",
        title: "No-Show & Late Cancellation Policy",
        description:
          "Review and acknowledge our policy on missed appointments and late cancellations.",
      },
      {
        href: "/forms/notice-of-privacy-practices",
        title: "Notice of Privacy Practices",
        description:
          "Review how we protect your health information and acknowledge receipt.",
      },
    ],
  },
  {
    key: "records",
    label: "Records & Authorizations",
    blurb: "Share or request your records",
    intro:
      "Use these to move your health information — to another provider, to a family member, or back to you.",
    forms: [
      {
        href: "/forms/authorization-for-release",
        title: "Authorization for Release",
        description:
          "Authorize AmpleHealth to release or obtain your protected health information.",
      },
      {
        href: "/forms/medical-records-request",
        title: "Medical Records Fee Policy & Request Form",
        description:
          "Review our records fee policy and request copies of your medical records.",
      },
    ],
  },
  {
    key: "medication",
    label: "Medication Agreements",
    blurb: "For controlled medications",
    intro:
      "If your care involves a controlled medication, we'll ask you to review and sign the matching agreement.",
    forms: [
      {
        href: "/forms/adhd-stimulant-medication-agreement",
        title: "ADHD Stimulant Medication Agreement",
        description:
          "Our shared responsibilities for safe, appropriate stimulant medication treatment.",
      },
      {
        href: "/forms/chronic-pain-controlled-substance-agreement",
        title: "Chronic Pain & Controlled Substance Treatment Agreement",
        description:
          "Our shared responsibilities for safe, effective treatment involving controlled medications.",
      },
    ],
  },
  {
    key: "directives",
    label: "Advance Directives",
    blurb: "Plan ahead for your care",
    intro:
      "Put your wishes in writing while you're well, so the people who care for you know exactly what you want.",
    forms: [
      {
        href: "/documents/advance-health-care-directive.pdf",
        title: "Advance Health Care Directive",
        description:
          "Appoint a health care agent and record your care preferences. Download, complete, and sign in front of two witnesses or a notary, per California law, then bring or send it to our office.",
        download: true,
      },
    ],
  },
];

export default function FormsTabs() {
  const [tab, setTab] = useState<TabKey>("intake");

  const tabClass = (active: boolean) =>
    `flex-1 rounded-2xl border px-6 py-5 text-center transition-all duration-300 ${
      active
        ? "border-brand bg-brand text-white shadow-[0_12px_30px_-12px_rgba(27,117,187,0.7)]"
        : "border-ink/15 bg-paper-card text-ink hover:border-brand/50 hover:text-brand"
    }`;

  const active = TABS.find((t) => t.key === tab)!;

  return (
    <section className="container-page py-20 md:py-28">
      {/* TABS */}
      <div
        role="tablist"
        aria-label="Form category"
        className="grid gap-4 sm:grid-cols-2 lg:flex lg:flex-row"
      >
        {TABS.map((t) => (
          <button
            key={t.key}
            type="button"
            role="tab"
            id={`tab-${t.key}`}
            aria-selected={tab === t.key}
            aria-controls={`panel-${t.key}`}
            onClick={() => setTab(t.key)}
            className={tabClass(tab === t.key)}
          >
            <span className="block text-lg font-semibold md:text-xl">
              {t.label}
            </span>
            <span
              className={`mt-1 block text-sm ${
                tab === t.key ? "text-white/80" : "text-ink-muted"
              }`}
            >
              {t.blurb}
            </span>
          </button>
        ))}
      </div>

      {/* PANEL */}
      <div
        role="tabpanel"
        id={`panel-${active.key}`}
        aria-labelledby={`tab-${active.key}`}
        className="mt-12"
      >
        <p className="mx-auto max-w-2xl text-center text-pretty text-lg leading-relaxed text-ink-muted">
          {active.intro}
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {active.forms.map((form, i) => {
            const cardClass =
              "card-surface group flex h-full items-start gap-4 p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-[0_18px_40px_-22px_rgba(11,31,51,0.3)]";

            const body = (
              <>
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
                    {form.download ? (
                      <>
                        Download PDF
                        <Download className="h-3.5 w-3.5" aria-hidden="true" />
                      </>
                    ) : (
                      <>
                        Fill out form
                        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                      </>
                    )}
                  </span>
                </span>
              </>
            );

            return form.download ? (
              <a
                key={form.href}
                href={form.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cardClass}
              >
                {body}
              </a>
            ) : (
              <Link key={form.href} href={form.href} className={cardClass}>
                {body}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
