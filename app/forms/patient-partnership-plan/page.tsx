import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import JotformEmbed from "@/components/JotformEmbed";

export const metadata: Metadata = {
  title: "Patient Partnership Plan",
  description:
    "Review and acknowledge the AmpleHealth Patient Partnership Plan — our shared commitments to one another.",
};

export default function PatientPartnershipPlanPage() {
  return (
    <>
      <PageHero
        kicker="Patient forms"
        title="Patient Partnership"
        highlight="Plan."
        description="Our shared commitments — what you can expect from us, and what we ask of you."
      />

      <section className="container-page max-w-3xl py-16 md:py-20">
        <div className="overflow-hidden rounded-2xl">
          <JotformEmbed formId="262256780942060" title="Patient Partnership Plan" />
        </div>
      </section>
    </>
  );
}
