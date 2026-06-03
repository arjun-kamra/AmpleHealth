import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import CTABand from "@/components/CTABand";
import { Stagger, StaggerItem } from "@/components/Motion";
import { Download, Clock } from "@/components/Icons";
import { forms } from "@/lib/data";

export const metadata: Metadata = {
  title: "Patient Forms",
  description:
    "Download AmpleHealth patient forms — intake, privacy practices, telemedicine consent, and more. Online forms coming soon.",
};

export default function FormsPage() {
  return (
    <>
      <PageHero
        kicker="Patient forms"
        title="Everything you need, before you"
        highlight="arrive."
        description="Download and complete these forms ahead of your visit to save time at check-in. Links below are placeholders."
      />

      <section className="container-page py-20 md:py-28">
        {/* coming soon notice */}
        <div className="card-surface mb-10 flex items-start gap-4 border-brand/30 bg-brand/[0.04] p-6">
          <span className="grid h-10 w-10 flex-none place-items-center rounded-xl bg-brand/10 text-brand">
            <Clock className="h-5 w-5" />
          </span>
          <div>
            <p className="font-medium">Online forms are coming soon</p>
            <p className="mt-1 text-sm text-ink-muted">
              We&apos;re building secure digital intake so you can complete
              everything online. For now, please download, print, and bring your
              completed forms to your appointment.
            </p>
          </div>
        </div>

        <Stagger className="grid gap-4 md:grid-cols-2">
          {forms.map((form, i) => (
            <StaggerItem key={form.title}>
              {/* TODO: replace href with real PDF download link */}
              <a
                href="#"
                aria-label={`Download ${form.title} (placeholder)`}
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
                    <span className="mt-2 inline-block text-xs uppercase tracking-kicker text-ink-muted">
                      PDF · Placeholder
                    </span>
                  </div>
                </div>
                <span className="grid h-10 w-10 flex-none place-items-center rounded-full border border-ink/15 text-ink-muted transition-colors duration-300 group-hover:border-brand group-hover:bg-brand group-hover:text-white">
                  <Download className="h-4 w-4" />
                </span>
              </a>
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
