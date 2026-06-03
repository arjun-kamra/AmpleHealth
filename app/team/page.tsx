import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import CTABand from "@/components/CTABand";
import { Stagger, StaggerItem } from "@/components/Motion";
import Placeholder from "@/components/Placeholder";
import { ArrowRight } from "@/components/Icons";
import { providers } from "@/lib/data";

export const metadata: Metadata = {
  title: "Our Team",
  description:
    "Meet the AmpleHealth care team — Dr. Dheeraj Kamra MD FACP, Dr. Mythli Nagaraj MD, Dr. Rekha Pareek MD, Alice Phillips FNP, Sidrah Khan FNP-C, and Yelena Popova PA.",
};

export default function TeamPage() {
  return (
    <>
      <PageHero
        kicker="Our team"
        title="The people behind your"
        highlight="care."
        description="A close-knit team of physicians and advanced practice providers, united by one standard and one shared record — so your care is always coordinated."
      />

      <section className="container-page py-20 md:py-28">
        <Stagger className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {providers.map((p) => (
            <StaggerItem key={p.name}>
              <article className="group flex h-full flex-col">
                <Link href={`/team/${p.slug}`}>
                  <Placeholder
                    tone={p.tone}
                    ratio="3 / 4"
                    monogram={p.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                    className="transition-transform duration-300 group-hover:-translate-y-1.5"
                  />
                </Link>
                <h2 className="mt-5 text-2xl font-semibold leading-tight">
                  {p.name}
                </h2>
                <p className="mt-0.5 text-sm font-medium tracking-wide text-brand">
                  {p.credentials}
                </p>
                <p className="text-sm text-ink-muted">{p.title}</p>
                <p className="mt-3 flex-1 text-pretty text-sm leading-relaxed text-ink-soft">
                  {p.shortBio}
                </p>
                <Link
                  href={`/team/${p.slug}`}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-brand transition-colors hover:text-brand-600"
                >
                  Learn More
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <CTABand
        title="Find the right fit"
        description="New patients are welcome with every member of our team. Book online to get started."
      />
    </>
  );
}
