import { locations, site } from "@/lib/data";
import { Reveal } from "./Motion";
import { ArrowRight, Phone } from "./Icons";

export default function CTABand({
  title = "Ready to be seen?",
  description = "Book online in minutes, or call the office nearest you. New patients are always welcome.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-brand text-white">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.25) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.25) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      <div className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

      <div className="container-page relative py-16 md:py-20">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-xl">
              <h2 className="text-3xl font-semibold leading-tight md:text-4xl">
                {title}
              </h2>
              <p className="mt-3 text-pretty text-white/85">{description}</p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href={site.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-medium text-brand transition-all duration-300 hover:bg-paper hover:shadow-lg"
              >
                Book Online <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href={locations[0].phoneHref}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 px-7 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:bg-white/10"
              >
                <Phone className="h-4 w-4" /> {locations[0].phone}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
