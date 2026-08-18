/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "upload.wikimedia.org" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  // The six patient forms moved from the pdf-lib/Resend pages to Jotform
  // embeds under new slugs. Redirects run ahead of filesystem routes, so these
  // also take the old pages out of service without deleting them.
  async redirects() {
    return [
      {
        source: "/forms/patient-intake",
        destination: "/forms/patient-intake-form",
        permanent: true,
      },
      {
        source: "/forms/privacy-practices",
        destination: "/forms/notice-of-privacy-practices",
        permanent: true,
      },
      {
        source: "/forms/no-show-policy",
        destination: "/forms/no-show-late-cancellation-policy",
        permanent: true,
      },
      {
        source: "/forms/patient-partnership",
        destination: "/forms/patient-partnership-plan",
        permanent: true,
      },
      {
        source: "/forms/telemedicine-consent",
        destination: "/forms/telemedicine-consent-agreement",
        permanent: true,
      },
      {
        source: "/forms/authorization-release",
        destination: "/forms/authorization-for-release",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
