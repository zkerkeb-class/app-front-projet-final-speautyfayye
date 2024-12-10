import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

import Sidebar from '../components/Sidebar/Sidebar';
import Header from '../components/Header';
import Player from '../components/Player';

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

export const metadata: Metadata = {
  title: 'Speautyfayye',
  description: 'A Spotify playlist visualizer',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-dark text-light antialiased`}
      >
        <div className="flex h-screen flex-col">
          <div className="flex flex-grow overflow-hidden">
            <Sidebar />

            <div className="flex flex-grow flex-col">
              <Header />
              <main className="flex-grow overflow-y-auto p-6">{children}</main>
              <Player />
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
