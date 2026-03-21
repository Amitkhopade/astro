import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import Cursor from '../components/Cursor'

const inter = Inter({ subsets: ['latin'] })
const playfair = Playfair_Display({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Astral Nexus - AI-Native Vedic Astrology',
  description: 'Premium Vedic Astrology platform with AI-powered birth detail extraction',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-obsidian text-white min-h-screen`}>
        <Cursor />
        {children}
      </body>
    </html>
  )
}