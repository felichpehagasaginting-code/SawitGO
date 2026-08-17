import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { AppProviders } from "./providers";

const jakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SawitGO Command Center — Real-Time Plantation GIS & EUDR Traceability",
  description:
    "Executive Plantation Operations Dashboard: Offline-First Store-and-Forward Ingestion, Weighted RBAC Conflict Resolution, Restan Warning Engine, and PostGIS Geospatial Traceability.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${jakartaSans.variable} ${jetbrainsMono.variable} h-full antialiased font-sans`}
    >
      <body className="min-h-full flex flex-col bg-[#060E0A] text-[#F1F5F9] selection:bg-[#10B981] selection:text-black">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
