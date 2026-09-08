/**
 * Adds an AcroForm overlay to the California EMSA POLST form (EMSA #111 B,
 * effective 4/1/2017).
 *
 *   node scripts/make-polst-fillable.ts
 *
 * Reads  public/documents/polst-source.pdf     (2-page scan, no fields)
 * Writes public/documents/polst-fillable.pdf
 *
 * THE FORM IS NOT REDRAWN
 * Each page of the source is a single flattened image — the bright pink is part
 * of that scan. This script only adds field widgets on top, so the pink, the
 * EMSA seal and the exact 2017 wording are preserved byte for byte.
 *
 * WHERE THE COORDINATES CAME FROM
 * There is no text layer to query, so the geometry was measured off a 150 DPI
 * render of the scan (1275 x 1650 px, 0.48 pt/px) by detecting the printed
 * rules and the empty checkbox squares, then converted to points. Every field
 * was re-rendered and read back before being committed.
 *
 * NO SIGNATURE FIELDS
 * A POLST is only valid with a wet signature from both the provider and the
 * patient or decisionmaker, so the "Physician/NP/PA Signature: (required)" and
 * "Signature: (required)" cells are deliberately left as blank paper. The dates
 * beside them are fillable.
 */

import { readFileSync, writeFileSync } from "node:fs";
import {
  PDFCheckBox,
  PDFDict,
  PDFDocument,
  PDFFont,
  PDFName,
  PDFRadioGroup,
  PDFString,
  PDFTextField,
  StandardFonts,
} from "pdf-lib";

const SRC = "public/documents/polst-source.pdf";
const OUT = "public/documents/polst-fillable.pdf";

/** The scan's page box — slightly short of US Letter, which is how it arrived. */
const PAGE_H = 791.7;

type Rect = { x: number; y: number; width: number; height: number };

/**
 * A field that fills the lower part of a ruled table cell. The printed label
 * sits in the top-left of each cell, so the widget hangs off the cell's bottom
 * rule and leaves the label clear.
 */
function cell(x: number, width: number, rowBottom: number): Rect {
  return {
    x: x + 3,
    y: PAGE_H - rowBottom + 3,
    width: width - 6,
    height: 11,
  };
}

/** A field that sits on a printed fill-in rule running from x to x + width. */
function onRule(x: number, width: number, ruleY: number): Rect {
  return { x, y: PAGE_H - ruleY + 1.5, width, height: 12 };
}

/** A widget covering a printed checkbox square whose bottom edge is at yBot. */
function box(x: number, yBot: number, size = 9): Rect {
  return { x, y: PAGE_H - yBot, width: size, height: size };
}

type Field = { name: string; page: number; rect: Rect; multiline?: boolean };

// ── Page 1 ─────────────────────────────────────────────────────────────────
// Header table: columns break at 332.6 / 457.4 / 583.7 pt. Its top border is
// at 49.4 pt and the row bottoms are 72.9 / 96.4 / 121.4 pt — the top border is
// NOT the first row's bottom, which is the mistake that first shifted every
// header field up by one row.
const HEADER_L = 332.6;
const HEADER_M = 457.4;
const HEADER_R = 583.7;
const LW = HEADER_M - HEADER_L;
const RW = HEADER_R - HEADER_M;

