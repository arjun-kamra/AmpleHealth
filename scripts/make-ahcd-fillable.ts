/**
 * Adds an AcroForm overlay to the Advance Health Care Directive.
 *
 *   node scripts/make-ahcd-fillable.ts
 *
 * Reads  public/documents/advance-health-care-directive.pdf   (flat, no fields)
 * Writes public/documents/advance-health-care-directive-fillable.pdf
 *
 * The source is left untouched — it stays the print-only copy.
 *
 * WHY THE COORDINATES LOOK THE WAY THEY DO
 * The source PDF carries real text, so every blank was located by running
 *   pdftotext -bbox-layout advance-health-care-directive.pdf
 * and reading the bounding box of each underscore run and each "[ ]" pair.
 * Those boxes are top-left origin in PDF points, which is how they are written
 * below; toRect() flips them into pdf-lib's bottom-left origin. Nothing here is
 * eyeballed off a screenshot, but every field was re-rendered and checked
 * against the printed line before being committed.
 *
 * THE DOCUMENT IS TRILINGUAL
 * Each section appears three times — English, Spanish, Russian — asking for the
 * same information. Widgets for the three copies deliberately share one field
 * name, so a patient fills a value once and all three language blocks show it.
 * That is why most entries below list three or more boxes.
 *
 * NO SIGNATURE FIELDS
 * California requires a wet signature witnessed by two people or a notary, so
 * every "Signature:" / "Firma:" / "Подпись:" line and every notary seal area is
 * deliberately left as blank paper. Dates next to those lines are fillable.
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

const SRC = "public/documents/advance-health-care-directive.pdf";
const OUT = "public/documents/advance-health-care-directive-fillable.pdf";

const PAGE_H = 792;

/** A blank as pdftotext reports it: top-left origin, in points. */
type Box = {
  /** 1-based page number, matching the rendered PNGs. */
  page: number;
  xMin: number;
  xMax: number;
  /** Top of the glyph box. */
  yTop: number;
  /** Bottom of the glyph box — the underscore itself sits here. */
  yBot: number;
};

type TextField = {
  name: string;
  boxes: Box[];
  multiline?: boolean;
  /** Point size; 0 means auto-size. Defaults to 10. */
  size?: number;
};

/** Flip a pdftotext box into a pdf-lib rect that sits on top of the line. */
function toRect(b: Box, height: number) {
  return {
    x: b.xMin,
    y: PAGE_H - b.yBot + 1.5,
    width: b.xMax - b.xMin,
    height,
  };
}

const t = (page: number, xMin: number, xMax: number, yTop: number, yBot: number): Box => ({
  page,
  xMin,
  xMax,
  yTop,
  yBot,
});

