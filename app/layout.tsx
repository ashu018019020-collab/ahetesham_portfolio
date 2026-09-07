import type { Metadata } from 'next'
import './globals.css'
import CursorGlow from '@/components/CursorGlow'
import ScrollProgress from '@/components/ScrollProgress'
import BackToTop from '@/components/BackToTop'

export const metadata: Metadata = {
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
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
      <body className="min-h-screen antialiased page-reveal">
        <ScrollProgress />
        <CursorGlow />
        {children}
        <BackToTop />
      </body>
    </html>
  )
}