const TEXT_FIELDS: Field[] = [
  { name: "patient_last_name", page: 1, rect: cell(HEADER_L, LW, 72.9) },
  { name: "date_form_prepared", page: 1, rect: cell(HEADER_M, RW, 72.9) },
  { name: "patient_first_name", page: 1, rect: cell(HEADER_L, LW, 96.4) },
  { name: "patient_dob", page: 1, rect: cell(HEADER_M, RW, 96.4) },
  { name: "patient_middle_name", page: 1, rect: cell(HEADER_L, LW, 121.4) },
  { name: "medical_record_number", page: 1, rect: cell(HEADER_M, RW, 121.4) },

  // Section B "Additional Orders:" — two printed rules. One multiline box
  // spans both, indented past the label so it clears "Additional Orders:".
  {
    name: "section_b_additional_orders",
    page: 1,
    rect: { x: 161, y: PAGE_H - 426, width: 412, height: 31 },
    multiline: true,
  },

  // Section C "Additional Orders:" — three physically separate rules of
  // different widths, so they are three fields rather than one wrapped box.
  { name: "section_c_additional_orders_1", page: 1, rect: onRule(423.8, 149.8, 460.2) },
  { name: "section_c_additional_orders_2", page: 1, rect: onRule(338.9, 233.3, 474.6) },
  { name: "section_c_additional_orders_3", page: 1, rect: onRule(338.4, 233.3, 489.5) },

  // Section D
  { name: "advance_directive_date", page: 1, rect: onRule(182.9, 34.1, 540.8) },
  { name: "health_care_agent_name", page: 1, rect: onRule(368.2, 203.0, 553.7) },
  { name: "health_care_agent_phone", page: 1, rect: onRule(373.0, 198.2, 566.7) },

  // Same off-by-one trap as the header: 594.0 is the rule ABOVE this row.
  { name: "physician_name", page: 1, rect: cell(64.3, 232.3, 617.6) },
  { name: "physician_phone", page: 1, rect: cell(296.6, 120.5, 617.6) },
  { name: "physician_license", page: 1, rect: cell(417.1, 159.9, 617.6) },
  // The signature cell beside this one is intentionally left empty.
  { name: "physician_signature_date", page: 1, rect: cell(417.1, 159.9, 641.1) },

  { name: "decisionmaker_print_name", page: 1, rect: cell(61.9, 337.0, 696.7) },
  { name: "decisionmaker_relationship", page: 1, rect: cell(398.9, 176.6, 696.7) },
  // Likewise: the decisionmaker's signature cell stays blank.
  { name: "decisionmaker_signature_date", page: 1, rect: cell(277.0, 121.9, 720.2) },
  { name: "decisionmaker_address", page: 1, rect: cell(61.4, 215.6, 743.7) },
  { name: "decisionmaker_phone", page: 1, rect: cell(277.0, 121.4, 743.7) },

  // ── Page 2 ───────────────────────────────────────────────────────────────
  { name: "patient_name", page: 2, rect: cell(20.6, 339.4, 82.5) },
  { name: "patient_dob_p2", page: 2, rect: cell(360.0, 123.4, 82.5) },
  { name: "supervising_physician_name", page: 2, rect: cell(19.7, 279.8, 119.5) },
  { name: "preparer_name_title", page: 2, rect: cell(299.5, 166.6, 119.5) },
  { name: "preparer_phone", page: 2, rect: cell(466.1, 108.0, 119.5) },
  { name: "additional_contact_name", page: 2, rect: cell(19.7, 239.5, 159.8) },
  { name: "additional_contact_relationship", page: 2, rect: cell(259.2, 158.9, 159.8) },
  { name: "additional_contact_phone", page: 2, rect: cell(418.1, 156.5, 159.8) },
];

// Standalone checkboxes — not part of any "Check One" group.
const CHECKBOXES: Field[] = [
  { name: "trial_period_full_treatment", page: 1, rect: box(170.4, 265.4, 9.6) },
  { name: "selective_transfer_if_comfort_unmet", page: 1, rect: box(169.4, 333.1, 9.6) },

  { name: "discussed_with_patient", page: 1, rect: box(178.0, 523.2, 8) },
  { name: "discussed_with_decisionmaker", page: 1, rect: box(339.2, 523.2, 8) },
  { name: "advance_directive_dated", page: 1, rect: box(72.0, 539.9, 8) },
  { name: "advance_directive_not_available", page: 1, rect: box(71.6, 552.9, 8) },
  { name: "no_advance_directive", page: 1, rect: box(71.6, 565.9, 8) },

  { name: "additional_contact_none", page: 2, rect: box(188.6, 131.4, 8) },
];

