import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import JotformEmbed from "@/components/JotformEmbed";

export const metadata: Metadata = {
  title: "Chronic Pain & Controlled Substance Treatment Agreement",
  description:
    "Review and sign the AmpleHealth chronic pain and controlled substance treatment agreement — our shared responsibilities for safe, effective care.",
};

export default function ChronicPainControlledSubstanceAgreementPage() {
  return (
    <>
      <PageHero
        kicker="Patient forms"
        title="Chronic Pain & Controlled Substance"
        highlight="Treatment Agreement."
        description="Treating chronic pain with controlled medications takes close partnership. This agreement sets out how we'll manage your care together and what each of us is responsible for."
      />

      <section className="container-page max-w-3xl py-16 md:py-20">
        <div className="overflow-hidden rounded-2xl">
          <JotformEmbed
            formId="262458650544058"
            title="Chronic Pain & Controlled Substance Treatment Agreement"
          />
        </div>
      </section>
    </>
  );
}
