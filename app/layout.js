import './globals.css'

export const metadata = {
  title: 'F.RAW 阜絡 — 球鞋媒體',
  description: '深入球鞋文化的核心——發售、評測、品牌故事。',
}

export default function RootLayout({ children }) {
  return (
    <html lang="zh-Hant">
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-8RV00LW052"></script>
        <script dangerouslySetInnerHTML={{ __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-8RV00LW052');
        `}} />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
