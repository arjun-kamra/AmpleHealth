import { PDFDocument, PDFFont, PDFPage, StandardFonts, rgb } from "pdf-lib";

// US Letter, 50px margins.
const PAGE_W = 612;
const PAGE_H = 792;
const MARGIN = 50;
const CONTENT_W = PAGE_W - MARGIN * 2;

const BRAND = rgb(27 / 255, 117 / 255, 187 / 255); // #1B75BB
const GRAY = rgb(0.4, 0.4, 0.4); // #666666 labels
const LIGHT = rgb(0.95, 0.95, 0.95); // value box background
const LINE = rgb(0.8, 0.8, 0.8); // dividers
const BLACK = rgb(0, 0, 0);
const TEXT = rgb(0.13, 0.13, 0.13); // body copy

// Strip characters the WinAnsi-encoded standard fonts can't render so user
// input never crashes PDF generation.
function safe(s: string): string {
  return s
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/\u2026/g, "...")
    .replace(/[\r\n\t]+/g, " ")
    .replace(/[\u0080-\u009F]/g, "")
    .replace(/[^\x20-\x7E\xA0-\xFF]/g, "");
}

type FieldItem = { label: string; value: string };

class FormDoc {
  page!: PDFPage;
  y = 0;

  private constructor(
    readonly doc: PDFDocument,
    readonly font: PDFFont,
    readonly bold: PDFFont,
    readonly title: string
  ) {}

  static async create(title: string): Promise<FormDoc> {
    const doc = await PDFDocument.create();
    const font = await doc.embedFont(StandardFonts.Helvetica);
    const bold = await doc.embedFont(StandardFonts.HelveticaBold);
    const fd = new FormDoc(doc, font, bold, title);
    fd.addPage();
    return fd;
  }

  private addPage() {
    this.page = this.doc.addPage([PAGE_W, PAGE_H]);
    this.drawHeader();
    this.y = 646;
  }

  private drawHeader() {
    const p = this.page;
    p.drawText("ampleHealth", {
      x: MARGIN,
      y: PAGE_H - 68,
      size: 24,
      font: this.bold,
      color: BRAND,
    });
    p.drawText("COMMITTED CARE \u00B7 CONNECTED CARE", {
      x: MARGIN,
      y: 710,
      size: 8,
      font: this.font,
      color: GRAY,
    });
    p.drawText(
      "6620 Coyle Avenue, Suite 202, Carmichael, CA 95608   |   Ph: 916-966-8500",
      { x: MARGIN, y: 698, size: 8, font: this.font, color: GRAY }
    );
    p.drawLine({
      start: { x: MARGIN, y: 690 },
      end: { x: PAGE_W - MARGIN, y: 690 },
      thickness: 1,
      color: LINE,
    });
    p.drawText(this.title, {
      x: MARGIN,
      y: 670,
      size: 14,
      font: this.bold,
      color: BLACK,
    });
  }

  private ensure(needed: number) {
    if (this.y - needed < MARGIN) this.addPage();
  }

  private clip(text: string, size: number, maxW: number): string {
    if (this.font.widthOfTextAtSize(text, size) <= maxW) return text;
    let s = text;
    while (s.length && this.font.widthOfTextAtSize(s + "...", size) > maxW) {
      s = s.slice(0, -1);
    }
    return s + "...";
  }

  private wrap(text: string, font: PDFFont, size: number, maxW: number): string[] {
    const words = safe(text).split(/\s+/).filter(Boolean);
    const lines: string[] = [];
    let cur = "";
    for (const w of words) {
      const test = cur ? `${cur} ${w}` : w;
      if (font.widthOfTextAtSize(test, size) <= maxW) {
        cur = test;
        continue;
      }
      if (cur) lines.push(cur);
      if (font.widthOfTextAtSize(w, size) > maxW) {
        let chunk = "";
        for (const ch of w) {
          if (font.widthOfTextAtSize(chunk + ch, size) <= maxW) chunk += ch;
          else {
            if (chunk) lines.push(chunk);
            chunk = ch;
          }
        }
        cur = chunk;
      } else {
        cur = w;
      }
    }
    if (cur) lines.push(cur);
    return lines;
  }