// ── Single-line text fields ────────────────────────────────────────────────
// Order within each entry: English, Spanish, Russian.
const TEXT_FIELDS: TextField[] = [
  // 1.1 Designation — the patient's own name, reused at 4.2 and at the
  // acknowledgement on the last pages.
  {
    name: "patient_full_name",
    boxes: [
      t(1, 326.7, 497.9, 518.7, 531.0),
      t(1, 356.2, 527.4, 671.1, 683.4),
      t(2, 274.6, 445.7, 157.1, 169.4),
      t(8, 127.0, 298.2, 650.2, 662.5), // 4.2 "Signed by:"
      t(9, 137.4, 308.5, 98.9, 111.2),
      t(9, 134.2, 305.4, 181.1, 193.4),
      t(11, 144.7, 315.9, 628.7, 641.0), // Acknowledgement
      t(12, 180.8, 351.9, 72.4, 84.6),
      t(12, 150.3, 321.5, 154.5, 166.8),
    ],
  },
  {
    name: "agent_name",
    boxes: [
      t(1, 167.7, 338.9, 574.4, 586.7),
      t(2, 222.9, 394.1, 72.4, 84.6),
      t(2, 175.4, 346.6, 212.7, 225.0),
    ],
  },
  {
    name: "agent_relationship",
    boxes: [
      t(1, 72.0, 243.2, 588.9, 601.2),
      t(2, 72.0, 243.2, 86.9, 99.2),
      t(2, 72.0, 243.2, 227.3, 239.6),
    ],
  },
  {
    name: "agent_primary_phone",
    boxes: [
      t(1, 325.0, 496.2, 588.9, 601.2),
      t(2, 339.1, 510.3, 86.9, 99.2),
      t(2, 350.2, 521.4, 227.3, 239.6),
    ],
  },
  {
    name: "agent_alt_phone",
    boxes: [
      t(1, 156.9, 328.1, 603.5, 615.8),
      t(2, 174.7, 345.8, 101.5, 113.7),
      t(2, 210.4, 381.6, 241.8, 254.1),
    ],
  },
  {
    name: "agent_address_street",
    boxes: [
      t(1, 72.0, 246.2, 618.0, 630.3),
      t(2, 72.0, 246.2, 116.0, 128.3),
      t(2, 72.0, 246.2, 256.4, 268.7),
    ],
  },
  {
    name: "agent_address_city",
    boxes: [
      t(1, 249.3, 423.5, 618.0, 630.3),
      t(2, 249.3, 423.5, 116.0, 128.3),
      t(2, 249.3, 423.5, 256.4, 268.7),
    ],
  },
  {
    name: "agent_address_zip",
    boxes: [
      t(1, 447.9, 509.1, 618.0, 630.3),
      t(2, 447.9, 509.1, 116.0, 128.3),
      t(2, 447.9, 509.1, 256.4, 268.7),
    ],
  },

  // 1.2 Alternate agent
  {
    name: "alt_agent_name",
    boxes: [
      t(2, 214.8, 385.9, 350.6, 362.8),
      t(2, 277.9, 449.1, 461.8, 474.1),
      t(2, 264.0, 435.2, 602.2, 614.5),
    ],
  },
  {
    name: "alt_agent_relationship",
    boxes: [
      t(2, 72.0, 243.2, 365.1, 377.4),
      t(2, 122.1, 293.3, 476.4, 488.7),
      t(2, 72.0, 243.2, 616.7, 629.0),
    ],
  },
  {
    name: "alt_agent_primary_phone",
    boxes: [
      t(2, 325.0, 496.2, 365.1, 377.4),
      t(2, 72.0, 243.2, 490.9, 503.2),
      t(2, 350.2, 521.4, 616.7, 629.0),
    ],
  },
  {
    name: "alt_agent_alt_phone",
    boxes: [
      t(2, 156.9, 328.1, 379.6, 391.9),
      t(2, 348.9, 520.1, 490.9, 503.2),
      t(2, 210.4, 381.6, 631.3, 643.6),
    ],
  },
  {
    name: "alt_agent_address_street",
    boxes: [
      t(2, 72.0, 246.2, 394.2, 406.5),
      t(2, 123.9, 298.2, 505.5, 517.8),
      t(2, 72.0, 246.2, 645.8, 658.1),
    ],
  },
  {
    name: "alt_agent_address_city",
    boxes: [
      t(2, 249.3, 423.5, 394.2, 406.5),
      t(2, 301.2, 475.4, 505.5, 517.8),
      t(2, 249.3, 423.5, 645.8, 658.1),
    ],
  },
  {
    name: "alt_agent_address_zip",
    boxes: [
      t(2, 447.9, 509.1, 394.2, 406.5),
      t(2, 72.0, 133.1, 520.0, 532.3),
      t(2, 447.9, 509.1, 645.8, 658.1),
    ],
  },

  // 4.2 Signature block — date and address only; the signature line stays bare.
  {
    name: "patient_signature_date",
    boxes: [
      t(8, 328.7, 499.9, 676.7, 689.0),
      t(9, 282.9, 454.1, 113.5, 125.7),
      t(9, 276.7, 447.9, 195.6, 207.9),
    ],
  },
  {
    name: "patient_address_street",
    boxes: [
      t(8, 118.4, 234.0, 691.3, 703.6),
      t(9, 72.0, 246.2, 128.0, 140.3),
      t(9, 109.6, 259.4, 222.2, 234.5),
    ],
  },
  {
    name: "patient_address_city",
    boxes: [
      t(8, 240.7, 414.9, 691.3, 703.6),
      t(9, 249.3, 423.5, 128.0, 140.3),
      t(9, 262.4, 436.6, 222.2, 234.5),
    ],
  },
  {
    name: "patient_address_zip",
    boxes: [
      t(8, 439.4, 500.5, 691.3, 703.6),
      t(9, 447.9, 509.1, 128.0, 140.3),
      // Russian line runs "CA,__________" as one token; skip the "CA," prefix.
      t(9, 458.0, 519.1, 222.2, 234.5),
    ],
  },

  // 4.3 Witnesses
  {
    name: "witness1_name",
    boxes: [
      t(9, 350.4, 521.6, 386.6, 398.8),
      t(10, 251.6, 422.8, 142.5, 154.8),
      t(10, 212.4, 383.5, 551.7, 563.9),
    ],
  },
  {
    name: "witness1_date",
    boxes: [
      t(9, 328.7, 499.9, 401.1, 413.4),
      t(10, 282.9, 454.1, 157.1, 169.4),
      t(10, 276.7, 447.9, 566.2, 578.5),
    ],
  },
  {
    name: "witness1_address_street",
    boxes: [
      t(9, 118.4, 268.2, 415.6, 427.9),
      t(10, 72.0, 246.2, 171.6, 183.9),
      t(10, 72.0, 246.2, 580.7, 593.0),
    ],
  },
  {
    name: "witness1_address_city",
    boxes: [
      t(9, 271.3, 445.5, 415.6, 427.9),
      t(10, 249.3, 423.5, 171.6, 183.9),
      t(10, 249.3, 423.5, 580.7, 593.0),
    ],
  },
  {
    name: "witness1_address_zip",
    boxes: [
      t(9, 469.9, 531.1, 415.6, 427.9),
      t(10, 447.9, 509.1, 171.6, 183.9),
      t(10, 447.9, 509.1, 580.7, 593.0),
    ],
  },
  {
    name: "witness2_name",
    boxes: [
      t(9, 350.4, 521.6, 456.7, 469.0),
      t(10, 125.2, 296.3, 227.3, 239.6),
      t(10, 72.0, 243.2, 636.4, 648.7),
    ],
  },
  {
    name: "witness2_date",
    boxes: [
      t(9, 328.7, 499.9, 471.3, 483.6),
      t(10, 108.7, 279.8, 241.8, 254.1),
      t(10, 72.0, 243.2, 650.9, 663.2),
    ],
  },
  {
    name: "witness2_address_street",
    boxes: [
      t(9, 118.4, 292.7, 485.8, 498.1),
      t(10, 334.8, 509.0, 241.8, 254.1),
      t(10, 283.8, 458.0, 650.9, 663.2),
    ],
  },
  {
    name: "witness2_address_city",
    boxes: [
      t(9, 295.7, 469.9, 485.8, 498.1),
      t(10, 72.0, 246.2, 256.4, 268.7),
      t(10, 72.0, 246.2, 665.5, 677.8),
    ],
  },
  {
    name: "witness2_address_zip",
    boxes: [
      t(9, 72.0, 133.1, 500.4, 512.7),
      t(10, 270.7, 331.8, 256.4, 268.7),
      t(10, 270.7, 331.8, 665.5, 677.8),
    ],
  },

  // Notary block — everything except the signature line and the seal box.
  {
    name: "notary_county",
    boxes: [
      t(9, 340.8, 512.0, 526.9, 539.2),
      t(10, 72.0, 243.2, 297.5, 309.8),
      t(10, 319.4, 490.5, 692.0, 704.3),
    ],
  },
  {
    name: "notary_date",
    boxes: [
      t(9, 72.0, 243.2, 541.5, 553.8),
      t(10, 259.1, 430.2, 297.5, 309.8),
      t(10, 72.0, 243.2, 706.6, 718.9),
    ],
  },
  {
    name: "notary_name",
    boxes: [
      t(9, 336.6, 507.8, 541.5, 553.8),
      t(10, 72.0, 243.2, 312.0, 324.3),
      t(10, 354.6, 525.8, 706.6, 718.9),
    ],
  },
  {
    name: "notary_signer_name",
    boxes: [
      t(9, 256.9, 428.1, 556.0, 568.3),
      t(10, 72.0, 243.2, 326.6, 338.8),
      t(11, 232.7, 403.9, 72.4, 84.6),
    ],
  },
  {
    name: "notary_commission_expires",
    boxes: [
      t(9, 352.5, 523.7, 640.7, 653.0),
      t(10, 332.4, 503.5, 411.3, 423.6),
      t(11, 72.0, 243.2, 186.2, 198.5),
    ],
  },

  // Acknowledgement on the final pages.
  {
    name: "patient_acknowledgement_date",
    boxes: [
      t(11, 275.6, 446.7, 643.3, 655.6),
      t(12, 282.9, 454.1, 86.9, 99.2),
      t(12, 276.7, 447.9, 169.1, 181.4),
    ],
  },
];

