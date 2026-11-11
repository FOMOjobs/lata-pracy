import type { Metadata, Viewport } from "next";
import "@fontsource-variable/dm-sans";
import "@fontsource-variable/manrope";
import "./globals.css";
import "./experience.css";

export const metadata: Metadata = {
  title: {
    default: "Lata Pracy — Twoja praca się liczy",
    template: "%s · Lata Pracy",
  },
  description:
    "Poznaj fikcyjne historie pracy i sprawdź, które okresy warto zweryfikować w świetle zmian w 2026 roku. Niezależny prototyp demonstracyjny.",
  robots: { index: false, follow: false },
  applicationName: "Lata Pracy",
};
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#142b4e",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pl">
      <body>
        <a className="skip-link" href="#main">
          Przejdź do treści
        </a>
        {children}
      </body>
    </html>
  );
}
