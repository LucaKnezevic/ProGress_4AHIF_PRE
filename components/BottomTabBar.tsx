"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  {
    href: "/",
    label: "Home",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1h-2z" />
      </svg>
    ),
  },
  {
    href: "/trainings",
    label: "Training",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h1m1-4h1m0 0V6a1 1 0 011-1h1a1 1 0 011 1v6a1 1 0 01-1 1H7a1 1 0 01-1-1V8zm10 0h1m0 0V5a1 1 0 011-1h1a1 1 0 011 1v8a1 1 0 01-1 1h-1a1 1 0 01-1-1V8zm4 4h1m-18 0h18M6 16v2a1 1 0 001 1h1a1 1 0 001-1v-4a1 1 0 00-1-1H7a1 1 0 00-1 1v2zm10-2v4a1 1 0 001 1h1a1 1 0 001-1v-2" />
      </svg>
    ),
  },
  {
    href: "/kalorien",
    label: "Kalorien",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
      </svg>
    ),
  },
  {
    href: "/koerperwerte",
    label: "Körper",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    href: "/studiozugang",
    label: "Studio",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
      </svg>
    ),
  },
];

export default function BottomTabBar() {
  const pathname = usePathname();

  return (
    <nav className="bottom-tab-bar">
      <div className="flex items-center justify-around px-2 pt-2 pb-4">
        {tabs.map((tab) => {
          const active = pathname === tab.href;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className="group relative flex flex-col items-center gap-1 px-3 py-1"
              style={{ minWidth: '50px' }}
            >
              {/* Active pill indicator */}
              {active && (
                <span
                  className="absolute -top-2 left-1/2 -translate-x-1/2 h-[3px] w-5 rounded-full"
                  style={{ background: 'linear-gradient(90deg, #818cf8, #a78bfa)' }}
                />
              )}
              <span
                className="flex transition-all duration-200"
                style={{
                  color: active ? '#a78bfa' : 'rgba(255,255,255,0.35)',
                  transform: active ? 'scale(1.1)' : 'scale(1)',
                  filter: active ? 'drop-shadow(0 0 6px rgba(167,139,250,0.4))' : 'none',
                }}
              >
                {tab.icon}
              </span>
              <span
                className="text-[10px] font-semibold tracking-wide transition-colors duration-200"
                style={{
                  color: active ? '#c4b5fd' : 'rgba(255,255,255,0.3)',
                }}
              >
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>

      {/* Home indicator */}
      <div className="flex justify-center pb-1.5">
        <div className="h-[4px] w-[100px] rounded-full" style={{ background: 'rgba(255,255,255,0.12)' }} />
      </div>
    </nav>
  );
}
