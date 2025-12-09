import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gin CMS Demo",
  description: "Next.js 16とGinを使ったミニCMS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
