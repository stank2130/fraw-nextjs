// RSS 來源清單,之後要加減在這裡改
export const SOURCES = [
  // 英文媒體
  { name: 'Hypebeast Sneakers', url: 'https://hypebeast.com/footwear/feed', lang: 'en', type: 'news' },
  { name: 'Sneaker News', url: 'https://sneakernews.com/feed/', lang: 'en', type: 'news' },
  { name: 'Highsnobiety Sneakers', url: 'https://www.highsnobiety.com/tags/sneakers/feed/', lang: 'en', type: 'news' },
  { name: 'Sole Retriever', url: 'https://soleretriever.com/rss/sneaker-release-dates', lang: 'en', type: 'release' },

  // 中文媒體
  { name: 'KENLU', url: 'https://kenlu.net/feed/', lang: 'zh', type: 'news' },
  { name: '鞋帶 Shoes Master', url: 'https://www.shoes-master.com.tw/feed/', lang: 'zh', type: 'news' },
];

// 收件人清單,加夥伴就在這裡多放幾個 email
export const RECIPIENTS = [
  'stank2130@gmail.com',
];

// 寄件人:還沒驗證網域之前先用 onboarding@resend.dev
export const SENDER = 'F.RAW Daily <onboarding@resend.dev>';
