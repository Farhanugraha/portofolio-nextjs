import type { Metadata } from "next";
import "./globals.css";
import { Gabarito } from "next/font/google";
import React, { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ThemeProvider } from "next-themes";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const gabarito = Gabarito({
  variable: "--font-gabarito",
  subsets: ["latin"],
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${gabarito.className} ${gabarito.variable}`}
      suppressHydrationWarning
    >
      <head>
        <title>Farhan's Portofolio</title>
      </head>

      <body
        className={`antialiased flex flex-col min-h-screen transition-colors ${gabarito.className} ${gabarito.variable}`}
      >
        <ThemeProvider attribute="class" defaultTheme="system">
          <div
            className="
              fixed inset-0 -z-10
              bg-[radial-gradient(circle,_#d1d5db_1px,_transparent_1px)]
              dark:bg-[radial-gradient(circle,_#3f3f46_1px,_transparent_1px)]
              bg-[length:30px_30px]
              [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]
            "
          />

          <Header />

          <main className="flex-grow container mx-auto px-4 py-6">
            {children}
            <Analytics />
            <SpeedInsights />
          </main>

          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
