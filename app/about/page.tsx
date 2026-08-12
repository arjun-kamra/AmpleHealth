import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import CTABand from "@/components/CTABand";
import { Reveal } from "@/components/Motion";
import Placeholder from "@/components/Placeholder";
import { Check, MapPin } from "@/components/Icons";
import { locations, providers } from "@/lib/data";

export const metadata: Metadata = {
  title: "About",
  description:
    "The story and philosophy of AmpleHealth — internal medicine led by Dr. Dheeraj Kamra, MD, FACP, in Carmichael and Sacramento, CA.",
};

const philosophy = [
  {
    title: "Relationship first",
    body: "We invest in knowing your history, your goals, and your life — because the best medical decisions are made by someone who knows you.",
  },
  {
    title: "Continuity of care",
    body: "Your physician follows you across settings — clinic, hospital, and post-acute recovery — so nothing falls through the cracks.",
  },
  {
    title: "Evidence, applied with judgment",
    body: "We pair rigorous, current medicine with the practical judgment that comes from experience and attention.",
  },
];

// Founder biography lives with the rest of the provider content so /about and
// /team/dheeraj-kamra never drift apart.
const founder = providers.find((p) => p.slug === "dheeraj-kamra");

export default function AboutPage() {
  return (
    <>
      <PageHero
        kicker="About AmpleHealth"
        title="Built on relationships, measured by"
        highlight="outcomes."
        description="AmpleHealth is the internal medicine practice of Dr. Dheeraj Kamra, MD, FACP — serving Carmichael, Sacramento, and the surrounding communities with care that's both rigorous and deeply personal."
      />

      {/* STORY */}
      <section className="container-page py-20 md:py-28">
        <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:items-center">
          <Reveal>
            <p className="kicker">Our story</p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
              A practice with a point of view
            </h2>
            <div className="mt-5 space-y-4 text-pretty text-lg leading-relaxed text-ink-muted">
              <p>
                AmpleHealth began with a frustration familiar to many patients:
                care that felt rushed, fragmented, and impersonal. Dr. Kamra
                founded the practice to do it differently — to build an internal
                medicine home where patients are known, not numbered.
              </p>
              <p>
                Today we care for individuals and families across two
                Sacramento-area locations, offering everything from primary and
                preventive care to hospital and post-acute coordination. The
                thread connecting it all is continuity: one team, one record, one
                relationship that endures.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <figure className="relative overflow-hidden rounded-2xl" style={{ aspectRatio: "4 / 3" }}>
              <Image
                src="/practice/dr-kamra-with-staff.jpg"
                alt="Dr. Kamra catching up with a member of the care team"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </figure>
          </Reveal>
        </div>
      </section>

      {/* DR KAMRA BIO + FACP */}
      <section className="relative overflow-hidden border-y border-ink/10 bg-paper-deep">
        <div className="bg-dots absolute right-0 top-0 h-72 w-72 opacity-40 mask-fade-b" />
        <div className="container-page relative grid gap-14 py-20 md:py-28 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <Reveal>
            <Placeholder
              tone="#1B75BB"
              ratio="4 / 5"
              monogram="DK"
              label="Dheeraj Kamra, MD, FACP"
              className="max-w-md"
            />
          </Reveal>

          <Reveal delay={0.1}>
            <p className="kicker">Meet the founder</p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
              Dr. Dheeraj Kamra,{" "}
              <span className="italic text-brand">MD, FACP</span>
            </h2>
            <div className="mt-5 space-y-4 text-pretty text-lg leading-relaxed text-ink-muted">
              {founder?.fullBio.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            {/* FACP explainer */}
            <div className="card-surface mt-8 p-6 md:p-8">
              <div className="flex items-center gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand font-serif text-lg font-semibold text-white">
                  FACP
                </span>
                <div>
                  <p className="font-serif text-xl">
                    Fellow of the American College of Physicians
                  </p>
                  <p className="text-sm text-ink-muted">
                    A credential earned, not given.
                  </p>
                </div>
              </div>
              <p className="mt-4 text-pretty leading-relaxed text-ink-soft">
                The FACP designation is awarded by the American College of
                Physicians to internists who have demonstrated distinguished
                clinical excellence, scholarship, and service to the profession.
                It signals a physician&apos;s sustained commitment to the highest
                standards of internal medicine — and that&apos;s the standard
                Dr. Kamra brings to every patient.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="container-page py-20 md:py-28">
        <Reveal className="max-w-2xl">
          <p className="kicker">Our philosophy</p>
          <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
            How we practice
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {philosophy.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <div className="card-surface h-full p-7">
                <span className="font-serif text-4xl text-brand/30">
                  0{i + 1}
                </span>
                <h3 className="mt-3 text-2xl font-semibold">{p.title}</h3>
                <p className="mt-3 text-pretty leading-relaxed text-ink-muted">
                  {p.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* LIFE AT THE PRACTICE */}
      <section className="container-page pb-20 md:pb-28">
        <Reveal className="max-w-2xl">
          <p className="kicker">Life at the practice</p>
          <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
            The people make the place
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-ink-muted">
            No staged smiles, no stock photos — just a few unposed moments from
            an ordinary week across our two offices.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <Reveal>
            <figure>
              <div className="relative overflow-hidden rounded-2xl" style={{ aspectRatio: "1 / 1" }}>
                <Image
                  src="/practice/front-desk-shreya-liana.jpg"
                  alt="Shreya and Liana at the front desk"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-3 text-sm text-ink-muted">
                Shreya &amp; Liana holding down the front desk
              </figcaption>
            </figure>
          </Reveal>

          <Reveal delay={0.08}>
            <div
              className="flex h-full flex-col justify-between rounded-2xl bg-ink p-8 text-paper"
              style={{ minHeight: "260px" }}
            >
              <span className="font-serif text-6xl leading-none text-brand-200">
                &ldquo;
              </span>
              <p className="text-pretty font-serif text-2xl leading-snug">
                Patients are known here, not numbered.
              </p>
              <p className="mt-6 text-sm uppercase tracking-kicker text-paper/60">
                The AmpleHealth standard
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.16}>
            <figure>
              <div className="relative overflow-hidden rounded-2xl" style={{ aspectRatio: "1 / 1" }}>
                <Image
                  src="/practice/front-desk-liana-tiffany.jpg"
                  alt="Liana and Tiffany between appointments"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-3 text-sm text-ink-muted">
                Liana &amp; Tiffany between appointments
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* LOCATIONS */}
      <section className="relative overflow-hidden border-t border-ink/10 bg-paper-deep">
        <div className="bg-grid absolute inset-0 opacity-50" />
        <div className="container-page relative py-20 md:py-28">
          <Reveal className="max-w-2xl">
            <p className="kicker">Where to find us</p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
              Two locations, one standard of care
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {locations.map((loc, i) => (
              <Reveal key={loc.city} delay={i * 0.08}>
                <div className="card-surface flex h-full items-start gap-4 p-7">
                  <span className="grid h-11 w-11 flex-none place-items-center rounded-xl bg-brand/10 text-brand">
                    <MapPin className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-2xl font-semibold">{loc.label}</h3>
                    <p className="mt-1 text-ink-muted">{loc.address1}</p>
                    <p className="text-ink-muted">{loc.address2}</p>
                    <a
                      href={loc.phoneHref}
                      className="mt-3 inline-flex items-center gap-2 font-medium text-brand"
                    >
                      <Check className="h-4 w-4" /> {loc.phone}
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
