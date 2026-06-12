import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import CTABand from "@/components/CTABand";
import { Stagger, StaggerItem } from "@/components/Motion";
import { ArrowRight } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Patient Forms",
  description:
    "Complete your AmpleHealth patient forms online — new patient intake, authorization for release of information, privacy practices, telemedicine consent, and more.",
};

const formLinks = [
  {
    href: "/forms/patient-intake",
    title: "New Patient Intake",
    description:
      "Tell us about your history, insurance, medications, and lifestyle before your first visit.",
  },
  {
    href: "/forms/authorization-release",
    title: "Authorization for Release of Information",
    description:
      "Authorize AmpleHealth to release or obtain your protected health information.",
  },
  {
    href: "/forms/privacy-practices",
    title: "Notice of Privacy Practices",
    description:
      "Review how we protect your health information and acknowledge receipt.",
  },
  {
    href: "/forms/no-show-policy",
    title: "No-Show & Late Cancellation Policy",
    description:
      "Review and acknowledge our policy on missed appointments and late cancellations.",
  },
  {
    href: "/forms/patient-partnership",
    title: "Patient Partnership Plan",
    description:
      "Our shared commitments — what you can expect from us, and what we ask of you.",
  },
  {
    href: "/forms/telemedicine-consent",
    title: "Telemedicine Consent",
    description:
      "Consent to receiving care from AmpleHealth via secure telemedicine.",
  },
];

export default function FormsPage() {
  return (
    <>
      <PageHero
        kicker="Patient forms"
        title="Everything you need, before you"
        highlight="arrive."
        description="Complete these forms online ahead of your visit to save time at check-in. Each one goes straight to our care team."
      />

      <section className="container-page py-20 md:py-28">
        <Stagger className="grid gap-4 md:grid-cols-2">
          {formLinks.map((form, i) => (
            <StaggerItem key={form.href}>
              <Link
                href={form.href}
                className="card-surface group flex h-full items-start justify-between gap-4 p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-[0_18px_40px_-22px_rgba(11,31,51,0.3)]"
              >
                <div className="flex items-start gap-4">
                  <span className="grid h-11 w-11 flex-none place-items-center rounded-xl bg-brand/10 font-serif text-base font-semibold text-brand">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h2 className="text-lg font-semibold leading-snug">
                      {form.title}
                    </h2>
                    <p className="mt-1 text-sm text-ink-muted">
                      {form.description}
                    </p>
                    <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-brand">
                      Fill out form
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <CTABand
        title="Questions about a form?"
        description="Our front desk is happy to help. Call the office nearest you or book your visit online."
      />
    </>
  );
}
