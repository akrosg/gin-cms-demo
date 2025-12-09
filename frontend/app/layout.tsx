import type { Metadata } from 'next';
import { Inter, Noto_Sans_JP } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  variable: '--font-noto-sans-jp',
});

export const metadata: Metadata = {
  title: 'Gin CMS Demo',
  description: 'Next.js 16とGinを使ったミニCMS',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='ja'>
      <body
        className={`${inter.variable} ${notoSansJP.variable} font-sans antialiased bg-gray-50 text-slate-900 min-h-screen flex flex-col`}
      >
        <Header />
        <main className='flex-1'>{children}</main>
        <footer className='py-8 text-center text-sm text-slate-400 border-t border-gray-100 mt-auto'>
          &copy; {new Date().getFullYear()} Gin CMS Demo. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
