import type { Metadata } from "next";
import { Geist, JetBrains_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";

import { cn } from "@/lib/utils";
import "./globals.css";

const fontSans = Geist({ subsets: ["latin"], variable: "--font-sans" });
const fontMono = JetBrains_Mono({ variable: "--font-mono" });

export const metadata: Metadata = {
  title: {
    default: "Nuestra carta",
    template: "%s | Nuestra carta",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={cn(fontSans.variable, fontMono.variable, "font-sans")}
    >
      <body>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
