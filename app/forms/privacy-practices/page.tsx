import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import AcknowledgmentForm from "@/components/forms/AcknowledgmentForm";

export const metadata: Metadata = {
  title: "Notice of Privacy Practices",
  description:
    "Review and acknowledge AmpleHealth's Notice of Privacy Practices describing how your protected health information is used and disclosed.",
};

export default function PrivacyPracticesPage() {
  return (
    <>
      <PageHero
        kicker="Patient forms"
        title="Notice of Privacy"
        highlight="Practices."
        description="A summary of how AmpleHealth protects, uses, and discloses your health information — and your rights under HIPAA."
      />
      <AcknowledgmentForm
        formType="Notice of Privacy Practices Acknowledgment"
        acknowledgment="I acknowledge that I have received the Notice of Privacy Practices."
        policy={
          <>
            <h2 className="text-base font-semibold text-ink">Summary</h2>
            <p>
              AmpleHealth is committed to protecting the privacy of your
              protected health information (PHI). This notice describes how
              medical information about you may be used and disclosed, and how
              you can access that information.
            </p>
            <p>
              <strong>How we use your information.</strong> We may use and
              disclose your PHI for treatment, payment, and routine healthcare
              operations — for example, coordinating with specialists, billing
              your insurer, and improving the quality of care we provide.
            </p>
            <p>
              <strong>Disclosures permitted by law.</strong> In limited
              circumstances we may disclose PHI without your authorization, such
              as for public health activities, when required by law, or to
              prevent a serious threat to health or safety.
            </p>
            <p>
              <strong>Your rights.</strong> You have the right to inspect and
              request a copy of your records, request corrections, request
              restrictions on certain disclosures, request confidential
              communications, and receive an accounting of disclosures. You may
              also request a paper copy of this notice at any time.
            </p>
            <p>
              <strong>Our responsibilities.</strong> We are required by law to
              maintain the privacy of your PHI, provide you with this notice,
              and abide by the terms of the notice currently in effect. If you
              believe your privacy rights have been violated, you may file a
              complaint with our office or with the U.S. Department of Health
              and Human Services. We will never retaliate against you for filing
              a complaint.
            </p>
          </>
        }
      />
    </>
  );
}
