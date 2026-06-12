"use client";

import {
  FormShell,
  Field,
  TextArea,
  Checkbox,
  Section,
  FullRow,
  SignatureBlock,
} from "./FormKit";

const INFO_TYPES = [
  "Complete medical record",
  "Office / progress notes",
  "Lab results",
  "Imaging / radiology reports",
  "Medication list",
  "Immunization records",
  "Billing records",
  "Mental health records",
];

export default function AuthorizationReleaseForm() {
  return (
    <FormShell formType="Authorization for Release of Medical Information">
      <Section title="Patient Information">
        <Field name="Patient Name" required />
        <Field name="Date of Birth" type="date" required />
        <Field name="Phone" type="tel" required autoComplete="tel" />
        <FullRow>
          <Field name="Address" required autoComplete="street-address" />
        </FullRow>
      </Section>

      <Section
        title="Authorization Direction"
        description="Tell us which direction the information should flow."
        cols={1}
      >
        <Checkbox
          name="Authorize Release To"
          label="I authorize AmpleHealth to RELEASE my information to the party named below."
        />
        <Checkbox
          name="Authorize Obtain From"
          label="I authorize AmpleHealth to OBTAIN my information from the party named below."
        />
      </Section>

      <Section title="Other Party">
        <Field name="Provider / Facility Name" required />
        <Field name="Provider Phone" type="tel" />
        <FullRow>
          <Field name="Provider Address" />
        </FullRow>
        <Field name="Provider Fax" />
        <Field name="Provider Email" type="email" />
      </Section>

      <Section title="Information to Release" cols={2}>
        {INFO_TYPES.map((label) => (
          <Checkbox key={label} name={label} label={label} />
        ))}
      </Section>

      <Section title="Purpose & Expiration">
        <FullRow>
          <TextArea
            name="Purpose of Disclosure"
            placeholder="e.g. continuing care, second opinion, personal records…"
            required
          />
        </FullRow>
        <Field name="Expiration Date" type="date" />
      </Section>

      <Section
        title="Acknowledgment"
        description="Please confirm you understand your rights before signing."
        cols={1}
      >
        <Checkbox
          name="Right to Revoke Acknowledgment"
          label="I understand I may revoke this authorization in writing at any time, except to the extent action has already been taken in reliance on it."
          required
        />
      </Section>

      <SignatureBlock />

      <Section
        title="Legal Representative (if applicable)"
        description="Complete only if signing on behalf of the patient."
      >
        <Field name="Legal Representative Name" />
        <Field name="Relationship to Patient" />
      </Section>
    </FormShell>
  );
}
