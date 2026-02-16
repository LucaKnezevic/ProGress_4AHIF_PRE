"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  { href: "/", label: "Dashboard" },
  { href: "/trainings", label: "Training" },
  { href: "/koerperwerte", label: "Körperwerte" },
  { href: "/kalorien", label: "Kalorien" },
  { href: "/studiozugang", label: "Studiozugang" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/35 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-white/10 text-sm font-semibold">
            PG
          </div>
          <div className="leading-tight">
            <div className="font-semibold">ProGress</div>
            <div className="text-xs text-white/60">Fitness Tracking</div>
          </div>
        </Link>

        <nav className="hidden gap-1 md:flex">
          {nav.map((n) => {
            const active = pathname === n.href;
            return (
              <Link
                key={n.href}
                href={n.href}
                className={[
                  "rounded-xl px-3 py-2 text-sm transition",
                  active
                    ? "bg-white/10 text-white"
                    : "text-white/70 hover:bg-white/5 hover:text-white",
                ].join(" ")}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile hint */}
        <div className="text-xs text-white/60 md:hidden">Menü oben</div>
      </div>
    </header>
  );
}
