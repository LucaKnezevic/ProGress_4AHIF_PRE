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
          {/* iPhone X Notch */}
          <div className="phone-notch" />

          {/* Ambient glow effects */}
          <div className="phone-glow" />

          {/* Scrollable page content */}
          <div className="phone-content">
            {children}
          </div>

          {/* Modal portal target — inside phone, outside scrollable content */}
          <div id="modal-root" />

          {/* Bottom navigation — sticky to bottom */}
          <BottomTabBar />
        </div>
      </body>
    </html>
  );
}
