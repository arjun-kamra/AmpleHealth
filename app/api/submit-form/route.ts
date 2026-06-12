import { Resend } from "resend";
import { NextResponse } from "next/server";
import { fillPDF, type FormFieldMap } from "@/lib/pdf-generator";

export const dynamic = "force-dynamic";

// Escape user-provided text so it renders safely inside the HTML email.
function esc(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Maps each form type to its PDF template and the coordinates where each
// field value should be stamped. PDF coordinates start at the bottom-left
// corner (0,0). Adjust x/y here if text lands in the wrong place — use the
// /api/pdf-debug route to read a template's page dimensions.
const FORM_FIELD_MAPS: Record<string, FormFieldMap> = {
  "New Patient Intake Form": {
    template: "patient-intake.pdf",
    fields: {
      "First Name": { page: 0, x: 155, y: 658, size: 10 },
      "Last Name": { page: 0, x: 300, y: 658, size: 10 },
      "Date of Birth": { page: 0, x: 155, y: 640, size: 10 },
      Sex: { page: 0, x: 350, y: 640, size: 10 },
      "Social Security": { page: 0, x: 155, y: 622, size: 10 },
      Email: { page: 0, x: 350, y: 622, size: 10 },
      Race: { page: 0, x: 155, y: 604, size: 10 },
      Ethnicity: { page: 0, x: 155, y: 586, size: 10 },
      "Preferred Language": { page: 0, x: 155, y: 568, size: 10 },
      "Street Address": { page: 0, x: 155, y: 540, size: 10 },
      City: { page: 0, x: 155, y: 522, size: 10 },
      State: { page: 0, x: 300, y: 522, size: 10 },
      "ZIP Code": { page: 0, x: 370, y: 522, size: 10 },
      "Home Phone": { page: 1, x: 155, y: 720, size: 10 },
      "Work Phone": { page: 1, x: 320, y: 720, size: 10 },
      "Cell Phone": { page: 1, x: 155, y: 702, size: 10 },
      Employer: { page: 1, x: 155, y: 684, size: 10 },
      Occupation: { page: 1, x: 155, y: 666, size: 10 },
      "Emergency Contact Name": { page: 1, x: 155, y: 580, size: 10 },
      "Emergency Contact Relationship": { page: 1, x: 155, y: 562, size: 10 },
      "Emergency Contact Phone": { page: 1, x: 155, y: 544, size: 10 },
      "Insurance Provider": { page: 2, x: 155, y: 720, size: 10 },
      "Member ID": { page: 2, x: 155, y: 702, size: 10 },
      "Group Number": { page: 2, x: 320, y: 702, size: 10 },
      "Policy Holder Name": { page: 2, x: 155, y: 684, size: 10 },
      "Driver's License Number": { page: 2, x: 155, y: 620, size: 10 },
      "Signature (type full legal name)": { page: 2, x: 155, y: 460, size: 10 },
      Date: { page: 2, x: 400, y: 460, size: 10 },
    },
  },
  "Authorization for Release of Medical Information": {
    template: "authorization-release.pdf",
    fields: {
      "Patient Name": { page: 0, x: 155, y: 658, size: 10 },
      "Date of Birth": { page: 0, x: 155, y: 640, size: 10 },
      Phone: { page: 0, x: 350, y: 640, size: 10 },
      Address: { page: 0, x: 155, y: 622, size: 10 },
      "Provider / Facility Name": { page: 0, x: 155, y: 560, size: 10 },
      "Provider Phone": { page: 0, x: 155, y: 542, size: 10 },
      "Provider Fax": { page: 0, x: 320, y: 542, size: 10 },
      "Provider Address": { page: 0, x: 155, y: 524, size: 10 },
      "Signature (type full legal name)": { page: 1, x: 155, y: 400, size: 10 },
      Date: { page: 1, x: 400, y: 400, size: 10 },
    },
  },
  "Notice of Privacy Practices Acknowledgment": {
    template: "privacy-practices.pdf",
    fields: {
      "Patient Name": { page: 3, x: 155, y: 200, size: 10 },
      "Signature (type full legal name)": { page: 3, x: 155, y: 160, size: 10 },
      Date: { page: 3, x: 400, y: 160, size: 10 },
    },
  },
  "No-Show & Late Cancellation Policy Acknowledgment": {
    template: "no-show-policy.pdf",
    fields: {
      "Patient Name": { page: 2, x: 155, y: 240, size: 10 },
      "Signature (type full legal name)": { page: 2, x: 155, y: 200, size: 10 },
      Date: { page: 2, x: 400, y: 200, size: 10 },
    },
  },
  "Patient Partnership Plan Acknowledgment": {
    template: "patient-partnership.pdf",
    fields: {
      "Patient Name": { page: 1, x: 155, y: 200, size: 10 },
      "Signature (type full legal name)": { page: 1, x: 155, y: 160, size: 10 },
      Date: { page: 1, x: 400, y: 160, size: 10 },
    },
  },
  "Telemedicine Consent Agreement": {
    template: "telemedicine-consent.pdf",
    fields: {
      "Patient Name": { page: 1, x: 155, y: 200, size: 10 },
      "Signature (type full legal name)": { page: 1, x: 155, y: 160, size: 10 },
      Date: { page: 1, x: 400, y: 160, size: 10 },
    },
  },
};

export async function POST(req: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("submit-form: RESEND_API_KEY is not configured.");
    return NextResponse.json(
      { error: "Email service is not configured." },
      { status: 500 }
    );
  }

  let formType: string;
  let formData: Record<string, unknown>;
  try {
    const body = await req.json();
    formType = body.formType;
    formData = body.formData ?? {};
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 }
    );
  }

  if (!formType || typeof formData !== "object") {
    return NextResponse.json(
      { error: "Missing formType or formData." },
      { status: 400 }
    );
  }

  // Attempt to generate a filled PDF. If the template is missing or anything
  // fails, log it and continue — the email still goes out with the data table.
  let pdfAttachment: string | null = null;
  const formMap = FORM_FIELD_MAPS[formType];
  if (formMap) {
    try {
      const stringValues: Record<string, string> = {};
      for (const [k, v] of Object.entries(formData)) {
        stringValues[k] = String(v ?? "");
      }
      const pdfBytes = await fillPDF(
        formMap.template,
        formMap.fields,
        stringValues
      );
      pdfAttachment = Buffer.from(pdfBytes).toString("base64");
    } catch (e) {
      console.error(
        "submit-form: PDF generation failed (template missing or invalid):",
        e instanceof Error ? e.message : e
      );
    }
  }

  const fieldsList = Object.entries(formData)
    .map(
      ([key, value]) =>
        `<tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:500;width:220px;vertical-align:top">${esc(
          key
        )}</td><td style="padding:8px;border-bottom:1px solid #eee">${
          esc(value) || "—"
        }</td></tr>`
    )
    .join("");

  const resend = new Resend(apiKey);

  const emailPayload: Parameters<typeof resend.emails.send>[0] = {
    from: "AmpleHealth Forms <onboarding@resend.dev>",
    to: "dkamra99@gmail.com",
    subject: `New Form Submission: ${formType}`,
    html: `
        <div style="font-family:sans-serif;max-width:640px;margin:0 auto">
          <div style="background:#1B75BB;padding:20px;border-radius:8px 8px 0 0">
            <h1 style="color:white;margin:0;font-size:20px">AmpleHealth — New Form Submission</h1>
            <p style="color:#E8F4FD;margin:4px 0 0">Form: ${esc(formType)}</p>
          </div>
          <table style="width:100%;border-collapse:collapse;background:white;border:1px solid #eee;border-top:none">
            ${fieldsList}
          </table>
          <p style="color:#666;font-size:12px;padding:16px">Submitted on ${new Date().toLocaleString()}</p>
        </div>
      `,
  };

  if (pdfAttachment) {
    emailPayload.attachments = [
      {
        filename: `${formType
          .replace(/[^a-z0-9]/gi, "-")
          .toLowerCase()}-${Date.now()}.pdf`,
        content: pdfAttachment,
      },
    ];
  }

  try {
    await resend.emails.send(emailPayload);
  } catch (e) {
    console.error(
      "submit-form Resend error:",
      e instanceof Error ? e.message : e
    );
    return NextResponse.json(
      { error: "Failed to send the form. Please try again." },
      { status: 502 }
    );
  }

  return NextResponse.json({ success: true });
}
