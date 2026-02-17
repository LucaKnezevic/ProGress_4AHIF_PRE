export default function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={[
        "rounded-2xl border border-white/8 bg-white/[0.04] p-4 backdrop-blur-sm",
        "transition-colors active:bg-white/[0.08]",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}
