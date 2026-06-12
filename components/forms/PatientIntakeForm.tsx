"use client";

import {
  FormShell,
  Field,
  TextArea,
  Select,
  Checkbox,
  YesNo,
  Section,
  FullRow,
  SignatureBlock,
} from "./FormKit";

const AUTHORIZATIONS = [
  "I authorize AmpleHealth to treat me and provide medical care.",
  "I authorize the release of my medical information to my insurance company for billing.",
  "I authorize AmpleHealth to bill my insurance on my behalf.",
  "I accept financial responsibility for charges not covered by my insurance.",
  "I authorize AmpleHealth to leave appointment reminders and health messages on my voicemail.",
  "I consent to receive communications by email and text message.",
  "I acknowledge that I have received the Notice of Privacy Practices.",
];

const CONDITIONS = [
  "Diabetes",
  "High blood pressure",
  "Heart disease",
  "Stroke",
  "Cancer",
  "Asthma / lung disease",
  "Kidney disease",
  "Liver disease",
  "Thyroid disease",
  "Depression / anxiety",
  "Arthritis",
  "Seizures",
];

const ROWS_HOSPITALIZATION = [1, 2, 3, 4, 5];
const ROWS_MEDICATION = [1, 2, 3, 4, 5];
const ROWS_ALLERGY = [1, 2, 3, 4, 5];
const ROWS_TEST = [1, 2, 3, 4, 5];

export default function PatientIntakeForm() {
  return (
    <FormShell formType="New Patient Intake Form">
      <Section title="Patient Information">
        <Field name="First Name" required autoComplete="given-name" />
        <Field name="Last Name" required autoComplete="family-name" />
        <Field name="Date of Birth" type="date" required />
        <Field name="Sex" />
        <Field name="Marital Status" />
        <Field name="Preferred Language" />
      </Section>

      <Section title="Address">
        <FullRow>
          <Field name="Street Address" required autoComplete="street-address" />
        </FullRow>
        <Field name="City" required autoComplete="address-level2" />
        <Field name="State" required autoComplete="address-level1" />
        <Field name="ZIP Code" required autoComplete="postal-code" />
      </Section>

      <Section title="Phone & Employment">
        <Field name="Home Phone" type="tel" />
        <Field name="Cell Phone" type="tel" required autoComplete="tel" />
        <Field name="Email" type="email" required autoComplete="email" />
        <Field name="Employer" />
        <Field name="Occupation" />
      </Section>

      <Section title="Family">
        <Field name="Primary Care Physician" />
        <Field name="Referring Provider" />
        <Field name="Spouse / Partner Name" />
        <Field name="Number of Children" type="number" />
      </Section>

      <Section title="Emergency Contact">
        <Field name="Emergency Contact Name" required />
        <Field name="Emergency Contact Relationship" required />
        <Field name="Emergency Contact Phone" type="tel" required />
      </Section>

      <Section title="Insurance">
        <Field name="Insurance Provider" required />
        <Field name="Member ID" required />
        <Field name="Group Number" />
        <Field name="Policy Holder Name" />
        <Field name="Policy Holder Date of Birth" type="date" />
        <Field name="Relationship to Policy Holder" />
      </Section>

      <Section title="Driver's License / ID">
        <Field name="Driver's License Number" />
        <Field name="Issuing State" />
      </Section>

      <Section title="Authorizations & Consent" cols={1}>
        {AUTHORIZATIONS.map((label, i) => (
          <Checkbox
            key={i}
            name={`Authorization ${i + 1}`}
            label={label}
            required
          />
        ))}
      </Section>

      {/* Medical history grid */}
      <fieldset className="space-y-5">
        <div className="border-b border-ink/10 pb-2">
          <legend className="text-lg font-semibold text-ink">
            Medical History
          </legend>
          <p className="mt-1 text-sm text-ink-muted">
            Please indicate whether you (Self) or a blood relative (Family) has
            had any of the following.
          </p>
        </div>
        <div className="overflow-hidden rounded-xl border border-ink/10">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-paper-deep/60 text-left text-ink">
                <th className="px-4 py-2.5 font-medium">Condition</th>
                <th className="px-4 py-2.5 font-medium">Self</th>
                <th className="px-4 py-2.5 font-medium">Family</th>
              </tr>
            </thead>
            <tbody>
              {CONDITIONS.map((cond) => (
                <tr key={cond} className="border-t border-ink/10">
                  <td className="px-4 py-2.5 text-ink-soft">{cond}</td>
                  <td className="px-4 py-2.5">
                    <YesNo name={`${cond} — Self`} />
                  </td>
                  <td className="px-4 py-2.5">
                    <YesNo name={`${cond} — Family`} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <FullRow>
          <TextArea
            name="Other Medical Conditions"
            placeholder="List any other conditions, surgeries, or concerns…"
          />
        </FullRow>
      </fieldset>

      <Section
        title="Hospitalizations & Surgeries"
        description="List any past hospital stays or surgeries."
        cols={1}
      >
        {ROWS_HOSPITALIZATION.map((n) => (
          <div key={n} className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            <Field name={`Hospitalization ${n} — Reason`} />
            <Field name={`Hospitalization ${n} — Year`} />
            <Field name={`Hospitalization ${n} — Hospital`} />
          </div>
        ))}
      </Section>

      <Section title="Current Medications" cols={1}>
        {ROWS_MEDICATION.map((n) => (
          <div key={n} className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            <Field name={`Medication ${n} — Name`} />
            <Field name={`Medication ${n} — Dosage`} />
            <Field name={`Medication ${n} — Frequency`} />
          </div>
        ))}
      </Section>

      <Section title="Allergies" cols={1}>
        {ROWS_ALLERGY.map((n) => (
          <div key={n} className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Field name={`Allergy ${n} — Allergen`} />
            <Field name={`Allergy ${n} — Reaction`} />
          </div>
        ))}
      </Section>

      <Section
        title="Tests & Immunizations"
        description="Recent tests, screenings, or immunizations."
        cols={1}
      >
        {ROWS_TEST.map((n) => (
          <div key={n} className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Field name={`Test/Immunization ${n} — Name`} />
            <Field name={`Test/Immunization ${n} — Date`} />
          </div>
        ))}
      </Section>

      <Section title="Lifestyle">
        <Select
          name="Smoking / Tobacco"
          options={["Never", "Former", "Current"]}
        />
        <Select
          name="Caffeine"
          options={["None", "Occasional", "Daily"]}
        />
        <Select
          name="Alcohol"
          options={["None", "Occasional", "Moderate", "Heavy"]}
        />
        <Select
          name="Recreational Drugs"
          options={["Never", "Former", "Current"]}
        />
      </Section>

      <SignatureBlock />
    </FormShell>
  );
}
