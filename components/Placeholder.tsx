// Tasteful solid/tonal placeholder block (no cheap stock imagery).
// Renders a layered colored panel with subtle geometry and an optional monogram.

export default function Placeholder({
  tone = "#1B75BB",
  ratio = "4 / 3",
  label,
  monogram,
  rounded = "rounded-2xl",
  className = "",
}: {
  tone?: string;
  ratio?: string;
  label?: string;
  monogram?: string;
  rounded?: string;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden ${rounded} ${className}`}
      style={{
        aspectRatio: ratio,
        backgroundColor: tone,
        backgroundImage: `linear-gradient(135deg, ${tone} 0%, rgba(11,31,51,0.85) 130%)`,
      }}
      role="img"
      aria-label={label ?? "Image placeholder"}
    >
      {/* fine grid overlay */}
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.14) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.14) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      {/* corner hatch */}
      <div
        className="absolute -right-6 -top-6 h-28 w-28 rotate-12 opacity-40"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, rgba(255,255,255,0.25) 0, rgba(255,255,255,0.25) 1px, transparent 1px, transparent 8px)",
        }}
      />
      {/* soft radial highlight */}
      <div className="absolute left-1/2 top-0 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-2xl" />

      {monogram && (
        <span className="absolute bottom-4 left-5 font-serif text-5xl font-semibold text-white/90">
          {monogram}
        </span>
      )}
      {label && (
        <span className="absolute bottom-4 right-5 text-[0.7rem] uppercase tracking-kicker text-white/70">
          {label}
        </span>
      )}
    </div>
  );
}
