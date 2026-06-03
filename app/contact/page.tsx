import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { Reveal } from "@/components/Motion";
import ContactForm from "@/components/ContactForm";
import { ArrowRight, Mail, MapPin, Phone } from "@/components/Icons";
import { locations, site } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact AmpleHealth in Carmichael (916-966-8500) and Sacramento (916-418-4595), or email hello@ample.health.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        kicker="Contact"
        title="We'd love to hear from"
        highlight="you."
        description="Reach the office nearest you, send a message, or book online. New patients are always welcome."
      />

      {/* LOCATION CARDS */}
      <section className="container-page py-20 md:py-28">
        <div className="grid gap-5 md:grid-cols-2">
          {locations.map((loc, i) => (
            <Reveal key={loc.city} delay={i * 0.08}>
              <div className="card-surface flex h-full flex-col p-7 md:p-8">
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand/10 text-brand">
                    <MapPin className="h-5 w-5" />
                  </span>
                  <h2 className="text-2xl font-semibold">{loc.label}</h2>
                </div>

                <div className="mt-5 space-y-3 text-ink-soft">
                  <p className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-5 w-5 flex-none text-ink-muted" />
                    <span>
                      {loc.address1}
                      <br />
                      {loc.address2}
                    </span>
                  </p>
                  <p className="flex items-center gap-3">
                    <Phone className="h-5 w-5 flex-none text-ink-muted" />
                    <a href={loc.phoneHref} className="hover:text-brand">
                      {loc.phone}
                    </a>
                  </p>
                </div>

                {/* Google Maps placeholder */}
                <div className="relative mt-6 overflow-hidden rounded-xl">
                  <div
                    className="aspect-[16/9] w-full"
                    style={{ background: "#104872" }}
                  >
                    <div className="bg-grid h-full w-full opacity-25" />
                  </div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 text-center text-white/85">
                    <MapPin className="h-6 w-6" />
                    <span className="text-xs uppercase tracking-kicker">
                      Map placeholder
                    </span>
                  </div>
                  {/* TODO: replace with embedded Google Maps iframe */}
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      loc.mapQuery
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-medium text-brand"
                  >
                    Open in Maps <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FORM + EMAIL */}
      <section className="relative overflow-hidden border-t border-ink/10 bg-paper-deep">
        <div className="bg-dots absolute right-0 top-0 h-72 w-72 opacity-40 mask-fade-b" />
        <div className="container-page relative grid gap-12 py-20 md:py-28 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <p className="kicker">Send a message</p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
              Let&apos;s get you cared for
            </h2>
            <p className="mt-5 text-pretty text-lg leading-relaxed text-ink-muted">
              Have a question or want to become a patient? Send us a note and
              we&apos;ll get back to you. For anything urgent, please call the
              office directly.
            </p>

            <a
              href={`mailto:${site.email}`}
              className="card-surface mt-8 inline-flex items-center gap-3 p-5 transition-colors hover:border-brand/40"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand/10 text-brand">
                <Mail className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-xs uppercase tracking-kicker text-ink-muted">
                  Email us
                </span>
                <span className="font-medium">{site.email}</span>
              </span>
            </a>
          </Reveal>

          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
