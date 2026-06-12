import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import AcknowledgmentForm from "@/components/forms/AcknowledgmentForm";

export const metadata: Metadata = {
  title: "Patient Partnership Plan",
  description:
    "Our shared commitments — what you can expect from AmpleHealth and what we ask of you as a partner in your care.",
};

export default function PatientPartnershipPage() {
  return (
    <>
      <PageHero
        kicker="Patient forms"
        title="Patient Partnership"
        highlight="Plan."
        description="Great care is a partnership. Here's what you can expect from us, and what we ask of you in return."
      />
      <AcknowledgmentForm
        formType="Patient Partnership Plan Acknowledgment"
        acknowledgment="I have read the Patient Partnership Plan and agree to participate as a partner in my care."
        policy={
          <>
            <h2 className="text-base font-semibold text-ink">
              What you can expect from us
            </h2>
            <ul className="list-disc space-y-1.5 pl-5">
              <li>To treat you with respect, dignity, and compassion.</li>
              <li>To listen carefully and not rush your visits.</li>
              <li>
                To explain your diagnosis and treatment options in language you
                understand.
              </li>
              <li>
                To protect your privacy and keep your health information secure.
              </li>
              <li>
                To coordinate your care across specialists and follow up on
                results.
              </li>
            </ul>

            <h2 className="pt-2 text-base font-semibold text-ink">
              What we ask of you
            </h2>
            <ul className="list-disc space-y-1.5 pl-5">
              <li>
                To share your complete health history, medications, and
                concerns honestly.
              </li>
              <li>
                To ask questions whenever something is unclear — there are no
                bad questions.
              </li>
              <li>
                To follow the agreed-upon care plan and tell us if something
                isn&apos;t working.
              </li>
              <li>
                To keep your appointments or provide advance notice when you
                cannot.
              </li>
              <li>
                To be an active participant in decisions about your health.
              </li>
            </ul>
            <p>
              Together, this partnership helps us deliver the kind of
              longitudinal, relationship-driven care that keeps you healthy over
              time.
            </p>
          </>
        }
      />
    </>
  );
}