  /** #1B75BB bold section header with a gray rule underneath. */
  section(title: string) {
    this.y -= 20;
    this.ensure(30);
    this.page.drawText(title, {
      x: MARGIN,
      y: this.y - 11,
      size: 11,
      font: this.bold,
      color: BRAND,
    });
    this.page.drawLine({
      start: { x: MARGIN, y: this.y - 15 },
      end: { x: PAGE_W - MARGIN, y: this.y - 15 },
      thickness: 0.5,
      color: LINE,
    });
    this.y -= 26;
  }

  /** A row of one or more labelled fields, values on light gray boxes. */
  fields(items: FieldItem[]) {
    this.ensure(34);
    const n = items.length;
    const gap = 12;
    const colW = (CONTENT_W - gap * (n - 1)) / n;
    items.forEach((it, i) => {
      const x = MARGIN + i * (colW + gap);
      this.page.drawText(it.label, {
        x,
        y: this.y - 9,
        size: 9,
        font: this.font,
        color: GRAY,
      });
      const boxTop = this.y - 12;
      const boxH = 16;
      this.page.drawRectangle({
        x,
        y: boxTop - boxH,
        width: colW,
        height: boxH,
        color: LIGHT,
      });
      const val = it.value ? safe(it.value) : "\u2014";
      this.page.drawText(this.clip(val, 10, colW - 8), {
        x: x + 4,
        y: boxTop - 12,
        size: 10,
        font: this.font,
        color: BLACK,
      });
    });
    this.y -= 34;
  }

  /** A checked statement (✓ drawn as vector lines). */
  check(text: string) {
    const lines = this.wrap(text, this.font, 9, CONTENT_W - 22);
    this.ensure(lines.length * 12 + 6);
    const cy = this.y - 9;
    this.page.drawLine({
      start: { x: MARGIN + 1, y: cy + 1 },
      end: { x: MARGIN + 4, y: cy - 3 },
      thickness: 1.5,
      color: BRAND,
    });
    this.page.drawLine({
      start: { x: MARGIN + 4, y: cy - 3 },
      end: { x: MARGIN + 9, y: cy + 5 },
      thickness: 1.5,
      color: BRAND,
    });
    lines.forEach((ln, idx) => {
      this.page.drawText(ln, {
        x: MARGIN + 18,
        y: cy - idx * 12,
        size: 9,
        font: this.font,
        color: TEXT,
      });
    });
    this.y -= lines.length * 12 + 6;
  }

  /** Small bold sub-heading inside policy text. */
  subhead(text: string) {
    this.y -= 6;
    this.ensure(16);
    this.page.drawText(safe(text), {
      x: MARGIN,
      y: this.y - 10,
      size: 10,
      font: this.bold,
      color: BLACK,
    });
    this.y -= 16;
  }

  paragraph(text: string, size = 9, lh = 13) {
    const lines = this.wrap(text, this.font, size, CONTENT_W);
    for (const ln of lines) {
      this.ensure(lh);
      this.page.drawText(ln, {
        x: MARGIN,
        y: this.y - size,
        size,
        font: this.font,
        color: TEXT,
      });
      this.y -= lh;
    }
    this.y -= 4;
  }

  save() {
    return this.doc.save();
  }
}

// ---------------------------------------------------------------------------
// Static content embedded so the PDF is self-contained (the form pages only
// submit Yes/No for these, not the statement text).
// ---------------------------------------------------------------------------

