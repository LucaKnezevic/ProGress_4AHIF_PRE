type Props = {
  label: string;
  value: string | number;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
};

export default function FormField({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
}: Props) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-white/70">{label}</span>
      <input
        className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/[0.06] px-3.5 py-2.5 text-white outline-none placeholder:text-white/30 focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30 transition"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type={type}
        placeholder={placeholder}
      />
    </label>
  );
}
