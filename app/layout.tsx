import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from "@/components/theme-provider"
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ClerkProvider } from '@clerk/nextjs';
import { UserButton } from "@clerk/nextjs";
import AdSense from '@/components/AdSense';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'UPSC Educational Website',
  description: 'Comprehensive resource for UPSC preparation',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <head>
          <meta name="google-site-verification" content="8633399985031582" />
          <AdSense />
        </head>
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}