// ── Multiline free-text areas ──────────────────────────────────────────────
// These are the empty vertical bands the document leaves under each "write
// your own instructions" prompt. Located by measuring the gap between the
// bottom of one text line and the top of the next.
type Area = { page: number; x: number; yTop: number; yBot: number; xMax: number };

const AREA_X = 72;
const AREA_X_MAX = 540;
const a = (page: number, yTop: number, yBot: number): Area => ({
  page,
  x: AREA_X,
  xMax: AREA_X_MAX,
  yTop,
  yBot,
});

const TEXTAREAS: { name: string; areas: Area[] }[] = [
  // 1.4 Limits on agent's authority (optional)
  {
    name: "agent_authority_limits",
    areas: [a(4, 166.8, 222.2), a(4, 249.0, 304.4), a(4, 331.2, 401.1)],
  },
  // 2.1 General statement of goals and preferences
  {
    name: "goals_and_preferences",
    areas: [a(4, 454.5, 524.4), a(4, 565.8, 635.7), a(4, 677.0, 716.0)],
  },
  // 2.2 End-of-life — additional instructions
  {
    name: "end_of_life_additional",
    areas: [a(5, 266.1, 321.5), a(5, 488.7, 544.0), a(6, 84.6, 154.5)],
  },
  // 2.3 Comfort care — additional instructions
  {
    name: "comfort_care_additional",
    areas: [a(6, 222.5, 277.8), a(6, 360.3, 415.6), a(6, 498.1, 568.0)],
  },
  // 2.4 Other health care instructions (optional)
  {
    name: "other_health_care_instructions",
    areas: [a(6, 609.4, 716.0), a(7, 113.7, 183.6), a(7, 239.6, 324.0)],
  },
  // 3.1 Organ donation — additional instructions
  {
    name: "organ_donation_additional",
    areas: [a(7, 433.0, 473.8), a(7, 556.3, 597.1), a(7, 694.1, 716.0)],
  },
  // 3.2 Autopsy and disposition of remains
  {
    name: "autopsy_and_remains",
    areas: [a(8, 140.3, 195.6), a(8, 222.5, 277.8), a(8, 304.7, 374.6)],
  },
];

