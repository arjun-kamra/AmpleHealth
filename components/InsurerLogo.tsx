type Props = {
  name: string;
  color: string;
};

export default function InsurerLogo({ name, color }: Props) {
  return (
    <span
      className="grid h-12 w-12 place-items-center rounded-xl text-xl font-bold text-white shadow-sm"
      style={{ backgroundColor: color }}
    >
      {name.charAt(0)}
    </span>
  );
}
