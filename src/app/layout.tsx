import { Geist, Geist_Mono } from "next/font/google";

import QueryProvider from "@/shared/providers/QueryProvider";

import "./globals.scss";

import type { Metadata } from "next";
import type { ReactNode } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "하루노트 | DAILY NOTE",
  description: "하루를 기록하는 가장 간단한 방법, 하루노트",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ko" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
