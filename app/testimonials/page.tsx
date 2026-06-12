import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { Stagger, StaggerItem } from "@/components/Motion";
import Stars from "@/components/Stars";
import { ArrowRight } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Testimonials",
  description:
    "What patients say about AmpleHealth — real care, real relationships, across Carmichael and Sacramento.",
};

const GOOGLE_REVIEW_URL = "https://www.google.com/search?q=AmpleHealth+reviews";

const testimonials = [
  {
    name: "Susan L.",
    date: "May 09, 2026",
    rating: 5,
    text: "Dr. Faraji was my doctors when I came back to Citrus Heights CA",
  },
  {
    name: "Kim R.",
    date: "May 09, 2026",
    rating: 5,
    text: "Great Dr. was willing to help my mother and work with us to provide the best care for her under difficult medical conditions.",
  },
  {
    name: "Sara C.",
    date: "May 08, 2026",
    rating: 5,
    text: "Yelena is great and we have been going to her for many years. She is very kind, attentive and knows our health history. She is always great to follow up with us on labs X-rays or testing.etc. and will call us with results and further action if needed. We always ask for Yelena for our annual and other needed appointments.",
  },
  {
    name: "Mike K.",
    date: "Dec 03, 2025",
    rating: 5,
    text: "Haven't seen Kamra in years. I see Yelena Popova. She is the Best! She is the reason that I continue to go to this office!",
  },
  {
    name: "Linda A.",
    date: "Nov 19, 2025",
    rating: 5,
    text: "Very thorough, listened to my concerns.",
  },
  {
    name: "Winona B.",
    date: "Nov 12, 2025",
    rating: 5,
    text: "Dr. Kamra is always professional and always answers my questions.",
  },
  {
    name: "Michael R.",
    date: "Oct 20, 2025",
    rating: 5,
    text: "Dr Kamra is a brilliant doctor in every way and his staff is phenomenal!!",
  },
  {
    name: "Dennis V.",
    date: "Oct 14, 2025",
    rating: 5,
    text: "Alice is thorough, never in a hurry, always listens and makes great suggestions!!!",
  },
  {
    name: "Carolyn M.",
    date: "Oct 14, 2025",
    rating: 5,
    text: "Very good Dr. I have not had such a good in years. If you can go see him.",
  },
  {
    name: "Ardell B.",
    date: "Oct 01, 2025",
    rating: 5,
    text: "She is the best doctor and I'm so glad I get to keep her.",
  },
  {
    name: "John K.",
    date: "Sep 30, 2025",
    rating: 5,
    text: "My video visit was with Dr. Nagaraj. She listens carefully and asks appropriate questions. She is very thorough. This is the second time I've seen Dr. Nagaraj, the first visit being in person at the office. I am confident that she has my best interest in mind.",
  },
  {
    name: "Taissia S.",
    date: "Sep 25, 2025",
    rating: 5,
    text: "Thank you! I received all answers on my questions. I know more about my real condition.",
  },
  {
    name: "Marie M.",
    date: "Aug 27, 2025",
    rating: 5,
    text: "So glad I switched doctors to Dr. Kamra!",
  },
  {
    name: "Rhoda T.",
    date: "Jun 04, 2025",
    rating: 5,
    text: "I didn't see Dr Kamra but I did communicate with Yelena Popova PA who called me to let me know the results of my mammogram and breast ultrasound. It was a very timely call coming just hours after the tests, and I appreciate Yelena's professionalism.",
  },
  {
    name: "John R.",
    date: "Apr 11, 2025",
    rating: 5,
    text: "Excellent and caring Doctor.",
  },
  {
    name: "Linda D.",
    date: "Apr 11, 2025",
    rating: 5,
    text: "I am now seeing DR Kamra's new associate DR Mythili Nagaraj. I am very happy with Dr Nagaraj's thorough, thoughtful care and pleasant personality.",
  },
  {
    name: "Joyce C.",
    date: "Mar 21, 2025",
    rating: 5,
    text: "My appointments with Dr. Nagaraj are always very efficient, friendly, and helpful. She never rushes our time and is very attentive to my questions and concerns. Thank you Dr. Nagaraj and staff for making me feel comfortable.",
  },
];

function initials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function TestimonialsPage() {
  return (
    <>
      <PageHero
        kicker="Testimonials"
        title="What Our Patients"
        highlight="Say."
        description="The trust our patients place in us is the measure that matters most. Here's what they share in their own words."
      >
        <div className="flex items-center gap-3">
          <Stars rating={4.9} size={20} />
          <span className="text-ink-soft">
            <span className="font-medium">4.9</span> · 180+ reviews
          </span>
        </div>
      </PageHero>

      <section className="container-page py-20 md:py-28">
        <Stagger className="gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
          {testimonials.map((t) => (
            <StaggerItem key={`${t.name}-${t.date}`} className="break-inside-avoid">
              <figure className="card-surface flex flex-col p-7">
                <Stars rating={t.rating} />
                <blockquote className="mt-4 flex-1 text-pretty leading-relaxed text-ink-soft">
                  {t.text}
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-ink/10 pt-5">
                  <span className="grid h-10 w-10 flex-none place-items-center rounded-full bg-brand/10 text-sm font-semibold text-brand">
                    {initials(t.name)}
                  </span>
                  <span className="text-sm">
                    <span className="block font-medium text-ink">{t.name}</span>
                    <span className="text-ink-muted">{t.date}</span>
                  </span>
                </figcaption>
              </figure>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="relative overflow-hidden bg-brand text-white">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.25) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.25) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        <div className="container-page relative py-16 text-center md:py-20">
          <h2 className="text-3xl font-semibold leading-tight md:text-4xl">
            Loved your visit?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-pretty text-white/85">
            Your words help other patients find care they can trust. We&apos;d
            be grateful if you shared your experience on Google.
          </p>
          <a
            href={GOOGLE_REVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-medium text-brand transition-all duration-300 hover:bg-paper hover:shadow-lg"
          >
            Leave a Google review <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>
    </>
  );
}
