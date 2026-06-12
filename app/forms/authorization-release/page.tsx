import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import AuthorizationReleaseForm from "@/components/forms/AuthorizationReleaseForm";

export const metadata: Metadata = {
  title: "Authorization for Release of Medical Information",
  description:
    "Authorize AmpleHealth to release or obtain your protected health information.",
};

export default function AuthorizationReleasePage() {
  return (
    <>
      <PageHero
        kicker="Patient forms"
        title="Authorization for Release"
        highlight="of Information."
        description="Use this form to authorize AmpleHealth to release your health information to — or obtain it from — another party."
      />
      <AuthorizationReleaseForm />
    </>
  );
}