// ── Checkboxes and radio groups ────────────────────────────────────────────
/** A "[ ]" pair: x spans the open bracket to the close bracket. */
type Bx = { page: number; x: number; xMax: number; yTop: number; yBot: number };
const b = (page: number, x: number, xMax: number, yTop: number, yBot: number): Bx => ({
  page,
  x,
  xMax,
  yTop,
  yBot,
});

const CHECKBOXES: { name: string; boxes: Bx[] }[] = [
  // 1.3 — agent's authority effective immediately.
  {
    name: "agent_authority_effective_immediately",
    boxes: [
      b(3, 506.4, 515.6, 241.8, 254.1),
      b(3, 155.7, 164.9, 481.5, 493.8),
      b(4, 218.9, 228.1, 72.4, 84.6),
    ],
  },
];

const RADIO_GROUPS: { name: string; options: { value: string; boxes: Bx[] }[] }[] = [
  // 2.2 End-of-life decisions — three mutually exclusive choices.
  {
    name: "end_of_life_decision",
    options: [
      {
        value: "provide_life_sustaining_treatment",
        boxes: [
          b(5, 72.0, 81.2, 183.6, 195.9),
          b(5, 72.0, 81.2, 391.6, 403.9),
          b(5, 72.0, 81.2, 614.2, 626.5),
        ],
      },
      {
        value: "withhold_life_sustaining_treatment",
        boxes: [
          b(5, 340.2, 349.4, 198.2, 210.5),
          b(5, 526.0, 535.1, 406.2, 418.5),
          b(5, 234.6, 243.8, 643.3, 655.6),
        ],
      },
      {
        value: "agent_decides",
        boxes: [
          b(5, 467.7, 476.9, 212.7, 225.0),
          b(5, 343.9, 353.0, 435.3, 447.6),
          b(5, 230.2, 239.4, 672.4, 684.7),
        ],
      },
    ],
  },
  // 3.1 Organ and tissue donation — three mutually exclusive choices.
  {
    name: "organ_donation_choice",
    options: [
      {
        value: "donate",
        boxes: [
          b(7, 254.1, 263.3, 365.1, 377.4),
          b(7, 290.2, 299.3, 488.4, 500.7),
          b(7, 342.5, 351.7, 611.7, 623.9),
        ],
      },
      {
        value: "do_not_donate",
        boxes: [
          b(7, 365.9, 375.1, 379.6, 391.9),
          b(7, 440.9, 450.0, 502.9, 515.2),
          b(7, 179.6, 188.8, 640.7, 653.0),
        ],
      },
      {
        value: "agent_decides",
        boxes: [
          b(7, 222.3, 231.5, 394.2, 406.5),
          b(7, 273.0, 282.2, 517.5, 529.8),
          b(7, 495.7, 504.9, 640.7, 653.0),
        ],
      },
    ],
  },
];

