type Props = {
  name: string;
  color: string;
  logo?: string;
};

export default function InsurerLogo({ name, color, logo }: Props) {
  if (logo) {
    return (
      <div className="flex h-16 w-full items-center justify-center rounded-lg border border-gray-100 bg-white p-2">
        <img src={logo} alt={`${name} logo`} className="max-h-12 max-w-full object-contain" />
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
