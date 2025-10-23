import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Code Reviewer Assistant',
  description: 'An AI-powered assistant for code analysis and review suggestions',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full dark">
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M12 21a9 9 0 0 0-9-9 9 9 0 0 0-9-9H3a9 9 0 0 0 9 9v1Z'/><path d='M21 15v-2a4 4 0 0 0-4-4H9'/><path d='m12 12-3-3 3-3'/></svg>" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background text-foreground h-full">
        <div className="flex flex-col min-h-screen">
          <Header />
          {children}
          <Footer />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
