"use client";

type Props = {
  name: string;
  logo?: string;
  color: string;
};

export default function InsurerLogo({ name, logo, color }: Props) {
  if (logo) {
    return (
      <div className="flex h-16 w-32 items-center justify-center rounded-lg border border-gray-100 bg-white p-2">
        <img
          src={logo}
          alt={`${name} logo`}
          className="h-10 w-auto object-contain"
        />
      </div>
    );
  }

  return (
    <span
      className="grid h-12 w-12 place-items-center rounded-xl text-xl font-bold text-white shadow-sm"
      style={{ backgroundColor: color }}
    >
      {name.charAt(0)}
    </span>
  );
}
