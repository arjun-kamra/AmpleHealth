import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { Download } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Notice of Privacy Practices",
  description:
    "AmpleHealth's Notice of Privacy Practices — how your protected health information may be used and disclosed, your rights, and our responsibilities under HIPAA and California law.",
};

// The Notice is held as data rather than JSX so the wording is preserved
// exactly as written, with no escaping or reflowing applied to the source text.
type Block =
  | { kind: "h2"; text: string }
  | { kind: "h3"; text: string }
  | { kind: "p"; text: string }
  | { kind: "bullets"; items: string[] };

const NOTICE: Block[] = [
  {
    kind: "p",
    text: "THIS NOTICE DESCRIBES HOW MEDICAL INFORMATION ABOUT YOU MAY BE USED AND DISCLOSED AND HOW YOU CAN GET ACCESS TO THIS INFORMATION. PLEASE REVIEW IT CAREFULLY.",
  },
  { kind: "h2", text: "Our Commitment to Your Privacy" },
  {
    kind: "p",
    text: "AmpleHealth is committed to protecting the privacy and security of your protected health information (PHI). PHI includes information that identifies you and relates to your past, present, or future physical or mental health or condition, the health care you receive, or payment for that care. This Notice explains how we may use and disclose your PHI, your rights regarding your information, and our responsibilities under the Health Insurance Portability and Accountability Act (HIPAA), the California Confidentiality of Medical Information Act (CMIA), and other applicable federal and California laws.",
  },
  { kind: "h2", text: "Your Rights" },
  {
    kind: "bullets",
    items: [
      "Get an electronic or paper copy of your medical record. You may ask to inspect or obtain an electronic or paper copy of your medical record and other health information we maintain about you. We will provide access within the time required by law and may charge only fees permitted by law.",
      "Ask us to correct your medical record. If you believe information is incorrect or incomplete, you may ask us to amend it. We may deny the request in certain circumstances, but we will explain the reason in writing.",
      "Request confidential communications. You may ask us to contact you in a specific way, such as at a particular phone number, email address, or mailing address. We will accommodate reasonable requests as required by law.",
      "Ask us to limit what we use or share. You may ask us not to use or disclose certain PHI for treatment, payment, or health care operations. We are not required to agree to every request. If you pay in full out of pocket for a service or item and ask us not to disclose information about that service or item to your health plan for payment or health care operations, we will honor the request unless disclosure is required by law.",
      "Get a list of certain disclosures. You may request an accounting of certain disclosures of your PHI made during the six years before your request. The accounting does not include all disclosures, such as many disclosures for treatment, payment, or health care operations.",
      "Get a copy of this Notice. You may request a paper copy at any time, even if you agreed to receive it electronically.",
      "Choose someone to act for you. If you have given someone medical power of attorney, or if someone is your legal guardian or otherwise legally authorized to act for you, that person may exercise your rights as permitted by law.",
      "Receive breach notification. We will notify you as required by law if a breach occurs that may have compromised the privacy or security of your unsecured PHI.",
      "File a complaint. You may complain if you believe your privacy rights have been violated. We will not retaliate against you for filing a complaint.",
    ],
  },
  { kind: "h2", text: "Your Choices" },
  {
    kind: "p",
    text: "For certain health information, you may tell us your preferences about what we share. These choices may include:",
  },
  {
    kind: "bullets",
    items: [
      "Sharing information with family members, close friends, or others involved in your care or payment for your care.",
      "Sharing information in a disaster relief situation.",
      "Receiving fundraising communications, if AmpleHealth conducts fundraising. You may tell us not to contact you again.",
    ],
  },
  {
    kind: "p",
    text: "If you are unable to tell us your preference, for example because you are unconscious, we may share information when we believe it is in your best interest and the disclosure is permitted by law.",
  },
  { kind: "h2", text: "Uses and Disclosures Requiring Your Written Authorization" },
  {
    kind: "p",
    text: "We will obtain your written authorization for uses or disclosures of PHI when required by law. In particular:",
  },
  {
    kind: "bullets",
    items: [
      "Most uses and disclosures of psychotherapy notes require written authorization, subject to limited exceptions permitted by law.",
      "We will not sell your PHI without written authorization when authorization is required by law.",
      "Most uses and disclosures of PHI for marketing require written authorization, subject to exceptions permitted by law.",
      "Other uses and disclosures not described in this Notice will be made only with your written authorization unless otherwise permitted or required by law.",
    ],
  },
  {
    kind: "p",
    text: "You may revoke an authorization in writing at any time, except to the extent that we have already acted in reliance on it.",
  },
  { kind: "h2", text: "How We Typically Use and Share Your Health Information" },
  { kind: "h3", text: "Treatment" },
  {
    kind: "p",
    text: "We may use your PHI and share it with physicians, nurses, specialists, laboratories, pharmacies, hospitals, therapists, and other health care professionals involved in your care.",
  },
  { kind: "h3", text: "Payment" },
  {
    kind: "p",
    text: "We may use and disclose PHI to bill for services and obtain payment from you, your health plan, Medicare, Medi-Cal, or another payer.",
  },
  { kind: "h3", text: "Health Care Operations" },
  {
    kind: "p",
    text: "We may use and disclose PHI to operate our practice, coordinate care, improve quality, train staff, conduct compliance activities, evaluate performance, manage services, and contact you when necessary.",
  },
  { kind: "h3", text: "Appointments, Results, Referrals, and Health-Related Services" },
  {
    kind: "p",
    text: "We may contact you about appointments, test results, referrals, treatment alternatives, follow-up care, preventive services, and other health-related services that may be of interest to you.",
  },
  { kind: "h3", text: "Business Associates" },
  {
    kind: "p",
    text: "We may share PHI with vendors and service providers that perform functions for us, such as billing, electronic health records, technology, records management, analytics, and clinical documentation support. When required, these organizations must protect PHI under written agreements and applicable law.",
  },
  { kind: "h2", text: "Other Uses and Disclosures Permitted or Required by Law" },
  { kind: "h3", text: "Public Health and Safety" },
  {
    kind: "p",
    text: "We may disclose PHI for legally authorized public health activities, including preventing disease, reporting certain communicable diseases, product recalls, adverse reactions to medications, suspected abuse or neglect, and preventing or reducing a serious threat to health or safety.",
  },
  { kind: "h3", text: "Health Oversight" },
  {
    kind: "p",
    text: "We may disclose PHI to authorized health oversight agencies for audits, investigations, inspections, licensure, disciplinary actions, and other activities permitted by law.",
  },
  { kind: "h3", text: "Research" },
  {
    kind: "p",
    text: "We may use or disclose PHI for research when the research has been approved through a process that meets applicable legal requirements, or when your authorization or another lawful basis permits it.",
  },
  { kind: "h3", text: "Complying With the Law" },
  {
    kind: "p",
    text: "We will disclose PHI when federal or California law requires us to do so, including to the U.S. Department of Health and Human Services when it is reviewing our compliance with federal privacy law.",
  },
  { kind: "h3", text: "Organ and Tissue Donation" },
  {
    kind: "p",
    text: "We may disclose PHI to organ procurement organizations or others involved in organ, eye, or tissue donation and transplantation as permitted by law.",
  },
  { kind: "h3", text: "Coroners, Medical Examiners, Funeral Directors, and Deceased Individuals" },
  {
    kind: "p",
    text: "We may disclose PHI to coroners, medical examiners, funeral directors, organ procurement organizations, and, when permitted by law, family members or others who were involved in the deceased individual's care or payment for care.",
  },
  { kind: "h3", text: "Workers' Compensation, Law Enforcement, and Government Requests" },
  {
    kind: "p",
    text: "We may disclose PHI as authorized by workers' compensation laws and for certain law enforcement, military, national security, correctional, and other government purposes when permitted or required by law.",
  },
  { kind: "h3", text: "Lawsuits and Legal Actions" },
  {
    kind: "p",
    text: "We may disclose PHI in response to certain court or administrative orders, subpoenas, discovery requests, or other lawful process, subject to applicable federal and California protections.",
  },
  { kind: "h2", text: "Specially Protected Information and California Privacy Protections" },
  {
    kind: "p",
    text: "California law and other federal laws may provide protections that are more restrictive than HIPAA for certain categories of information. These may include certain mental health and psychotherapy records, substance use disorder records, HIV/AIDS-related information, genetic information, reproductive or sexual health information, and other sensitive medical information. When a more protective law applies, AmpleHealth will follow the applicable additional requirements.",
  },
  {
    kind: "p",
    text: "California law also provides protections concerning confidential communications and certain sensitive services. We will honor applicable California requirements regarding authorization, access, disclosure, and confidential communications.",
  },
  { kind: "h2", text: "Substance Use Disorder Records Protected by 42 CFR Part 2" },
  {
    kind: "p",
    text: "To the extent AmpleHealth creates or maintains substance use disorder patient records that are subject to 42 CFR Part 2, those records receive additional federal confidentiality protections. We will not use or disclose Part 2 records in civil, criminal, administrative, or legislative investigations or proceedings against you without your written consent or a court order and subpoena that meet applicable Part 2 requirements. Additional consent, notice, accounting, fundraising, and redisclosure protections may apply to Part 2 records as required by federal law.",
  },
  { kind: "h2", text: "Telehealth, Electronic Communications, and Technology" },
  {
    kind: "p",
    text: "When we provide services through telehealth or communicate electronically, we use reasonable and appropriate administrative, technical, and physical safeguards to protect your health information as required by applicable law. Electronic communications can carry privacy risks. You may request confidential communications or tell us if you prefer a particular method of communication. Patients should use secure devices and networks whenever possible.",
  },
  {
    kind: "p",
    text: "AmpleHealth may use electronic health record systems and approved technology, including clinical documentation tools, to support patient care and practice operations. Vendors that create, receive, maintain, or transmit PHI on our behalf are required to protect that information as required by applicable law and, when applicable, a Business Associate Agreement.",
  },
  { kind: "h2", text: "Our Responsibilities" },
  {
    kind: "bullets",
    items: [
      "We are required by law to maintain the privacy and security of your PHI.",
      "We must provide you with this Notice of our legal duties and privacy practices and follow the Notice currently in effect.",
      "We will notify you as required by law if a breach occurs that may have compromised the privacy or security of your information.",
      "We will not use or disclose your information other than as described in this Notice unless you authorize us in writing or another law permits or requires the use or disclosure.",
      "We will comply with applicable California privacy and medical-information laws when they provide additional protections.",
    ],
  },
  { kind: "h2", text: "Changes to This Notice" },
  {
    kind: "p",
    text: "We may change the terms of this Notice and make the revised Notice effective for all PHI we maintain, including information created or received before the change. The current Notice will be available upon request, posted in a clear and prominent location at our offices, and prominently available on our website.",
  },
  { kind: "h2", text: "Questions or Complaints" },
  {
    kind: "p",
    text: "If you have questions about this Notice, want to exercise a privacy right, or believe your privacy rights have been violated, please contact AmpleHealth's Privacy Officer. You may also file a complaint with the U.S. Department of Health and Human Services, Office for Civil Rights. AmpleHealth will not retaliate against you for filing a complaint.",
  },
];