const INTAKE_AUTHORIZATIONS = [
  "I authorize AmpleHealth to treat me and provide medical care.",
  "I authorize the release of my medical information to my insurance company for billing.",
  "I authorize AmpleHealth to bill my insurance on my behalf.",
  "I accept financial responsibility for charges not covered by my insurance.",
  "I authorize AmpleHealth to leave appointment reminders and health messages on my voicemail.",
  "I consent to receive communications by email and text message.",
  "I acknowledge that I have received the Notice of Privacy Practices.",
];

const AUTH_INFO_TYPES = [
  "Complete medical record",
  "Office / progress notes",
  "Lab results",
  "Imaging / radiology reports",
  "Medication list",
  "Immunization records",
  "Billing records",
  "Mental health records",
];

type PolicyBlock = { type: "h" | "p"; text: string };

type AckConfig = {
  title: string;
  policy: PolicyBlock[];
  acknowledgment: string;
  extra?: { key: string; statement: string };
};

const ACK_FORMS: Record<string, AckConfig> = {
  "Notice of Privacy Practices Acknowledgment": {
    title: "Notice of Privacy Practices",
    acknowledgment:
      "I acknowledge that I have received the Notice of Privacy Practices.",
    policy: [
      { type: "h", text: "Summary" },
      {
        type: "p",
        text: "This notice describes how medical information about you may be used and disclosed, and how you can get access to this information. Please review it carefully.",
      },
      { type: "h", text: "How we use your information" },
      {
        type: "p",
        text: "We use and disclose your protected health information for treatment, payment, and health care operations. For example, we may share information with other providers involved in your care, or with your health plan to obtain payment for services.",
      },
      { type: "h", text: "Your rights" },
      {
        type: "p",
        text: "You have the right to inspect and copy your records, request amendments, request restrictions on certain uses and disclosures, request confidential communications, and receive an accounting of certain disclosures.",
      },
      { type: "h", text: "Our responsibilities" },
      {
        type: "p",
        text: "We are required by law to maintain the privacy of your protected health information, to provide you with this notice of our legal duties and privacy practices, and to notify you following a breach of unsecured information.",
      },
    ],
  },
  "No-Show & Late Cancellation Policy Acknowledgment": {
    title: "No-Show & Late Cancellation Policy",
    acknowledgment:
      "I have read and agree to the No-Show & Late Cancellation Policy.",
    policy: [
      {
        type: "p",
        text: "We value your time and ours. So that we can serve every patient well, we ask that you honor your scheduled appointments.",
      },
      { type: "h", text: "24-hour notice" },
      {
        type: "p",
        text: "Please give us at least 24 hours notice if you need to cancel or reschedule an appointment.",
      },
      { type: "h", text: "Late cancellations & no-shows" },
      {
        type: "p",
        text: "Appointments cancelled with less than 24 hours notice, or missed entirely without notice, may be subject to a fee.",
      },
      { type: "h", text: "Late arrivals" },
      {
        type: "p",
        text: "If you arrive more than 15 minutes late, we may need to reschedule your visit to avoid delaying other patients.",
      },
      { type: "h", text: "How to reschedule" },
      {
        type: "p",
        text: "Call the office or use your patient portal to cancel or reschedule as early as possible.",
      },
    ],
  },
  "Patient Partnership Plan Acknowledgment": {
    title: "Patient Partnership Plan",
    acknowledgment:
      "I have read the Patient Partnership Plan and agree to participate as a partner in my care.",
    policy: [
      { type: "h", text: "What you can expect from us" },
      {
        type: "p",
        text: "We will treat you with respect and dignity, listen to your concerns, explain your options in plain language, protect your privacy, and coordinate your care across our team.",
      },
      { type: "h", text: "What we ask of you" },
      {
        type: "p",
        text: "Be honest about your history and symptoms, keep your scheduled appointments, follow the care plan you agree to, take medications as prescribed, and ask questions whenever something is unclear.",
      },
    ],
  },
  "Telemedicine Consent Agreement": {
    title: "Telemedicine Consent Agreement",
    acknowledgment:
      "I consent to receive care from AmpleHealth via telemedicine and understand the information described above.",
    extra: {
      key: "California Confirmation",
      statement:
        "I confirm that I am physically located in the State of California at the time of my telemedicine visit.",
    },
    policy: [
      { type: "h", text: "About telemedicine" },
      {
        type: "p",
        text: "Telemedicine uses secure video, phone, and messaging technology to deliver healthcare when you and your provider are not in the same room.",
      },
      { type: "h", text: "Benefits and limitations" },
      {
        type: "p",
        text: "Telemedicine can improve access to care and convenience. In some cases your provider may determine an in-person visit is necessary. Telemedicine is not appropriate for emergencies - if you are experiencing an emergency, call 911.",
      },
      { type: "h", text: "Privacy & security" },
      {
        type: "p",
        text: "We use technology designed to protect your privacy. As with any electronic communication, there is a small risk that information could be intercepted; we take reasonable steps to minimize this risk.",
      },
      { type: "h", text: "Your rights" },
      {
        type: "p",
        text: "Your consent to telemedicine is voluntary and may be withheld or withdrawn at any time without affecting your right to future care.",
      },
      { type: "h", text: "Location requirement" },
      {
        type: "p",
        text: "AmpleHealth providers are licensed in California. To receive care, you must be physically located in California at the time of your visit.",
      },
    ],
  },
};