/**
 * pdf-lib gives every addOptionToPage() call its own export value, so the three
 * language copies of one choice end up as three *different* options (/0 /1 /2
 * with a nine-entry /Opt array). Checking the English box would then clear the
 * Spanish one. This rewrites each widget's on-state so all the widgets for one
 * logical choice share a single state, and trims /Opt back to one entry each —
 * which is what makes the trilingual radio groups behave as one choice.
 */
function collapseRadioOptions(
  group: PDFRadioGroup,
  optionIndexPerWidget: number[],
  optionValues: string[]
) {
  const acro = group.acroField;
  const widgets = acro.getWidgets();
  widgets.forEach((widget, i) => {
    const target = PDFName.of(String(optionIndexPerWidget[i]));
    const ap = widget.dict.lookup(PDFName.of("AP"), PDFDict);
    const normal = ap.lookup(PDFName.of("N"), PDFDict);
    for (const key of normal.keys()) {
      if (key.asString() === "/Off" || key === target) continue;
      const stream = normal.get(key)!;
      normal.delete(key);
      normal.set(target, stream);
    }
    widget.dict.set(PDFName.of("AS"), PDFName.of("Off"));
  });
  acro.dict.set(
    PDFName.of("Opt"),
    acro.dict.context.obj(optionValues.map((v) => PDFString.of(v)))
  );
}

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

  let widgets = 0;

  for (const field of TEXT_FIELDS) {
    const f = form.createTextField(field.name);
    for (const box of field.boxes) {
      f.addToPage(pages[box.page - 1], { ...toRect(box, 13), borderWidth: 0 });
      widgets++;
    }
    // Must follow addToPage — pdf-lib writes the /DA entry there.
    f.setFontSize(field.size ?? 10);
  }

  for (const area of TEXTAREAS) {
    const f = form.createTextField(area.name);
    f.enableMultiline();
    for (const r of area.areas) {
      f.addToPage(pages[r.page - 1], {
        x: r.x,
        y: PAGE_H - r.yBot,
        width: r.xMax - r.x,
        height: r.yBot - r.yTop - 2,
        borderWidth: 0,
      });
      widgets++;
    }
    f.setFontSize(10);
  }

  for (const cb of CHECKBOXES) {
    const f = form.createCheckBox(cb.name);
    for (const box of cb.boxes) {
      f.addToPage(pages[box.page - 1], {
        x: box.x,
        y: PAGE_H - box.yBot + 1,
        width: box.xMax - box.x,
        height: 10,
        borderWidth: 0,
      });
      widgets++;
    }
  }

  for (const group of RADIO_GROUPS) {
    const f = form.createRadioGroup(group.name);
    const optionIndexPerWidget: number[] = [];
    group.options.forEach((option, optionIndex) => {
      for (const box of option.boxes) {
        f.addOptionToPage(option.value, pages[box.page - 1], {
          x: box.x,
          y: PAGE_H - box.yBot + 1,
          width: box.xMax - box.x,
          height: 10,
          borderWidth: 0,
        });
        optionIndexPerWidget.push(optionIndex);
        widgets++;
      }
    });
    collapseRadioOptions(
      f,
      optionIndexPerWidget,
      group.options.map((o) => o.value)
    );
  }

  // pdf-lib paints an opaque white background and a black border behind every
  // widget it creates. That is right for a form it drew itself, but these
  // widgets sit ON TOP of an already-printed page — left alone, the checkbox
  // backgrounds blank out the "[ ]" brackets underneath them. Dropping /MK and
  // regenerating makes every widget transparent so the paper shows through.
  for (const field of form.getFields()) {
    for (const widget of field.acroField.getWidgets()) {
      widget.dict.delete(PDFName.of("MK"));
    }
    if (field instanceof PDFTextField) field.defaultUpdateAppearances(helvetica);
    else if (field instanceof PDFCheckBox) field.defaultUpdateAppearances();
    else if (field instanceof PDFRadioGroup) field.defaultUpdateAppearances();
  }

  registerFormFont(doc, helvetica);

  // Nothing is flattened — the whole point is that it stays fillable.
  writeFileSync(OUT, await doc.save());

  const names = form.getFields().map((f) => f.getName());
  console.log(`Wrote ${OUT}`);
  console.log(`  ${names.length} fields across ${widgets} widgets`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
