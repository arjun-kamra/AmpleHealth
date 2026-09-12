import type { ServiceFigure } from "@/lib/data";

/**
 * Chronic Care Management outcome charts. Each is a 100% stacked column chart
 * of patients by control category at successive points in the program.
 * Pure SVG: no client JS, native <title> tooltips, and a data table for
 * screen readers and anyone who prefers the numbers.
 */

type Category = {
  label: string;
  fill: string;
  /** Label colour inside the segment, chosen for contrast against `fill`. */
  ink: "light" | "dark";
};

/** Sequential brand-blue ramp, darkest = controlled (the outcome we want to grow). */
const CATEGORIES: Category[] = [
  { label: "Controlled", fill: "#104872", ink: "light" },
  { label: "Mildly uncontrolled", fill: "#1B75BB", ink: "light" },
  { label: "Moderately uncontrolled", fill: "#79B1E1", ink: "dark" },
  { label: "Severely uncontrolled", fill: "#D2E5F5", ink: "dark" },
];

type Column = { label: string; values: number[] };

type ChartSpec = {
  title: string;
  subtitle: string;
  columns: Column[];
};

const CHARTS: Record<ServiceFigure, ChartSpec> = {
  "a1c-outcomes": {
    title: "A1c control over time",
    subtitle: "Share of enrolled diabetic patients by A1c category",
    columns: [
      { label: "Enrollment", values: [37.5, 25, 25, 12.5] },
      { label: "3 months", values: [62.5, 25, 12.5, 0] },
      { label: "6 months", values: [75, 12.5, 12.5, 0] },
    ],
  },
  "bp-outcomes": {
    title: "Blood pressure control over time",
    subtitle: "Share of enrolled hypertensive patients by blood pressure category",
    columns: [
      { label: "Enrollment", values: [54.26, 37.77, 6.38, 1.6] },
      { label: "6 weeks", values: [61.7, 34.57, 3.19, 0.53] },
      { label: "3 months", values: [79.26, 18.62, 2.13, 0] },
    ],
  },
};

const W = 560;
const H = 340;
const PAD = { top: 12, right: 12, bottom: 34, left: 44 };
const PLOT_W = W - PAD.left - PAD.right;
const PLOT_H = H - PAD.top - PAD.bottom;
const COL_W = 104;
const GAP = 2; // surface gap between stacked segments
const RADIUS = 4;

function fmt(v: number) {
  return `${Number.isInteger(v) ? v : v.toFixed(1)}%`;
}

/** Rect path with only the top corners rounded. */
function topRounded(x: number, y: number, w: number, h: number, r: number) {
  const rr = Math.min(r, h / 2, w / 2);
  return [
    `M${x},${y + h}`,
    `V${y + rr}`,
    `Q${x},${y} ${x + rr},${y}`,
    `H${x + w - rr}`,
    `Q${x + w},${y} ${x + w},${y + rr}`,
    `V${y + h}`,
    "Z",
  ].join(" ");
}

