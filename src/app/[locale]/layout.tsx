import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { ThemeProvider } from '@/components/theme-provider';
import './globals.css';

import Sidebar from '../../components/Sidebar/Sidebar';
import Header from '../../components/Header';
import AudioPlayer from '../../components/audioPlayer';
import Providers from '../providers';

const geistSans = localFont({
  src: '../fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: '../fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Speautyfayye',
  description: 'A Spotify playlist visualizer',
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  params: { locale: string };
  children: React.ReactNode;
}>) {
  const locale = await params;
  return (
    <html lang={locale.locale || 'fr'} suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers locale={locale.locale}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange={false}
          >
            <div className="flex h-screen flex-col bg-background">
              <Header />
              <div className="flex overflow-hidden">
                <Sidebar />
                <main className="overflow-y-auto bg-background/95 p-6 backdrop-blur-sm">
                  {children}
                </main>
                <AudioPlayer />
              </div>
            </div>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
