export default function Container({ children }: { children: React.ReactNode }) {
  return <div className="relative z-10 w-full px-5 py-5">{children}</div>;
}
