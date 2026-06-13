import './globals.css'
import Script from 'next/script'

export const metadata = {
  title: 'F.RAW 阜絡 — 球鞋媒體',
  description: '深入球鞋文化的核心——發售、評測、品牌故事。',
}

export default function RootLayout({ children }) {
  return (
    <html lang="zh-Hant">
      <head>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-8RV00LW052"
          strategy="afterInteractive"
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-8RV00LW052');
          `}}
        />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7625608357926380"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
