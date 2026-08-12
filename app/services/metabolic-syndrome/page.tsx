import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CTABand from "@/components/CTABand";
import { Reveal, Stagger, StaggerItem } from "@/components/Motion";
import { ArrowRight, Check } from "@/components/Icons";
import { services, site } from "@/lib/data";

const metabolicService = services.find((s) => s.slug === "metabolic-syndrome")!;

export const metadata: Metadata = {
  title: "Physician-Directed Weight Loss Program",
  description:
    "Science-backed metabolic medicine at AmpleHealth — GLP-1 therapy, continuous glucose monitoring, registered nutritionist guidance, and dedicated support for lasting weight loss and metabolic health.",
};

const TONE = "#1B75BB";

const STEPS = [
  {
    number: "01",
    title: "Advanced Medical Therapy",
    body: "We utilize the latest breakthroughs in metabolic medicine, including GLP-1 and GIP receptor agonists. These medications work with your brain and gut to manage hunger cues and improve insulin sensitivity, leveling the playing field for sustainable weight loss.",
  },
  {
    number: "02",
    title: "Real-Time Data with CGM",
    body: "By utilizing Continuous Glucose Monitors (CGM), we take the guesswork out of eating. You'll see exactly how your body responds to specific foods in real time, allowing us to build a nutritional plan that keeps your blood sugar stable and your energy high.",
  },
  {
    number: "03",
    title: "Expert Nutritional Guidance",
    body: `Our registered nutritionists don't believe in \u201cgood\u201d or \u201cbad\u201d foods. They work with your CGM data to help you understand your unique metabolic fingerprint, creating a flexible, sustainable way of eating that you actually enjoy.`,
  },
  {
    number: "04",
    title: "A Support Team in Your Corner",
    body: "Change is hard; doing it alone is harder. Our dedicated support team is with you every step of the way to provide accountability, troubleshoot challenges, and celebrate your wins — both big and small.",
  },
];

const CONDITIONS = [
  {
    title: "Chronic Obesity",
    description:
      `Moving past the \u201cyo-yo\u201d cycle of traditional dieting with a medically-directed, sustainable approach.`,
  },
  {
    title: "Metabolic Syndrome",
    description:
      "Addressing high blood pressure, blood sugar, and cholesterol simultaneously through root-cause treatment.",
  },
  {
    title: "Insulin Resistance",
    description:
      "Using real-time glucose data to bridge the gap between what you eat and how you feel.",
  },
];

export default function MetabolicSyndromePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-ink/10 bg-paper-deep">
        <div className="bg-grid absolute inset-0 opacity-60" />
        <div
          className="pointer-events-none absolute -right-24 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full opacity-15 blur-3xl"
          style={{ backgroundColor: TONE }}
        />
        <div className="container-page relative py-16 md:py-24">
          <Reveal>
            <Link href="/services" className="link-underline text-sm font-medium">
              <ArrowRight className="h-4 w-4 rotate-180" /> All services
            </Link>
          </Reveal>
          <div className="mt-8 grid items-end gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <Reveal delay={0.05}>
              <p className="kicker" style={{ color: TONE }}>
                Weight Loss &amp; Metabolic Health
              </p>
              <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
                Physician-Directed{" "}
                <span style={{ color: TONE }}>Weight Loss</span> Program
              </h1>
              <p className="mt-3 text-xl font-medium text-ink-soft">
                Rewrite Your Metabolic Story
              </p>
              <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-ink-muted">
                Traditional &ldquo;weight loss&rdquo; advice often boils down to &ldquo;eat less,
                move more.&rdquo; But if you&apos;re living with obesity or metabolic
                syndrome, it&apos;s never that simple &mdash; it&apos;s not a lack of
                willpower, it&apos;s biology. At AmpleHealth, we move beyond the
                scale, combining cutting-edge medical treatments, real-time
                glucose data, and a dedicated support team to help you reclaim
                your health from the inside out.
              </p>
              <div className="mt-8">
                <a
                  href={site.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  Schedule a Consultation <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              {/* STOCK PLACEHOLDER — replace with real practice photo */}
              <div
                className="relative overflow-hidden rounded-2xl"
                style={{ aspectRatio: "4 / 3" }}
              >
                <Image
                  src={metabolicService.stockImage}
                  alt="Physician-Directed Weight Loss Program"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* OUR COMPREHENSIVE APPROACH */}
      <section className="container-page py-20 md:py-28">
        <Reveal>
          <p className="kicker">How It Works</p>
          <h2 className="mt-4 text-3xl font-semibold leading-tight md:text-4xl">
            Our Comprehensive Approach
          </h2>
          <p className="mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-ink-muted">
            Four pillars that work together — medicine, data, nutrition, and
            support — to address the root causes of metabolic disease rather
            than just the symptoms.
          </p>
        </Reveal>

        <Stagger className="mt-12 grid gap-6 sm:grid-cols-2">
          {STEPS.map((step) => (
            <StaggerItem key={step.number}>
              <div className="card-surface flex h-full flex-col gap-5 p-7">
                <div className="flex items-start gap-4">
                  <span
                    className="flex-none font-serif text-4xl font-semibold leading-none"
                    style={{ color: TONE }}
                  >
                    {step.number}
                  </span>
                  <h3 className="mt-1 text-xl font-semibold leading-snug">
                    {step.title}
                  </h3>
                </div>
                <p className="flex-1 text-pretty leading-relaxed text-ink-muted">
                  {step.body}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* IS THIS RIGHT FOR YOU */}
      <section className="border-y border-ink/10 bg-paper-deep">
        <div className="container-page py-20 md:py-28">
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr]">
            <Reveal>
              <p className="kicker">Who We Help</p>
              <h2 className="mt-4 text-3xl font-semibold leading-tight md:text-4xl">
                Is This Program Right for You?
              </h2>
              <p className="mt-5 text-pretty text-lg leading-relaxed text-ink-muted">
                We specialize in helping individuals navigating complex
                metabolic challenges where one-size-fits-all advice has failed.
                If any of the following describes you, this program was built
                with you in mind.
              </p>
              <a
                href={site.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost mt-8 inline-flex"
              >
                Talk to our team
              </a>
            </Reveal>

            <Reveal delay={0.1}>
              <ul className="space-y-6">
                {CONDITIONS.map((c) => (
                  <li key={c.title} className="flex items-start gap-4">
                    <span
                      className="mt-0.5 grid h-6 w-6 flex-none place-items-center rounded-full text-white"
                      style={{ backgroundColor: TONE }}
                    >
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <div>
                      <p className="font-semibold text-ink">{c.title}</p>
                      <p className="mt-1 text-pretty text-sm leading-relaxed text-ink-muted">
                        {c.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="relative overflow-hidden bg-brand text-white">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.25) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.25) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        <div className="container-page relative py-20 text-center md:py-24">
          <Reveal>
            <p className="kicker text-white/70">Get Started</p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight md:text-4xl">
              Ready to meet the new you?
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-pretty text-lg leading-relaxed text-white/80">
              The journey to a healthier metabolism starts with a single
              conversation. Let&apos;s stop fighting your biology and start working
              with it.
            </p>
            <a
              href={site.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-semibold text-brand transition-all duration-300 hover:bg-paper hover:shadow-lg"
            >
              Schedule Your Consultation{" "}
              <ArrowRight className="h-4 w-4" />
            </a>
          </Reveal>
        </div>
      </section>

      <CTABand />
    </>
  );
}
