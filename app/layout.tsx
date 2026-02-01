import type { Metadata } from 'next';
import { JetBrains_Mono } from 'next/font/google';
import '../styles/globals.css';
import CustomCursor from '@/components/ui/CustomCursor';
import LoadingScreen from '@/components/ui/LoadingScreen';
import { LoadingProvider } from '@/lib/loadingContext';
import AnimatedContent from '@/components/layout/AnimatedContent';
import Header from '@/components/layout/Header';

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Rohan Sehgal | Software Engineer',
  description: 'Founding Engineer at Broccoli.com. Building AI voice agents and full-stack systems.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${jetbrainsMono.variable} cursor-none`}>
      <body className="bg-[#0a0a0a] text-white antialiased cursor-none">
        <LoadingProvider>
          <LoadingScreen />
          <CustomCursor />
          <Header />
          <AnimatedContent>
        {children}
          </AnimatedContent>
        </LoadingProvider>
      </body>
    </html>
  );
}
