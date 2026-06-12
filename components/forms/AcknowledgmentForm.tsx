"use client";

import type { ReactNode } from "react";
import { FormShell, Field, Checkbox, Section, SignatureBlock } from "./FormKit";

/**
 * Shared layout for the four acknowledgment-style forms: a block of policy
 * text, a name field, one (or two) required acknowledgment checkboxes, and a
 * typed signature + date.
 */
export default function AcknowledgmentForm({
  formType,
  policy,
  acknowledgment,
  extraCheckbox,
}: {
  formType: string;
  policy: ReactNode;
  acknowledgment: string;
  extraCheckbox?: { name: string; label: string };
}) {
  return (
    <FormShell formType={formType}>
      <div className="card-surface space-y-4 p-6 text-sm leading-relaxed text-ink-soft md:p-8">
        {policy}
      </div>

      <Section title="Acknowledgment" cols={1}>
        <Field name="Patient Name" required />
        <Checkbox name="Acknowledgment" label={acknowledgment} required />
        {extraCheckbox && (
          <Checkbox
            name={extraCheckbox.name}
            label={extraCheckbox.label}
            required
          />
        )}
      </Section>

      <SignatureBlock />
    </FormShell>
  );
}
