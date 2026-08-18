import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import BookOnlineTabs from "@/components/BookOnlineTabs";

export const metadata: Metadata = {
  title: "Book Online",
  description:
    "Book an appointment with AmpleHealth in Carmichael or Sacramento — new patient forms and direct scheduling with our providers.",
};

export default function BookOnlinePage() {
  return (
    <>
      <PageHero
        kicker="Book Online"
        title="Let's get you"
        highlight="scheduled."
        description="Tell us whether you're new to the practice or already a patient, and we'll point you to the right place."
      />
      <div className="pt-16 md:pt-20">
        <BookOnlineTabs />
      </div>
    </>
  );
}
