export default function SectionTitle({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-5">
      <h1 className="text-xl font-bold text-white">{title}</h1>
      {subtitle ? <p className="mt-1 text-sm text-white/50">{subtitle}</p> : null}
    </div>
  );
}
