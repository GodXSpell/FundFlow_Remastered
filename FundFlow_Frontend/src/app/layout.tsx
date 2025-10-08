import type { Metadata, Viewport } from 'next'
import { ThemeProvider } from 'next-themes'
import { Inter } from 'next/font/google'
import { Toaster } from 'sonner'

import '@/styles/globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
})

export const metadata: Metadata = {
  title: {
    default: 'FundFlow - Personal Finance Manager',
    template: '%s | FundFlow'
  },
  description: 'Modern personal finance management application built with Next.js, TypeScript, and Tailwind CSS.',
  keywords: [
    'finance',
    'personal finance',
    'budgeting',
    'expense tracker',
    'money management',
    'financial planning'
  ],
  authors: [
    {
      name: 'FundFlow Team',
      url: 'https://fundflow.app'
    }
  ],
  creator: 'FundFlow Team',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://fundflow.app',
    title: 'FundFlow - Personal Finance Manager',
    description: 'Modern personal finance management application',
    siteName: 'FundFlow',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'FundFlow - Personal Finance Manager'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FundFlow - Personal Finance Manager',
    description: 'Modern personal finance management application',
    images: ['/images/og-image.png'],
    creator: '@fundflow'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  verification: {
    google: 'verification_token_here',
    yandex: 'verification_token_here'
  },
  manifest: '/manifest.json'
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' }
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster
            position="top-right"
            richColors
            closeButton
            expand
            visibleToasts={4}
          />
        </ThemeProvider>
      </body>
    </html>
  )
}