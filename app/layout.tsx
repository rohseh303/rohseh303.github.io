import type { Metadata } from 'next';
import { JetBrains_Mono } from 'next/font/google';
import '../styles/globals.css';
import CustomCursor from '@/components/ui/CustomCursor';
import Header from '@/components/layout/Header';

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Rohan Sehgal | Software Engineer',
  description: 'Engineer at Tools for Humanity. Previously founding engineer at Broccoli (YC W22).',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${jetbrainsMono.variable} cursor-none`}>
      <body className="bg-[#0a0a0a] text-white antialiased cursor-none">
        <CustomCursor />
        <Header />
        {children}
      </body>
    </html>
  );
}
