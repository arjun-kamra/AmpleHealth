import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import fs from "fs";
import path from "path";

export type FieldPosition = {
  page: number;
  x: number;
  y: number;
  size?: number;
};

export type FormFieldMap = {
  template: string;
  fields: Record<string, FieldPosition>;
};

/**
 * Loads a PDF template from /public/forms/templates and stamps the provided
 * values onto it at the coordinates defined in `positions`.
 *
 * PDF coordinates originate at the bottom-left corner (0,0).
 */
export async function fillPDF(
  templateName: string,
  positions: Record<string, FieldPosition>,
  values: Record<string, string>
): Promise<Uint8Array> {
  const templatePath = path.join(
    process.cwd(),
    "public",
    "forms",
    "templates",
    templateName
  );
  const existingPdfBytes = fs.readFileSync(templatePath);
  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const pages = pdfDoc.getPages();

  for (const [key, position] of Object.entries(positions)) {
    const value = values[key];
    if (!value) continue;
    const page = pages[position.page];
    if (!page) continue;
    page.drawText(String(value), {
      x: position.x,
      y: position.y,
      size: position.size ?? 10,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    });
  }

  return pdfDoc.save();
}
