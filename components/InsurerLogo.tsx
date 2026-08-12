"use client";

import { useState } from "react";

type Props = {
  name: string;
  color: string;
  domain?: string;
  logoUrl?: string;
  /** compact=true renders a small chip for the homepage dark section */
  compact?: boolean;
};

export default function InsurerLogo({ name, color, domain, logoUrl, compact = false }: Props) {
  const [failed, setFailed] = useState(false);

  const src = logoUrl ?? (domain ? `https://logo.uplead.com/${domain}` : null);

  if (src && !failed) {
    if (compact) {
      return (
        <div className="grid h-[72px] w-[72px] flex-none place-items-center rounded-lg bg-white p-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={`${name} logo`}
            className="h-full w-full object-contain"
            onError={() => setFailed(true)}
          />
        </div>
      );
    }

    return (
      <div className="flex h-36 w-full items-center justify-center rounded-lg border border-gray-100 bg-white px-6 py-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={`${name} logo`}
          className="h-full w-full object-contain"
          onError={() => setFailed(true)}
        />
      </div>
    );
  }

  // Letter avatar fallback — scaled proportionally to the logo boxes above
  if (compact) {
    return (
      <span
        className="grid h-[72px] w-[72px] flex-none place-items-center rounded-lg text-2xl font-bold text-white"
        style={{ backgroundColor: color }}
      >
        {name.charAt(0)}
      </span>
    );
  }

  return (
    <span
      className="grid h-[108px] w-[108px] place-items-center rounded-xl text-5xl font-bold text-white shadow-sm"
      style={{ backgroundColor: color }}
    >
      {name.charAt(0)}
    </span>
  );
}
