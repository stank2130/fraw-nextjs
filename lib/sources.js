export const SOURCES = [
  // 球鞋 - 英文媒體
  { name: 'Sneaker News', url: 'https://sneakernews.com/feed/', lang: 'en', type: 'news' },
  { name: 'Nice Kicks', url: 'https://www.nicekicks.com/feed/', lang: 'en', type: 'news' },
  { name: 'Kicks On Fire', url: 'https://www.kicksonfire.com/feed/', lang: 'en', type: 'news' },
  { name: 'Hypebeast (Google News)', url: 'https://news.google.com/rss/search?q=sneaker+release+site:hypebeast.com&hl=en-US&gl=US&ceid=US:en', lang: 'en', type: 'release' },
  { name: 'Sneaker Releases (Google News)', url: 'https://news.google.com/rss/search?q=sneaker+release+2026&hl=en-US&gl=US&ceid=US:en', lang: 'en', type: 'release' },

  // 球鞋 - 中文媒體
  { name: 'KENLU', url: 'https://kenlu.net/feed/', lang: 'zh', type: 'news' },

  // 跑步 - 英文(主流大牌 + 競速)
  { name: 'Running Shoes (Google News)', url: 'https://news.google.com/rss/search?q=running+shoes+release+(Nike+OR+adidas+OR+ASICS+OR+HOKA+OR+%22New+Balance%22+OR+Saucony+OR+Brooks)&hl=en-US&gl=US&ceid=US:en', lang: 'en', type: 'running' },
  { name: 'Carbon Plate Racing (Google News)', url: 'https://news.google.com/rss/search?q=(Vaporfly+OR+Alphafly+OR+%22carbon+plate%22+OR+%22racing+shoe%22)+running&hl=en-US&gl=US&ceid=US:en', lang: 'en', type: 'running' },

  // 跑步 - 英文(小眾/設計師 + 聯名)
  { name: 'Running Niche Brands (Google News)', url: 'https://news.google.com/rss/search?q=(On+Running+OR+Norda+OR+Satisfy+OR+%22district+vision%22)+sneaker&hl=en-US&gl=US&ceid=US:en', lang: 'en', type: 'running' },
  { name: 'Running Collabs (Google News)', url: 'https://news.google.com/rss/search?q=running+shoe+collaboration&hl=en-US&gl=US&ceid=US:en', lang: 'en', type: 'running' },

  // 跑步 - 中文
  { name: '跑步新品 (Google News 中文)', url: 'https://news.google.com/rss/search?q=%E8%B7%91%E9%9E%8B+%E6%96%B0%E6%AC%BE&hl=zh-TW&gl=TW&ceid=TW:zh-Hant', lang: 'zh', type: 'running' },
  { name: '碳板跑鞋 (Google News 中文)', url: 'https://news.google.com/rss/search?q=%E7%A2%B3%E6%9D%BF%E8%B7%91%E9%9E%8B&hl=zh-TW&gl=TW&ceid=TW:zh-Hant', lang: 'zh', type: 'running' },
];
