import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import JotformEmbed from "@/components/JotformEmbed";

export const metadata: Metadata = {
  title: "Telemedicine Consent Agreement",
  description:
    "Consent to receiving care from AmpleHealth through our secure telemedicine platform.",
};

export default function TelemedicineConsentAgreementPage() {
  return (
    <>
      <PageHero
        kicker="Patient forms"
        title="Telemedicine Consent"
        highlight="Agreement."
        description="Consent to receiving care from AmpleHealth through our secure telemedicine platform."
      />

      <section className="container-page max-w-3xl py-16 md:py-20">
        <div className="overflow-hidden rounded-2xl">
          <JotformEmbed formId="262257690732058" title="Telemedicine Consent Agreement" />
        </div>
      </section>
    </>
  );
}
