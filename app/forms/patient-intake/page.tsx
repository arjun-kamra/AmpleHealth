import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import PatientIntakeForm from "@/components/forms/PatientIntakeForm";

export const metadata: Metadata = {
  title: "New Patient Intake Form",
  description:
    "Complete your new patient intake form so the AmpleHealth care team can get to know you before your first visit.",
};

export default function PatientIntakePage() {
  return (
    <>
      <PageHero
        kicker="Patient forms"
        title="New Patient"
        highlight="Intake."
        description="Help us get to know you before your first visit. The more complete this is, the more time we can spend on your care."
      />
      <PatientIntakeForm />
    </>
  );
}
