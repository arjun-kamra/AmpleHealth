import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import JotformEmbed from "@/components/JotformEmbed";

export const metadata: Metadata = {
  title: "ADHD Stimulant Medication Agreement",
  description:
    "Review and sign the AmpleHealth ADHD stimulant medication agreement — our shared responsibilities for safe, appropriate stimulant treatment.",
};

export default function AdhdStimulantMedicationAgreementPage() {
  return (
    <>
      <PageHero
        kicker="Patient forms"
        title="ADHD Stimulant Medication"
        highlight="Agreement."
        description="Stimulant medications work best inside a clear, shared plan. This agreement sets out what we'll do for you and what we ask of you so your treatment stays safe and effective."
      />

      <section className="container-page max-w-3xl py-16 md:py-20">
        <div className="overflow-hidden rounded-2xl">
          <JotformEmbed
            formId="262459328418061"
            title="ADHD Stimulant Medication Agreement"
          />
        </div>
      </section>
    </>
  );
}
