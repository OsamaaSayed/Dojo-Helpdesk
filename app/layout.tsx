import { Rubik } from 'next/font/google';

import Navbar from '../components/Navbar';

import type { Metadata } from 'next';
import './globals.css';

const rubik = Rubik({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={rubik.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
