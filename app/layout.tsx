import "./globals.css";
import BottomTabBar from "@/components/BottomTabBar";

export const metadata = {
  title: "ProGress",
  description: "Fitness Tracking App",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <div className="phone-frame">
          {/* Background Effects */}
          <div className="pointer-events-none fixed inset-0 overflow-hidden">
            <div className="absolute -top-40 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-indigo-600/20 blur-[100px]" />
            <div className="absolute bottom-20 right-[-80px] h-[300px] w-[300px] rounded-full bg-cyan-500/10 blur-[100px]" />
          </div>

          <main className="relative min-h-screen pb-24">
            {children}
          </main>

          <BottomTabBar />
        </div>
      </body>
    </html>
  );
}
