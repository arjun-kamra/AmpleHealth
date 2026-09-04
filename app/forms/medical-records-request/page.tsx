import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import JotformEmbed from "@/components/JotformEmbed";

export const metadata: Metadata = {
  title: "Medical Records Request Form",
  description:
    "Review the AmpleHealth medical records fee policy and request copies of your medical records online.",
};

export default function MedicalRecordsRequestPage() {
  return (
    <>
      <PageHero
        kicker="Patient forms"
        title="Medical Records"
        highlight="Request Form."
        description="Review our records fee policy and tell us which records you need. We'll confirm your request and let you know when your copies are ready."
      />

      <section className="container-page max-w-3xl py-16 md:py-20">
        <div className="overflow-hidden rounded-2xl">
          <JotformEmbed
            formId="262459433955064"
            title="Medical Records Request Form"
          />
        </div>
      </section>
    </>
  );
}
