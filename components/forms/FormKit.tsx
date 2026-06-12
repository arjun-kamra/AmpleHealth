"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  type FormEvent,
} from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ *
 * Form state context
 * ------------------------------------------------------------------ */

type FieldValue = string | boolean;
type Values = Record<string, FieldValue>;

type Ctx = {
  values: Values;
  set: (name: string, value: FieldValue) => void;
  submitting: boolean;
};

const FormCtx = createContext<Ctx | null>(null);

function useFormCtx(): Ctx {
  const ctx = useContext(FormCtx);
  if (!ctx) throw new Error("Form field used outside of <FormShell>");
  return ctx;
}

/* ------------------------------------------------------------------ *
 * Shared input styles
 * ------------------------------------------------------------------ */

const inputClass =
  "w-full rounded-xl border border-ink/15 bg-white px-4 py-2.5 text-sm text-ink shadow-sm outline-none transition-colors placeholder:text-ink-muted/60 focus:border-brand focus:ring-2 focus:ring-brand/20";

const labelClass = "block text-sm font-medium text-ink";

function Required() {
  return <span className="text-brand"> *</span>;
}

/* ------------------------------------------------------------------ *
 * Field primitives
 * ------------------------------------------------------------------ */

export function Field({
  name,
  label,
  type = "text",
  required = false,
  placeholder,
  autoComplete,
}: {
  name: string;
  label?: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
}) {
  const { values, set } = useFormCtx();
  return (
    <label className="block space-y-1.5">
      <span className={labelClass}>
        {label ?? name}
        {required && <Required />}
      </span>
      <input
        type={type}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        value={(values[name] as string) ?? ""}
        onChange={(e) => set(name, e.target.value)}
        className={inputClass}
      />
    </label>
  );
}

export function TextArea({
  name,
  label,
  required = false,
  rows = 3,
  placeholder,
}: {
  name: string;
  label?: string;
  required?: boolean;
  rows?: number;
  placeholder?: string;
}) {
  const { values, set } = useFormCtx();
  return (
    <label className="block space-y-1.5">
      <span className={labelClass}>
        {label ?? name}
        {required && <Required />}
      </span>
      <textarea
        required={required}
        rows={rows}
        placeholder={placeholder}
        value={(values[name] as string) ?? ""}
        onChange={(e) => set(name, e.target.value)}
        className={inputClass}
      />
    </label>
  );
}

export function Select({
  name,
  label,
  options,
  required = false,
}: {
  name: string;
  label?: string;
  options: string[];
  required?: boolean;
}) {
  const { values, set } = useFormCtx();
  return (
    <label className="block space-y-1.5">
      <span className={labelClass}>
        {label ?? name}
        {required && <Required />}
      </span>
      <select
        required={required}
        value={(values[name] as string) ?? ""}
        onChange={(e) => set(name, e.target.value)}
        className={inputClass}
      >
        <option value="">Select…</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </label>
  );
}

export function Checkbox({
  name,
  label,
  required = false,
}: {
  name: string;
  label: ReactNode;
  required?: boolean;
}) {
  const { values, set } = useFormCtx();
  return (
    <label className="flex cursor-pointer items-start gap-3">
      <input
        type="checkbox"
        required={required}
        checked={Boolean(values[name])}
        onChange={(e) => set(name, e.target.checked)}
        className="mt-1 h-4 w-4 flex-none rounded border-ink/30 text-brand accent-brand focus:ring-brand/30"
      />
      <span className="text-sm leading-relaxed text-ink-soft">
        {label}
        {required && <Required />}
      </span>
    </label>
  );
}

