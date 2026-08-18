import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import JotformEmbed from "@/components/JotformEmbed";

export const metadata: Metadata = {
  title: "Notice of Privacy Practices",
  description:
    "Review and acknowledge AmpleHealth's Notice of Privacy Practices describing how your protected health information is used and disclosed.",
};

export default function NoticeOfPrivacyPracticesPage() {
  return (
    <>
      <PageHero
        kicker="Patient forms"
        title="Notice of Privacy"
        highlight="Practices."
        description="A summary of how AmpleHealth protects, uses, and discloses your health information — and your rights under HIPAA."
      />

      <section className="container-page max-w-3xl py-16 md:py-20">
        <div className="overflow-hidden rounded-2xl">
          <JotformEmbed formId="262255855941061" title="Notice of Privacy Practices" />
        </div>
      </section>
    </>
  );
}
