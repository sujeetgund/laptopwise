import type {Metadata} from 'next';
import { Geist, Geist_Mono } from 'next/font/google'; // Correct import for Geist
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import AppLayout from '@/components/layout/AppLayout';

const geistSans = Geist({ // Correct usage
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({ // Correct usage
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'LaptopWise - Estimate Laptop Prices',
  description: 'Estimate your laptop\'s worth instantly with LaptopWise. AI-powered price prediction based on laptop specifications.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark"> {/* Add dark class for shadcn compatibility */}
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}>
        <AppLayout>
          {children}
        </AppLayout>
        <Toaster />
      </body>
    </html>
  );
}
