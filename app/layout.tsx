import type { Metadata } from 'next'
import './globals.css'
import CursorGlow from '@/components/CursorGlow'
import ScrollProgress from '@/components/ScrollProgress'
import BackToTop from '@/components/BackToTop'

export const metadata: Metadata = {
  icons: {
    icon: [{ url: '/logos/ak-emblem.png', type: 'image/png' }],
    shortcut: '/logos/ak-emblem.png',
    apple: '/logos/ak-emblem.png',
  },
  title: 'Ahetesham Khan — AI Engineer & Data Scientist',
  description:
    'AI Engineer & Data Scientist specializing in ML, Deep Learning, NLP, Generative AI, and Agentic AI. Building end-to-end AI systems from LLM-powered agents to production ML pipelines.',
  keywords: [
    'AI Engineer',
    'Data Scientist',
    'Machine Learning',
    'Deep Learning',
    'NLP',
    'Generative AI',
    'Agentic AI',
    'Python',
    'TensorFlow',
    'PyTorch',
  ],
  authors: [{ name: 'Ahetesham Khan' }],
  openGraph: {
    title: 'Ahetesham Khan — AI Engineer & Data Scientist',
    description:
      'Building end-to-end AI systems — from LLM-powered agents to production ML pipelines.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Ahetesham Khan Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ahetesham Khan — AI Engineer & Data Scientist',
    description:
      'Building end-to-end AI systems — from LLM-powered agents to production ML pipelines.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Fonts load in parallel with the document instead of a serial CSS @import */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&family=Black+Ops+One&family=Chakra+Petch:wght@400;500;600;700&display=swap"
        />
        {/* Hero reveal card is the LCP image — fetch it first */}
        <link rel="preload" as="image" href="/portfolio/cyborg.jpg" fetchPriority="high" />
      </head>
      <body className="min-h-screen antialiased page-reveal">
        <ScrollProgress />
        <CursorGlow />
        {children}
        <BackToTop />
      </body>
    </html>
  )
}