const CONTACTS = [
  {
    name: "AmpleHealth Privacy Officer",
    lines: [
      "6620 Coyle Avenue, Suite 202",
      "Carmichael, CA 95608",
      "Phone: 916-966-8500",
      "Fax: 916-966-8555",
    ],
  },
  {
    name: "U.S. Department of Health and Human Services",
    lines: [
      "Office for Civil Rights",
      "200 Independence Avenue, S.W.",
      "Washington, D.C. 20201",
      "Phone: 1-877-696-6775",
    ],
  },
];

const LOCATIONS = [
  "6620 Coyle Avenue, Suite 202, Carmichael, CA 95608 | Phone: 916-966-8500 | Fax: 916-966-8555",
  "3270 Arena Boulevard, Suite 405, Sacramento, CA 95834 | Phone: 916-418-4595 | Fax: 916-418-4594",
];

export default function NoticeOfPrivacyPracticesPage() {
  return (
    <>
      <PageHero
        kicker="Notice of Privacy Practices"
        title="Your Information. Your Rights. Our"
        highlight="Responsibilities."
        description="Effective Date: August 25, 2026"
      />

      <section className="container-page max-w-3xl py-16 md:py-20">
        {/* The Notice itself states a paper copy is available on request, so
            keep the source document one click away. */}
        <a
          href="/AmpleHealth_Notice_of_Privacy_Practices_2026.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost mb-10 inline-flex"
        >
          <Download className="h-4 w-4" aria-hidden="true" />
          Download PDF
        </a>

        {NOTICE.map((block, i) => {
          if (block.kind === "h2") {
            return (
              <h2
                key={i}
                className="mt-12 text-2xl font-semibold leading-tight tracking-tight text-ink first:mt-0 md:text-3xl"
              >
                {block.text}
              </h2>
            );
          }
          if (block.kind === "h3") {
            return (
              <h3 key={i} className="mt-8 text-lg font-semibold text-ink">
                {block.text}
              </h3>
            );
          }
          if (block.kind === "bullets") {
            return (
              <ul key={i} className="mt-4 space-y-3">
                {block.items.map((item) => (
                  <li key={item} className="flex gap-3 text-pretty leading-relaxed text-ink-muted">
                    <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-brand" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            );
          }
          // The all-caps HIPAA statement leads the document; give it emphasis.
          const isLead = i === 0;
          return (
            <p
              key={i}
              className={
                isLead
                  ? "card-surface p-6 text-sm font-medium leading-relaxed tracking-wide text-ink-soft md:p-7"
                  : "mt-4 text-pretty leading-relaxed text-ink-muted"
              }
            >
              {block.text}
            </p>
          );
        })}

        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {CONTACTS.map((c) => (
            <div key={c.name} className="card-surface p-6">
              <p className="font-semibold text-ink">{c.name}</p>
              <div className="mt-2 space-y-0.5 text-sm leading-relaxed text-ink-muted">
                {c.lines.map((l) => (
                  <p key={l}>{l}</p>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="mt-6 text-pretty leading-relaxed text-ink-muted">
          Email: hello@ample.health &nbsp;|&nbsp; Website: www.amplehealth.com
        </p>

        <h2 className="mt-12 text-2xl font-semibold leading-tight tracking-tight text-ink md:text-3xl">
          AmpleHealth Locations Covered by This Notice
        </h2>
        <ul className="mt-4 space-y-3">
          {LOCATIONS.map((l) => (
            <li key={l} className="flex gap-3 text-pretty leading-relaxed text-ink-muted">
              <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-brand" />
              <span>{l}</span>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
