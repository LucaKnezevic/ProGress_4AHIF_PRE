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
        "rounded-2xl border border-white/10 bg-white/5 p-4 shadow-sm backdrop-blur",
        "transition hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/10 hover:shadow-lg",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}
