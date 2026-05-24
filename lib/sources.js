export const SOURCES = [
  // 球鞋 - 英文媒體
  { name: 'Sneaker News', url: 'https://sneakernews.com/feed/', lang: 'en', type: 'news' },
  { name: 'Nice Kicks', url: 'https://www.nicekicks.com/feed/', lang: 'en', type: 'news' },
  { name: 'Kicks On Fire', url: 'https://www.kicksonfire.com/feed/', lang: 'en', type: 'news' },
  { name: 'Sneaker Releases (Google News)', url: 'https://news.google.com/rss/search?q=sneaker+release+2026&hl=en-US&gl=US&ceid=US:en', lang: 'en', type: 'release' },

  // 球鞋 - 中文媒體
  { name: 'KENLU', url: 'https://kenlu.net/feed/', lang: 'zh', type: 'news' },

  // 跑步 - 品牌新品
  { name: 'Nike 跑鞋', url: 'https://news.google.com/rss/search?q=Nike+running+shoe+(Vaporfly+OR+Pegasus+OR+Alphafly+OR+Structure)&hl=en-US&gl=US&ceid=US:en', lang: 'en', type: 'running' },
  { name: 'adidas 跑鞋', url: 'https://news.google.com/rss/search?q=adidas+running+shoe+(Adizero+OR+Boston+OR+Adios+OR+Ultraboost)&hl=en-US&gl=US&ceid=US:en', lang: 'en', type: 'running' },
  { name: 'ASICS 跑鞋', url: 'https://news.google.com/rss/search?q=ASICS+running+shoe+(Metaspeed+OR+Nimbus+OR+Kayano+OR+Novablast)&hl=en-US&gl=US&ceid=US:en', lang: 'en', type: 'running' },
  { name: 'New Balance 跑鞋', url: 'https://news.google.com/rss/search?q=%22New+Balance%22+running+shoe+(SuperComp+OR+1080+OR+Rebel)&hl=en-US&gl=US&ceid=US:en', lang: 'en', type: 'running' },
  { name: 'HOKA 跑鞋', url: 'https://news.google.com/rss/search?q=HOKA+running+shoe&hl=en-US&gl=US&ceid=US:en', lang: 'en', type: 'running' },
  { name: 'On 昂跑', url: 'https://news.google.com/rss/search?q=%22On+Running%22+OR+%22On+Cloud%22+shoe&hl=en-US&gl=US&ceid=US:en', lang: 'en', type: 'running' },
  { name: 'Saucony / Brooks 跑鞋', url: 'https://news.google.com/rss/search?q=(Saucony+OR+Brooks)+running+shoe&hl=en-US&gl=US&ceid=US:en', lang: 'en', type: 'running' },
  { name: '碳板競速鞋', url: 'https://news.google.com/rss/search?q=carbon+plate+racing+shoe+marathon&hl=en-US&gl=US&ceid=US:en', lang: 'en', type: 'running' },
  { name: '跑步設計師品牌', url: 'https://news.google.com/rss/search?q=(Norda+OR+Satisfy+OR+%22district+vision%22+OR+Soar)+running&hl=en-US&gl=US&ceid=US:en', lang: 'en', type: 'running' },

  // 跑步 - 英文媒體 / 評測
  { name: "Runner's World", url: 'https://news.google.com/rss/search?q=site:runnersworld.com+running+shoe&hl=en-US&gl=US&ceid=US:en', lang: 'en', type: 'running' },
  { name: 'Believe in the Run', url: 'https://news.google.com/rss/search?q=site:believeintherun.com&hl=en-US&gl=US&ceid=US:en', lang: 'en', type: 'running' },
  { name: 'Doctors of Running', url: 'https://news.google.com/rss/search?q=site:doctorsofrunning.com&hl=en-US&gl=US&ceid=US:en', lang: 'en', type: 'running' },
  { name: 'CITIUS MAG', url: 'https://news.google.com/rss/search?q=site:citiusmag.com&hl=en-US&gl=US&ceid=US:en', lang: 'en', type: 'running' },
  { name: 'RunRepeat 評測', url: 'https://news.google.com/rss/search?q=site:runrepeat.com+running+shoe&hl=en-US&gl=US&ceid=US:en', lang: 'en', type: 'running' },

  // 跑步 - 日本媒體
  { name: '日本跑鞋新品', url: 'https://news.google.com/rss/search?q=%E3%83%A9%E3%83%B3%E3%83%8B%E3%83%B3%E3%82%B0%E3%82%B7%E3%83%A5%E3%83%BC%E3%82%BA+%E6%96%B0%E4%BD%9C&hl=ja&gl=JP&ceid=JP:ja', lang: 'ja', type: 'running' },
  { name: '日本厚底レーシング', url: 'https://news.google.com/rss/search?q=%E5%8E%9A%E5%BA%95+%E3%83%AC%E3%83%BC%E3%82%B7%E3%83%B3%E3%82%B0%E3%82%B7%E3%83%A5%E3%83%BC%E3%82%BA&hl=ja&gl=JP&ceid=JP:ja', lang: 'ja', type: 'running' },
  { name: 'RUNNET ニュース', url: 'https://news.google.com/rss/search?q=site:runnet.jp&hl=ja&gl=JP&ceid=JP:ja', lang: 'ja', type: 'running' },
  { name: 'RUNNAL', url: 'https://news.google.com/rss/search?q=site:runnal.com&hl=ja&gl=JP&ceid=JP:ja', lang: 'ja', type: 'running' },

  // 跑步 - 中國媒體
  { name: '中國跑鞋新品', url: 'https://news.google.com/rss/search?q=%E8%B7%91%E9%9E%8B+%E6%96%B0%E5%93%81&hl=zh-CN&gl=CN&ceid=CN:zh-Hans', lang: 'zh', type: 'running' },
  { name: '中國碳板跑鞋', url: 'https://news.google.com/rss/search?q=%E7%A2%B3%E6%9D%BF%E8%B7%91%E9%9E%8B+%E8%AF%84%E6%B5%8B&hl=zh-CN&gl=CN&ceid=CN:zh-Hans', lang: 'zh', type: 'running' },

  // 跑步 - 台灣 / 中文
  { name: '跑鞋新品 (中文)', url: 'https://news.google.com/rss/search?q=%E8%B7%91%E9%9E%8B+%E6%96%B0%E6%AC%BE&hl=zh-TW&gl=TW&ceid=TW:zh-Hant', lang: 'zh', type: 'running' },
  { name: '碳板跑鞋 (中文)', url: 'https://news.google.com/rss/search?q=%E7%A2%B3%E6%9D%BF%E8%B7%91%E9%9E%8B&hl=zh-TW&gl=TW&ceid=TW:zh-Hant', lang: 'zh', type: 'running' },
  { name: '馬拉松跑鞋 (中文)', url: 'https://news.google.com/rss/search?q=%E9%A6%AC%E6%8B%89%E6%9D%BE+%E8%B7%91%E9%9E%8B&hl=zh-TW&gl=TW&ceid=TW:zh-Hant', lang: 'zh', type: 'running' },
];

export const RECIPIENTS = [
  'stank2130@gmail.com',
];

export const SENDER = 'F.RAW Daily <onboarding@resend.dev>';
