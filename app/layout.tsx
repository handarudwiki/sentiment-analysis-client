import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'IKN Tweet Sentiment Analyzer',
  description: 'Analyze sentiment of tweets about Indonesia\'s new capital city using advanced ML algorithms',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}