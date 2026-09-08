/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "upload.wikimedia.org" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  // The six patient forms moved from the old custom-React/Resend pages to
  // Jotform embeds under new slugs. Those old pages have since been deleted
  // along with the pipeline behind them, so these redirects are now the only
  // thing keeping the original URLs alive for existing links and bookmarks.
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
      // Leftover PatientPop location URLs, still referenced by Google Ads, old backlinks, and the GMB listings.
      {
        source: "/location/carmichael-ca",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/location/sacramento-ca",
        destination: "/contact",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
