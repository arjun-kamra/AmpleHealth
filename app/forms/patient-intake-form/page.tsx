import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import JotformEmbed from "@/components/JotformEmbed";

export const metadata: Metadata = {
  title: "Patient Intake Form",
  description:
    "Complete your patient intake form so the AmpleHealth care team can get to know you before your first visit.",
};

export default function PatientIntakeFormPage() {
  return (
    <>
      <PageHero
        kicker="Patient forms"
        title="Patient Intake"
        highlight="Form."
        description="Help us get to know you before your first visit. The more complete this is, the more time we can spend on your care."
      />

      <section className="container-page max-w-3xl py-16 md:py-20">
        <div className="overflow-hidden rounded-2xl">
          <JotformEmbed formId="262256955242057" title="Patient Intake Form" />
        </div>
      </section>
    </>
  );
}
