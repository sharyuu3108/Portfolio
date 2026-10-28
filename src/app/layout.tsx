import type { Metadata, Viewport } from 'next';
import { Space_Grotesk, DM_Sans, Instrument_Serif, IBM_Plex_Mono } from 'next/font/google';
import { Navigation } from '@/components/layout/Navigation';
import { JourneyRail } from '@/components/layout/JourneyRail';
import { Footer } from '@/components/layout/Footer';
import { NeuralMeshCanvas } from '@/components/canvas/NeuralMeshCanvas';
import { ScrollRevealProvider } from '@/components/common/ScrollRevealProvider';
import './globals.scss';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const instrumentSerif = Instrument_Serif({
  weight: ['400'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-instrument-serif',
  display: 'swap',
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-ibm-plex-mono',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#08090D',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://sharvari-potdar.dev'),
  title: 'Sharvari Potdar',
  description:
    "Personal portfolio of Sharvari Potdar, Computer Science & Engineering undergraduate at KIT's College of Engineering, Kolhapur. Full-stack developer, AI application builder, and UI/UX designer.",
  keywords: [
    'Sharvari Potdar',
    'Full-Stack Developer',
    'React Developer',
    'Next.js',
    'AI Applications',
    'CodeSage AI',
    'CereBro',
    'UI/UX Designer',
    'KIT College of Engineering Kolhapur'
  ],
  authors: [{ name: 'Sharvari Potdar' }],
  creator: 'Sharvari Potdar',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Sharvari Potdar',
    description:
      'Computer Science undergraduate building full-stack web applications with React, Node.js, and Google Gemini API. Double national competition award winner.',
    siteName: 'Sharvari Potdar',
    images: [
      {
        url: '/images/sharvari-portrait.jpg',
        width: 1200,
        height: 630,
        alt: 'Sharvari Potdar - Portfolio'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sharvari Potdar',
    description: 'Explore full-stack engineering, AI API workflows, and UI/UX design by Sharvari Potdar.'
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${dmSans.variable} ${instrumentSerif.variable} ${ibmPlexMono.variable}`}
    >
      <body>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <NeuralMeshCanvas />
        <Navigation />
        <ScrollRevealProvider />
        <JourneyRail />
        <main id="main-content" className="site-main">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
