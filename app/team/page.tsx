import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import CTABand from "@/components/CTABand";
import { Reveal, Stagger, StaggerItem } from "@/components/Motion";
import Placeholder from "@/components/Placeholder";
import { ArrowRight } from "@/components/Icons";
import { providers, type Provider } from "@/lib/data";

export const metadata: Metadata = {
  title: "Our Team",
  description:
    "Meet the 18-person AmpleHealth care team — physicians, nurse practitioners, physician assistants, and dedicated care and administrative staff.",
};

const sections: {
  key: Provider["group"];
  label: string;
  description: string;
}[] = [
  {
    key: "physicians",
    label: "Physicians",
    description:
      "Board-certified internists and specialists leading clinical care across both locations.",
  },
  {
    key: "np-pa",
    label: "Nurse Practitioners & Physician Assistants",
    description:
      "Advanced practice providers delivering the full scope of primary and specialty care.",
  },
  {
    key: "care-admin",
    label: "Care & Administrative Team",
    description:
      "The people who keep AmpleHealth running — from clinical support to the first friendly voice you hear.",
  },
];

function ProviderCard({ p }: { p: Provider }) {
  const monogram = p.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <StaggerItem>
      <article className="group flex h-full flex-col">
        <Link href={`/team/${p.slug}`}>
          <Placeholder
            tone={p.tone}
            ratio="3 / 4"
            monogram={monogram}
            className="transition-transform duration-300 group-hover:-translate-y-1.5"
          />
        </Link>
        <h3 className="mt-5 text-xl font-semibold leading-tight">{p.name}</h3>
        {p.credentials && (
          <p className="mt-0.5 text-sm font-medium tracking-wide text-brand">
            {p.credentials}
          </p>
        )}
        <p className="text-sm text-ink-muted">{p.title}</p>
        <p className="mt-3 flex-1 text-pretty text-sm leading-relaxed text-ink-soft line-clamp-3">
          {p.shortBio}
        </p>
        <Link
          href={`/team/${p.slug}`}
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand transition-colors hover:text-brand-600"
        >
          Learn More
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </article>
    </StaggerItem>
  );
}

export default function TeamPage() {
  return (
    <>
      <PageHero
        kicker="Our team"
        title="The people behind your"
        highlight="care."
        description="18 physicians, nurse practitioners, physician assistants, and dedicated support staff — all united by one standard and one shared purpose."
      />

      <div className="container-page py-20 md:py-28 space-y-24">
        {sections.map((section, si) => {
          const group = providers.filter((p) => p.group === section.key);
          return (
            <section key={section.key}>
              <Reveal delay={si * 0.04}>
                <div className="mb-10 flex flex-col gap-2 border-b border-ink/10 pb-6">
                  <p className="kicker">{section.label}</p>
                  <h2 className="text-3xl font-semibold leading-tight tracking-tight">
                    {section.label}
                  </h2>
                  <p className="text-ink-muted">{section.description}</p>
                </div>
              </Reveal>

              <Stagger
                className={`grid gap-x-6 gap-y-12 ${
                  section.key === "care-admin"
                    ? "sm:grid-cols-2 lg:grid-cols-4"
                    : "sm:grid-cols-2 lg:grid-cols-3"
                }`}
              >
                {group.map((p) => (
                  <ProviderCard key={p.slug} p={p} />
                ))}
              </Stagger>
            </section>
          );
        })}
      </div>

      <CTABand
        title="Find the right fit"
        description="New patients are welcome with every member of our team. Book online to get started."
      />
    </>
  );
}
