import type { Metadata } from 'next'
import { Playfair_Display, Sarabun } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500', '600', '700'],
})

const sarabun = Sarabun({
  subsets: ['thai', 'latin'],
  variable: '--font-body',
  weight: ['300', '400', '500', '600'],
})

export const metadata: Metadata = {
  title: 'ไดอารี่แห่งความทรงจำ ✨',
  description: 'บันทึกทุกช่วงเวลาที่สวยงามของชีวิต',
  keywords: ['diary', 'journal', 'ไดอารี่', 'บันทึก', 'ความทรงจำ'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="th" className={`${playfair.variable} ${sarabun.variable}`}>
      <body className="font-body bg-cream-50 text-ink-dark antialiased">
        {children}
        <Toaster
          position="bottom-center"
          toastOptions={{
            style: {
              background: '#fdfaf5',
              color: '#1a1520',
              border: '1px solid #edd5a8',
              borderRadius: '16px',
              fontFamily: 'Sarabun, sans-serif',
              fontSize: '14px',
              boxShadow: '0 4px 20px rgba(180,140,100,0.15)',
            },
          }}
        />
      </body>
    </html>
  )
}