// ---------------------------------------------------------------------------
// Public entry point.
// ---------------------------------------------------------------------------

export async function generateFormPDF(
  formType: string,
  formData: Record<string, unknown>
): Promise<Uint8Array | null> {
  const v = (key: string) => String(formData[key] ?? "").trim();
  const isYes = (key: string) => v(key).toLowerCase() === "yes";

  if (formType === "New Patient Intake Form") {
    return buildPatientIntake(v, isYes);
  }
  if (formType === "Authorization for Release of Medical Information") {
    return buildAuthorizationRelease(v, isYes);
  }
  if (ACK_FORMS[formType]) {
    return buildAcknowledgment(ACK_FORMS[formType], v, isYes);
  }
  return null;
}

async function buildPatientIntake(
  v: (k: string) => string,
  isYes: (k: string) => boolean
): Promise<Uint8Array> {
  const d = await FormDoc.create("New Patient Intake Form");

  const fullName = [v("First Name"), v("Last Name")].filter(Boolean).join(" ");

  d.section("Patient Information");
  d.fields([{ label: "Full Name", value: fullName }]);
  d.fields([
    { label: "Date of Birth", value: v("Date of Birth") },
    { label: "Sex", value: v("Sex") },
  ]);
  d.fields([
    { label: "Email", value: v("Email") },
    { label: "Preferred Language", value: v("Preferred Language") },
  ]);

  d.section("Address");
  d.fields([{ label: "Street", value: v("Street Address") }]);
  d.fields([
    { label: "City", value: v("City") },
    { label: "State", value: v("State") },
    { label: "ZIP", value: v("ZIP Code") },
  ]);

  d.section("Contact");
  d.fields([
    { label: "Cell Phone", value: v("Cell Phone") },
    { label: "Home Phone", value: v("Home Phone") },
  ]);
  d.fields([
    { label: "Employer", value: v("Employer") },
    { label: "Occupation", value: v("Occupation") },
  ]);

  d.section("Emergency Contact");
  d.fields([
    { label: "Name", value: v("Emergency Contact Name") },
    { label: "Relationship", value: v("Emergency Contact Relationship") },
  ]);
  d.fields([{ label: "Phone", value: v("Emergency Contact Phone") }]);

  d.section("Insurance");
  d.fields([
    { label: "Provider", value: v("Insurance Provider") },
    { label: "Member ID", value: v("Member ID") },
  ]);
  d.fields([
    { label: "Group Number", value: v("Group Number") },
    { label: "Policy Holder", value: v("Policy Holder Name") },
  ]);

  d.section("Authorizations");
  let anyAuth = false;
  INTAKE_AUTHORIZATIONS.forEach((statement, i) => {
    if (isYes(`Authorization ${i + 1}`)) {
      d.check(statement);
      anyAuth = true;
    }
  });
  if (!anyAuth) d.paragraph("No authorizations were selected.");

  d.section("Signature");
  d.fields([
    { label: "Signature", value: v("Signature (type full legal name)") },
    { label: "Date", value: v("Date") },
  ]);

  return d.save();
}

