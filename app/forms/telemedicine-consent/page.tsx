import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import AcknowledgmentForm from "@/components/forms/AcknowledgmentForm";

export const metadata: Metadata = {
  title: "Telemedicine Consent Agreement",
  description:
    "Review and consent to receiving care from AmpleHealth via telemedicine.",
};

export default function TelemedicineConsentPage() {
  return (
    <>
      <PageHero
        kicker="Patient forms"
        title="Telemedicine"
        highlight="Consent."
        description="Telemedicine lets us care for you wherever you are. Please review how it works and what to expect."
      />
      <AcknowledgmentForm
        formType="Telemedicine Consent Agreement"
        acknowledgment="I consent to receive care from AmpleHealth via telemedicine and understand the information described above."
        extraCheckbox={{
          name: "California Confirmation",
          label:
            "I confirm that I am physically located in the State of California at the time of my telemedicine visit.",
        }}
        policy={
          <>
            <h2 className="text-base font-semibold text-ink">
              About telemedicine
            </h2>
            <p>
              Telemedicine is the use of secure video, phone, and messaging
              technology to deliver healthcare when you and your provider are
              not in the same room. It allows AmpleHealth to evaluate, diagnose,
              and treat many conditions remotely.
            </p>
            <p>
              <strong>Benefits.</strong> Telemedicine can improve access to
              care, reduce travel time, and let you connect with your provider
              from the comfort of home.
            </p>
            <p>
              <strong>Limitations.</strong> In some cases your provider may
              determine that an in-person visit is necessary. Telemedicine is
              not appropriate for medical emergencies — if you are experiencing
              an emergency, call 911.
            </p>
            <p>
              <strong>Privacy &amp; security.</strong> We use technology
              designed to protect your privacy. As with any electronic
              communication, there is a small risk that information could be
              intercepted; we take reasonable steps to minimize this risk.
            </p>
            <p>
              <strong>Your rights.</strong> Your consent to telemedicine is
              voluntary. You may withhold or withdraw your consent at any time
              without affecting your right to future care or treatment.
            </p>
            <p>
              <strong>Location requirement.</strong> AmpleHealth providers are
              licensed in California. To receive care, you must be physically
              located in California at the time of your visit.
            </p>
          </>
        }
      />
    </>
  );
}
