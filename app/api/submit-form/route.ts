import { Resend } from "resend";
import { NextResponse } from "next/server";
import { generateFormPDF } from "@/lib/pdf-generator";

export const dynamic = "force-dynamic";

// Escape user-provided text so it renders safely inside the HTML email.
function esc(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

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

  // Generate a PDF from scratch for this form type. If anything fails, log it
  // and continue — the email still goes out with the data table.
  let pdfAttachment: string | null = null;
  try {
    const pdfBytes = await generateFormPDF(formType, formData);
    if (pdfBytes) {
      pdfAttachment = Buffer.from(pdfBytes).toString("base64");
    }
  } catch (e) {
    console.error(
      "submit-form: PDF generation failed:",
      e instanceof Error ? e.message : e
    );
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
