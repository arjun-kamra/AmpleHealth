import type { Metadata } from "next";
import Link from "next/link";
import CTABand from "@/components/CTABand";
import { Reveal, Stagger, StaggerItem } from "@/components/Motion";
import InsurerLogo from "@/components/InsurerLogo";
import type { Insurer } from "@/lib/data";
import { insurers } from "@/lib/data";

export const metadata: Metadata = {
  title: "Insurance & Plans Accepted",
  description:
    "AmpleHealth accepts most major insurance plans including Aetna, Anthem, Blue Shield, Cigna, Health Net, Medicare, United Healthcare, Hill Physicians, and more. Call to confirm your coverage.",
};

const typeOrder = ["Commercial", "Government", "IPA / Medical Group", "Managed Care"];

function groupByType(list: typeof insurers) {
  const map: Record<string, typeof insurers> = {};
  for (const t of typeOrder) map[t] = [];
  for (const ins of list) {
    if (!map[ins.type]) map[ins.type] = [];
    map[ins.type].push(ins);
  }
  return typeOrder.map((t) => [t, map[t]] as [string, typeof insurers]).filter(([, v]) => v.length > 0);
}

export default function InsurancePage() {
  const groups = groupByType(insurers);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-ink/10 bg-paper-deep">
        <div className="bg-dots absolute inset-0 opacity-40" />
        <div className="container-page relative py-20 md:py-28">
          <Reveal className="max-w-2xl">
            <p className="kicker">Coverage</p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
              Insurance &amp; plans accepted
            </h1>
            <p className="mt-5 text-pretty text-lg leading-relaxed text-ink-muted">
              We work with most major insurance carriers, Medicare, and independent physician associations serving the Sacramento region. Always call us to confirm your specific plan, group, and coverage details.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="tel:+19169668500" className="btn-primary">
                Call 916-966-8500
              </a>
              <Link href="/contact" className="btn-ghost">
                Office locations
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* INSURANCE GRID */}
      <section className="container-page py-20 md:py-28">
        <div className="space-y-16">
          {groups.map(([type, list]) => (
            <div key={type}>
              <Reveal>
                <h2 className="mb-8 text-2xl font-semibold">{type}</h2>
              </Reveal>
              <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {list.map((ins) => (
                  <StaggerItem key={ins.name}>
                    <div className="card-surface group flex h-full flex-col overflow-hidden p-6">
                      <InsurerLogo name={ins.name} logo={ins.logo} color={ins.color} />
                      <div className="mt-4">
                        <h3 className="font-semibold leading-tight">{ins.name}</h3>
                        <span
                          className="mt-1 inline-block rounded-full px-2.5 py-0.5 text-xs font-medium text-white"
                          style={{ backgroundColor: ins.color + "CC" }}
                        >
                          {ins.type}
                        </span>
                      </div>
                      <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted">
                        {ins.description}
                      </p>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          ))}
        </div>
      </section>

      {/* NOTICE BAND */}
      <section className="border-y border-ink/10 bg-amber-50">
        <div className="container-page py-10">
          <Reveal className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
            <span className="grid h-12 w-12 flex-none place-items-center rounded-full bg-amber-100 text-2xl">
              ℹ️
            </span>
            <div>
              <p className="font-semibold text-ink">Don&apos;t see your insurance?</p>
              <p className="mt-1 text-sm text-ink-muted">
                This list isn&apos;t exhaustive — we may still accept your plan. Call us at{" "}
                <a href="tel:+19169668500" className="font-medium text-brand hover:underline">
                  916-966-8500
                </a>{" "}
                (Carmichael) or{" "}
                <a href="tel:+19164184595" className="font-medium text-brand hover:underline">
                  916-418-4595
                </a>{" "}
                (Sacramento) and we&apos;ll confirm your coverage.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <CTABand />
    </>
  );
}