export default function OutcomeChart({ figure }: { figure: ServiceFigure }) {
  const chart = CHARTS[figure];
  const slot = PLOT_W / chart.columns.length;
  const titleId = `${figure}-title`;
  const descId = `${figure}-desc`;

  return (
    <figure className="card-surface flex h-full flex-col p-6 sm:p-7">
      <figcaption>
        <h3 className="text-xl font-semibold leading-snug">{chart.title}</h3>
        <p className="mt-1 text-sm text-ink-muted">{chart.subtitle}</p>
      </figcaption>

      <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-ink-muted">
        {CATEGORIES.map((c) => (
          <li key={c.label} className="flex items-center gap-1.5">
            <span
              className="inline-block h-2.5 w-2.5 rounded-sm ring-1 ring-inset ring-ink/10"
              style={{ backgroundColor: c.fill }}
              aria-hidden="true"
            />
            {c.label}
          </li>
        ))}
      </ul>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-labelledby={`${titleId} ${descId}`}
        className="mt-4 w-full font-sans"
      >
        <title id={titleId}>{chart.title}</title>
        <desc id={descId}>
          {chart.columns
            .map((col) => `${col.label}: ${fmt(col.values[0])} controlled`)
            .join("; ")}
          .
        </desc>

        {/* Gridlines and y-axis ticks */}
        {[0, 25, 50, 75, 100].map((tick) => {
          const y = PAD.top + PLOT_H - (tick / 100) * PLOT_H;
          return (
            <g key={tick}>
              <line
                x1={PAD.left}
                x2={W - PAD.right}
                y1={y}
                y2={y}
                stroke="#0B1F33"
                strokeOpacity={tick === 0 ? 0.25 : 0.08}
              />
              <text
                x={PAD.left - 8}
                y={y + 4}
                textAnchor="end"
                fontSize={12}
                fill="#56697B"
              >
                {tick}%
              </text>
            </g>
          );
        })}

        {/* Columns */}
        {chart.columns.map((col, ci) => {
          const x = PAD.left + slot * ci + (slot - COL_W) / 2;
          let cursor = PAD.top + PLOT_H; // stack upward from the baseline
          const segments = col.values.map((v, i) => {
            const fullH = (v / 100) * PLOT_H;
            const bottom = cursor;
            cursor -= fullH;
            return { v, i, bottom, fullH };
          });
          const topIndex = segments.reduce(
            (acc, s) => (s.v > 0 ? s.i : acc),
            0,
          );
          return (
            <g key={col.label}>
              {segments.map((s) => {
                if (s.v <= 0) return null;
                const cat = CATEGORIES[s.i];
                const isTop = s.i === topIndex;
                const isBase = s.i === 0;
                const h = Math.max(s.fullH - (isBase ? 0 : GAP), 1);
                const y = s.bottom - s.fullH + (isBase ? 0 : GAP);
                const label = `${col.label} · ${cat.label}: ${fmt(s.v)}`;
                return (
                  <g key={cat.label}>
                    {isTop ? (
                      <path d={topRounded(x, y, COL_W, h, RADIUS)} fill={cat.fill}>
                        <title>{label}</title>
                      </path>
                    ) : (
                      <rect x={x} y={y} width={COL_W} height={h} fill={cat.fill}>
                        <title>{label}</title>
                      </rect>
                    )}
                    {h >= 20 ? (
                      <text
                        x={x + COL_W / 2}
                        y={y + h / 2 + 4.5}
                        textAnchor="middle"
                        fontSize={13}
                        fontWeight={600}
                        fill={cat.ink === "light" ? "#FFFFFF" : "#0B1F33"}
                        pointerEvents="none"
                      >
                        {fmt(s.v)}
                      </text>
                    ) : null}
                  </g>
                );
              })}
              <text
                x={x + COL_W / 2}
                y={H - 10}
                textAnchor="middle"
                fontSize={13}
                fontWeight={500}
                fill="#1C3148"
              >
                {col.label}
              </text>
            </g>
          );
        })}
      </svg>

      <details className="mt-4 text-sm">
        <summary className="cursor-pointer text-ink-muted underline-offset-4 hover:text-brand hover:underline">
          View the data
        </summary>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[20rem] text-left">
            <thead>
              <tr className="border-b border-ink/10 text-xs uppercase tracking-wider text-ink-muted">
                <th scope="col" className="py-2 pr-3 font-medium">
                  Category
                </th>
                {chart.columns.map((col) => (
                  <th key={col.label} scope="col" className="py-2 pr-3 font-medium">
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {CATEGORIES.map((cat, i) => (
                <tr key={cat.label} className="border-b border-ink/5">
                  <th scope="row" className="py-2 pr-3 font-medium text-ink-soft">
                    {cat.label}
                  </th>
                  {chart.columns.map((col) => (
                    <td key={col.label} className="py-2 pr-3 tabular-nums text-ink-muted">
                      {fmt(col.values[i])}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </figure>
  );
}
