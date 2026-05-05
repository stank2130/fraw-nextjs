import './globals.css'

export const metadata = {
  title: 'F.RAW 阜絡 — 球鞋媒體',
  description: '深入球鞋文化的核心——發售、評測、品牌故事。',
}

export default function RootLayout({ children }) {
  return (
    <html lang="zh-Hant">
      <body>
        {children}
      </body>
    </html>
  )
}