const RADIO_GROUPS: {
  name: string;
  options: { value: string; page: number; rect: Rect }[];
}[] = [
  {
    name: "section_a",
    options: [
      { value: "attempt_cpr", page: 1, rect: box(74.9, 164.6, 9.6) },
      { value: "dnr", page: 1, rect: box(74.9, 183.8, 9.6) },
    ],
  },
  {
    name: "section_b",
    options: [
      { value: "full_treatment", page: 1, rect: box(74.9, 222.2, 9.6) },
      { value: "selective_treatment", page: 1, rect: box(74.9, 282.7, 9.6) },
      { value: "comfort_focused", page: 1, rect: box(74.4, 350.4, 9.6) },
    ],
  },
  {
    name: "section_c",
    options: [
      { value: "long_term_artificial_nutrition", page: 1, rect: box(73.5, 457.4, 8) },
      { value: "trial_artificial_nutrition", page: 1, rect: box(73.0, 471.8, 8) },
      { value: "no_artificial_nutrition", page: 1, rect: box(72.6, 486.6, 8) },
    ],
  },
  {
    // The form prints bare "M" and "F" letters here rather than boxes, so the
    // widgets sit just to the left of each letter and leave it readable.
    name: "gender",
    options: [
      { value: "M", page: 2, rect: box(510.0, 79.5, 9) },
      { value: "F", page: 2, rect: box(539.0, 79.5, 9) },
    ],
  },
];

/**
 * pdf-lib writes each field's /DA as "/Helvetica <size> Tf" but never adds a
 * /DR (default resources) entry to the AcroForm, so that font name resolves to
 * nothing. The appearance streams generated here still render, because each
 * carries its own /Resources — but the moment someone actually types into a
 * field the viewer regenerates the appearance from /DA and has no font to look
 * up. Registering the embedded Helvetica under exactly the name /DA uses, plus
 * a document-level /DA, is what makes typing work in Acrobat and Preview
 * rather than silently producing empty or mis-styled text.
 */
function registerFormFont(doc: PDFDocument, font: PDFFont) {
  const acro = doc.catalog.lookup(PDFName.of("AcroForm"), PDFDict);
  acro.set(PDFName.of("DA"), PDFString.of("/Helvetica 0 Tf 0 g"));
  acro.set(
    PDFName.of("DR"),
    doc.context.obj({ Font: doc.context.obj({ Helvetica: font.ref }) })
  );
}

async function main() {
  const doc = await PDFDocument.load(readFileSync(SRC));
  const form = doc.getForm();
  const helvetica = await doc.embedFont(StandardFonts.Helvetica);
  const pages = doc.getPages();

  for (const f of TEXT_FIELDS) {
    const field = form.createTextField(f.name);
    if (f.multiline) field.enableMultiline();
    field.addToPage(pages[f.page - 1], { ...f.rect, borderWidth: 0 });
    field.setFontSize(9);
  }

  for (const c of CHECKBOXES) {
    const field = form.createCheckBox(c.name);
    field.addToPage(pages[c.page - 1], { ...c.rect, borderWidth: 0 });
  }

  for (const group of RADIO_GROUPS) {
    const field = form.createRadioGroup(group.name);
    for (const option of group.options) {
      field.addOptionToPage(option.value, pages[option.page - 1], {
        ...option.rect,
        borderWidth: 0,
      });
    }
  }

  // Every page here is a pink scanned image. pdf-lib gives each widget an
  // opaque white background by default, which would punch white rectangles
  // straight through the pink. Dropping /MK and regenerating leaves the
  // widgets transparent so the scan shows through untouched.
  for (const field of form.getFields()) {
    for (const widget of field.acroField.getWidgets()) {
      widget.dict.delete(PDFName.of("MK"));
    }
    if (field instanceof PDFTextField) field.defaultUpdateAppearances(helvetica);
    else if (field instanceof PDFCheckBox) field.defaultUpdateAppearances();
    else if (field instanceof PDFRadioGroup) field.defaultUpdateAppearances();
  }

  registerFormFont(doc, helvetica);

  writeFileSync(OUT, await doc.save());
  console.log(`Wrote ${OUT}`);
  console.log(`  ${form.getFields().length} fields`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
