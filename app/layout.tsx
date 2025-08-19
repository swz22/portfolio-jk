import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: 'John Doe | Full Stack Developer',
    template: '%s | John Doe',
  },
  description:
    'Full Stack Developer specializing in modern web technologies, 3D graphics, and creating exceptional digital experiences.',
  keywords: [
    'Full Stack Developer',
    'React',
    'Next.js',
    'Three.js',
    'TypeScript',
    'Web Developer',
    'Portfolio',
  ],
  authors: [{ name: 'John Doe' }],
  creator: 'John Doe',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://johndoe.dev',
    siteName: 'John Doe Portfolio',
    title: 'John Doe | Full Stack Developer',
    description:
      'Full Stack Developer specializing in modern web technologies, 3D graphics, and creating exceptional digital experiences.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'John Doe - Full Stack Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'John Doe | Full Stack Developer',
    description:
      'Full Stack Developer specializing in modern web technologies, 3D graphics, and creating exceptional digital experiences.',
    creator: '@johndoe',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
