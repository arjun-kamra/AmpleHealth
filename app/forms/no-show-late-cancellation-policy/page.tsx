import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import JotformEmbed from "@/components/JotformEmbed";

export const metadata: Metadata = {
  title: "No-Show & Late Cancellation Policy",
  description:
    "Review and acknowledge the AmpleHealth policy on missed appointments and late cancellations.",
};

export default function NoShowLateCancellationPolicyPage() {
  return (
    <>
      <PageHero
        kicker="Patient forms"
        title="No-Show & Late Cancellation"
        highlight="Policy."
        description="Review and acknowledge our policy on missed appointments and late cancellations."
      />

      <section className="container-page max-w-3xl py-16 md:py-20">
        <div className="overflow-hidden rounded-2xl">
          <JotformEmbed formId="262257541889066" title="No-Show & Late Cancellation Policy" />
        </div>
      </section>
    </>
  );
}
