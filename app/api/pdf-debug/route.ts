import { NextResponse } from "next/server";
import { PDFDocument } from "pdf-lib";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

// GET /api/pdf-debug?template=patient-intake.pdf
// Reports page count and per-page dimensions so coordinates can be calculated.
// Without ?template, lists the available template files.
export async function GET(req: Request) {
  const templatesDir = path.join(
    process.cwd(),
    "public",
    "forms",
    "templates"
  );

  const { searchParams } = new URL(req.url);
  const template = searchParams.get("template");

  if (!template) {
    let available: string[] = [];
    try {
      available = fs
        .readdirSync(templatesDir)
        .filter((f) => f.toLowerCase().endsWith(".pdf"));
    } catch {
      available = [];
    }
    return NextResponse.json({
      message:
        "Pass ?template=<file>.pdf to inspect a template's page dimensions.",
      templatesDir,
      available,
    });
  }

  // Guard against path traversal — only allow a bare filename.
  if (template.includes("/") || template.includes("..")) {
    return NextResponse.json(
      { error: "Invalid template name." },
      { status: 400 }
    );
  }

  const templatePath = path.join(templatesDir, template);
  try {
    const bytes = fs.readFileSync(templatePath);
    const pdfDoc = await PDFDocument.load(bytes);
    const pages = pdfDoc.getPages().map((p, i) => {
      const { width, height } = p.getSize();
      return { page: i, width, height };
    });
    return NextResponse.json({ template, pageCount: pages.length, pages });
  } catch (e) {
    return NextResponse.json(
      {
        error: "Could not read template.",
        detail: e instanceof Error ? e.message : String(e),
        templatePath,
      },
      { status: 404 }
    );
  }
}