async function buildAuthorizationRelease(
  v: (k: string) => string,
  isYes: (k: string) => boolean
): Promise<Uint8Array> {
  const d = await FormDoc.create("Authorization for Release of Medical Information");

  d.section("Patient Information");
  d.fields([
    { label: "Patient Name", value: v("Patient Name") },
    { label: "Date of Birth", value: v("Date of Birth") },
  ]);
  d.fields([
    { label: "Phone", value: v("Phone") },
    { label: "Address", value: v("Address") },
  ]);

  d.section("Authorization Direction");
  if (isYes("Authorize Release To")) {
    d.check("I authorize AmpleHealth to RELEASE my information to the party below.");
  }
  if (isYes("Authorize Obtain From")) {
    d.check("I authorize AmpleHealth to OBTAIN my information from the party below.");
  }
  if (!isYes("Authorize Release To") && !isYes("Authorize Obtain From")) {
    d.paragraph("No direction was selected.");
  }

  d.section("Other Party");
  d.fields([
    { label: "Provider / Facility Name", value: v("Provider / Facility Name") },
    { label: "Provider Phone", value: v("Provider Phone") },
  ]);
  d.fields([{ label: "Provider Address", value: v("Provider Address") }]);
  d.fields([
    { label: "Provider Fax", value: v("Provider Fax") },
    { label: "Provider Email", value: v("Provider Email") },
  ]);

  d.section("Information to Release");
  let anyInfo = false;
  for (const label of AUTH_INFO_TYPES) {
    if (isYes(label)) {
      d.check(label);
      anyInfo = true;
    }
  }
  if (!anyInfo) d.paragraph("No information types were selected.");

  d.section("Purpose & Expiration");
  d.fields([{ label: "Purpose of Disclosure", value: v("Purpose of Disclosure") }]);
  d.fields([{ label: "Expiration Date", value: v("Expiration Date") }]);

  d.section("Acknowledgment");
  if (isYes("Right to Revoke Acknowledgment")) {
    d.check(
      "I understand I may revoke this authorization in writing at any time, except to the extent action has already been taken in reliance on it."
    );
  }

  d.section("Signature");
  d.fields([
    { label: "Signature", value: v("Signature (type full legal name)") },
    { label: "Date", value: v("Date") },
  ]);

  const legalName = v("Legal Representative Name");
  if (legalName) {
    d.section("Legal Representative");
    d.fields([
      { label: "Name", value: legalName },
      { label: "Relationship to Patient", value: v("Relationship to Patient") },
    ]);
  }

  return d.save();
}

async function buildAcknowledgment(
  config: AckConfig,
  v: (k: string) => string,
  isYes: (k: string) => boolean
): Promise<Uint8Array> {
  const d = await FormDoc.create(config.title);

  for (const block of config.policy) {
    if (block.type === "h") d.subhead(block.text);
    else d.paragraph(block.text);
  }

  d.section("Acknowledgment");
  d.fields([{ label: "Patient Name", value: v("Patient Name") }]);
  if (isYes("Acknowledgment")) {
    d.check(config.acknowledgment);
  } else {
    d.paragraph(config.acknowledgment);
  }
  if (config.extra && isYes(config.extra.key)) {
    d.check(config.extra.statement);
  }

  d.section("Signature");
  d.fields([
    { label: "Signature", value: v("Signature (type full legal name)") },
    { label: "Date", value: v("Date") },
  ]);

  return d.save();
}
