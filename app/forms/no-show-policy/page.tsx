import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import AcknowledgmentForm from "@/components/forms/AcknowledgmentForm";

export const metadata: Metadata = {
  title: "No-Show & Late Cancellation Policy",
  description:
    "Review and acknowledge AmpleHealth's policy on missed appointments and late cancellations.",
};

export default function NoShowPolicyPage() {
  return (
    <>
      <PageHero
        kicker="Patient forms"
        title="No-Show & Late"
        highlight="Cancellation Policy."
        description="Missed appointments affect patients waiting to be seen. Please review our policy so we can serve everyone well."
      />
      <AcknowledgmentForm
        formType="No-Show & Late Cancellation Policy Acknowledgment"
        acknowledgment="I have read and agree to the No-Show & Late Cancellation Policy."
        policy={
          <>
            <h2 className="text-base font-semibold text-ink">Our policy</h2>
            <p>
              When you schedule an appointment with AmpleHealth, that time is
              reserved exclusively for you. When an appointment is missed or
              cancelled at the last minute, another patient who needed care
              loses the opportunity to be seen.
            </p>
            <p>
              <strong>Advance notice.</strong> We ask that you provide at least{" "}
              <strong>24 hours&apos; notice</strong> if you need to cancel or
              reschedule an appointment. This allows us to offer the time to
              another patient.
            </p>
            <p>
              <strong>Late cancellations &amp; no-shows.</strong> Appointments
              cancelled with less than 24 hours&apos; notice, or missed entirely
              without notice, may be subject to a cancellation fee. Repeated
              no-shows may affect your ability to schedule future appointments.
            </p>
            <p>
              <strong>Late arrivals.</strong> If you arrive significantly late,
              we may need to reschedule your visit to avoid delaying other
              patients. We will always try to accommodate you when possible.
            </p>
            <p>
              <strong>How to reschedule.</strong> Please call the office or use
              the online booking link as early as possible. We understand that
              emergencies happen, and we will work with you in good faith.
            </p>
          </>
        }
      />
    </>
  );
}
