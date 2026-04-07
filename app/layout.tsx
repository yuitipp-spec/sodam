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
  description: '인간과 환경, 문화와 기술의 고감을 주요 디자인 컨셉으로 하여, 미래 지향적인 시각, 좋은 감각, 적극적인 의지, 진정한 프로페셔널로 고객의 라이프 스타일에 맞춤 프로젝트를 완성시키고 있습니다.',
  keywords: ['인테리어', '리모델링', '주거공간', '상업공간', '인테리어 디자인', '소담인테리어', '부산인테리어', '인테리어견적'],
  metadataBase: new URL('https://sodamspace.com'),
  verification: {
  google: '<"<meta name="google-site-verification" content="O08VMR72WKlIQYQU-hdI_6FAeZAtt3aek5bRJOZJZag" />" />',
},
  openGraph: {
    title: '소담인테리어 | 주거공간 인테리어 전문',
    description: '고객의 라이프 스타일에 맞춘 주거·상업공간 인테리어 전문',
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
