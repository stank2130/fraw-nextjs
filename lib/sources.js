// RSS 來源清單
export const SOURCES = [
  // 英文媒體
  { name: 'Sneaker News', url: 'https://sneakernews.com/feed/', lang: 'en', type: 'news' },
  { name: 'Nice Kicks', url: 'https://www.nicekicks.com/feed/', lang: 'en', type: 'news' },
  { name: 'Kicks On Fire', url: 'https://www.kicksonfire.com/feed/', lang: 'en', type: 'news' },
  { name: 'Hypebeast (Google News)', url: 'https://news.google.com/rss/search?q=sneaker+release+site:hypebeast.com&hl=en-US&gl=US&ceid=US:en', lang: 'en', type: 'release' },
  { name: 'Sneaker Releases (Google News)', url: 'https://news.google.com/rss/search?q=sneaker+release+2026&hl=en-US&gl=US&ceid=US:en', lang: 'en', type: 'release' },

  // 中文媒體
  { name: 'KENLU', url: 'https://kenlu.net/feed/', lang: 'zh', type: 'news' },
];

// 收件人清單
export const RECIPIENTS = [
  'stank2130@gmail.com', // ← 換成你的(保持你之前填的那個)
];

// 寄件人
export const SENDER = 'F.RAW Daily <onboarding@resend.dev>';
