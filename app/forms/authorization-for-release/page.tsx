import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import JotformEmbed from "@/components/JotformEmbed";

export const metadata: Metadata = {
  title: "Authorization for Release",
  description:
    "Authorize AmpleHealth to release or obtain your protected health information on your behalf.",
};

export default function AuthorizationForReleasePage() {
  return (
    <>
      <PageHero
        kicker="Patient forms"
        title="Authorization for"
        highlight="Release."
        description="Authorize AmpleHealth to release or obtain your protected health information."
      />

      <section className="container-page max-w-3xl py-16 md:py-20">
        <div className="overflow-hidden rounded-2xl">
          <JotformEmbed formId="262256537381057" title="Authorization for Release" />
        </div>
      </section>
    </>
  );
}
