import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import CTABand from "@/components/CTABand";
import FormsTabs from "@/components/FormsTabs";

export const metadata: Metadata = {
  title: "Patient Forms",
  description:
    "Complete your AmpleHealth patient forms online — new patient intake, telemedicine and privacy consent, medical records requests, medication agreements, and advance health care directives.",
};

export default function FormsPage() {
  return (
    <>
      <PageHero
        kicker="Patient forms"
        title="Everything you need, before you"
        highlight="arrive."
        description="Complete these forms online ahead of your visit to save time at check-in. Each one goes straight to our care team."
      />

      <FormsTabs />

      <CTABand
        title="Questions about a form?"
        description="Our front desk is happy to help. Call the office nearest you or book your visit online."
      />
    </>
  );
}
