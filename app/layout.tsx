import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'E-Notary Dubai — Notary Support Dubai',
  description: 'Professional notary support services in Dubai, UAE',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
}

// Root layout — intentionally minimal.
// The real <html> and <body> tags are rendered by app/[lang]/layout.tsx
// which handles lang, dir, fonts, Navbar, Footer, and GA.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children
}