/** Inline Yes/No radio pair — used in the medical-history grid. */
export function YesNo({ name }: { name: string }) {
  const { values, set } = useFormCtx();
  const current = values[name] as string;
  return (
    <div className="flex items-center gap-3">
      {["Yes", "No"].map((opt) => (
        <label key={opt} className="flex cursor-pointer items-center gap-1.5 text-sm">
          <input
            type="radio"
            name={name}
            value={opt}
            checked={current === opt}
            onChange={() => set(name, opt)}
            className="h-3.5 w-3.5 text-brand accent-brand"
          />
          {opt}
        </label>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Layout helpers
 * ------------------------------------------------------------------ */

export function Section({
  title,
  description,
  children,
  cols = 2,
}: {
  title?: string;
  description?: string;
  children: ReactNode;
  cols?: 1 | 2 | 3;
}) {
  const gridCols =
    cols === 1 ? "" : cols === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2";
  return (
    <fieldset className="space-y-5">
      {title && (
        <div className="border-b border-ink/10 pb-2">
          <legend className="text-lg font-semibold text-ink">{title}</legend>
          {description && (
            <p className="mt-1 text-sm text-ink-muted">{description}</p>
          )}
        </div>
      )}
      <div className={`grid grid-cols-1 gap-5 ${gridCols}`}>{children}</div>
    </fieldset>
  );
}

/** A field that should span the full row in a multi-column Section. */
export function FullRow({ children }: { children: ReactNode }) {
  return <div className="sm:col-span-2 lg:col-span-3">{children}</div>;
}

export function SignatureBlock() {
  return (
    <Section title="Signature">
      <Field name="Signature (type full legal name)" required />
      <Field name="Date" type="date" required />
    </Section>
  );
}

/* ------------------------------------------------------------------ *
 * Submit button (reads submitting state from context)
 * ------------------------------------------------------------------ */

export function SubmitButton({ label = "Submit Form" }: { label?: string }) {
  const { submitting } = useFormCtx();
  return (
    <button
      type="submit"
      disabled={submitting}
      className="btn-primary w-full justify-center disabled:opacity-60 sm:w-auto"
    >
      {submitting ? "Submitting…" : label}
    </button>
  );
}

/* ------------------------------------------------------------------ *
 * FormShell — provider + submission + success/error UI
 * ------------------------------------------------------------------ */

type Status = "idle" | "submitting" | "success" | "error";

export function FormShell({
  formType,
  initialValues = {},
  children,
}: {
  formType: string;
  initialValues?: Values;
  children: ReactNode;
}) {
  const [values, setValues] = useState<Values>(initialValues);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const set = (name: string, value: FieldValue) =>
    setValues((prev) => ({ ...prev, [name]: value }));

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    // Normalize booleans to Yes/No for the email.
    const formData: Record<string, string> = {};
    for (const [key, value] of Object.entries(values)) {
      if (typeof value === "boolean") formData[key] = value ? "Yes" : "No";
      else formData[key] = value;
    }

    try {
      const res = await fetch("/api/submit-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formType, formData }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error ?? "Something went wrong.");
        setStatus("error");
        return;
      }
      setStatus("success");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setErrorMsg("Network error. Please try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="container-page py-20">
        <div className="card-surface mx-auto max-w-xl p-8 text-center md:p-12">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-green-100 text-green-700">
            <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7">
              <path
                d="M5 13l4 4L19 7"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h2 className="mt-6 text-2xl font-semibold">Thank you!</h2>
          <p className="mt-3 text-ink-muted">
            Your form has been received. AmpleHealth will be in touch shortly.
          </p>
          <Link href="/forms" className="btn-ghost mt-8">
            Back to all forms
          </Link>
        </div>
      </div>
    );
  }

  return (
    <FormCtx.Provider value={{ values, set, submitting: status === "submitting" }}>
      <form onSubmit={handleSubmit} className="container-page max-w-3xl py-16 md:py-20">
        <div className="space-y-12">{children}</div>

        {status === "error" && (
          <div className="mt-8 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {errorMsg}
          </div>
        )}

        <div className="mt-10 border-t border-ink/10 pt-8">
          <SubmitButton />
          <p className="mt-3 text-xs text-ink-muted">
            By submitting, you confirm the information above is accurate to the
            best of your knowledge.
          </p>
        </div>
      </form>
    </FormCtx.Provider>
  );
}
