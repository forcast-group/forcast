'use client';
import { metadata } from '@/config/metadata';
import localFont from 'next/font/local';
import { useEffect } from 'react';
import './globals.css';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      import('./__mocks__/index');
    }
  }, []);

  return (
    <html lang="ja">
      <head>
        <title>{String(metadata.title) || 'Default Title'}</title>
        <meta name="description" content={metadata.description || 'Default description'} />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
    </html>
  );
}
