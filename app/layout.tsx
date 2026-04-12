import type { Metadata, Viewport } from 'next'
import { Noto_Sans_KR, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const notoSansKr = Noto_Sans_KR({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-sans"
});

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif"
});

export const metadata: Metadata = {
  title: '소담인테리어 | 주거공간 인테리어 전문',
  description: ''부산 경남 대구 주거·상업공간 인테리어 전문업체. 고객 맞춤 설계와 합리적인 견적을 제공합니다.',
  keywords: ['인테리어', '리모델링', '주거공간', '상업공간', '인테리어 디자인', '소담인테리어', '부산인테리어', '인테리어견적'],
  metadataBase: new URL('https://sodamspace.com'),
  verification: {
  google: 'S8uuX39bwLMQIZawrRNTQMZlhzkU8QzR5pjmJLttg5w'
  },
  openGraph: {
    title: '소담인테리어 | 주거공간 인테리어 전문',
    description: '부산 경남 대구 주거·상업공간 인테리어 전문업체. 고객 맞춤 설계와 합리적인 견적을 제공합니다.',
    url: 'https://sodamspace.com',
    siteName: '소담인테리어',
    locale: 'ko_KR',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/icon.png',
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#c4784a',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body className={`${notoSansKr.variable} ${playfair.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
