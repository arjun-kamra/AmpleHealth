"use client";

import { useState } from "react";

type Props = {
  name: string;
  domain?: string;
  color: string;
};

export default function InsurerLogo({ name, domain, color }: Props) {
  const [failed, setFailed] = useState(false);

  if (domain && !failed) {
    return (
      <div className="flex h-16 w-32 items-center justify-center rounded-lg border border-gray-100 bg-white p-2">
        <img
          src={`https://logo.clearbit.com/${domain}`}
          alt={`${name} logo`}
          className="h-10 w-auto object-contain"
          onError={() => setFailed(true)}
        />
      </div>
    );
  }

  return (
    <div className="flex h-16 w-32 items-center justify-center rounded-lg border border-gray-100 bg-white p-2">
      <span
        className="grid h-10 w-10 place-items-center rounded-lg text-xl font-bold text-white"
        style={{ backgroundColor: color }}
      >
        {name.charAt(0)}
      </span>
    </div>
  );
}
