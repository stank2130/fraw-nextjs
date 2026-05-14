import Parser from 'rss-parser';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { SOURCES } from '../../../../../lib/sources';

export const maxDuration = 60;
export const dynamic = 'force-dynamic';

const HOURS_BACK = 24;

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get('key');
  if (key !== process.env.CRON_SECRET) {
    return new Response('Unauthorized', { status: 401 });
  }

  const parser = new Parser({ timeout: 15000 });
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

  const cutoff = Date.now() - HOURS_BACK * 60 * 60 * 1000;
  const allItems = [];

  for (const source of SOURCES) {
    try {
      const feed = await parser.parseURL(source.url);
      const items = feed.items
        .filter((item) => {
          const date = new Date(item.pubDate || item.isoDate).getTime();
          return date > cutoff;
        })
        .slice(0, 5)
        .map((item) => ({
          source: source.name,
          lang: source.lang,
          type: source.type,
          title: item.title,
          link: item.link,
          pubDate: item.pubDate || item.isoDate,
          contentSnippet: (item.contentSnippet || item.content || '').slice(0, 500),
        }));
      allItems.push(...items);
    } catch (err) {
      console.error(`[${source.name}] failed:`, err.message);
    }
  }

  if (allItems.length === 0) {
    return Response.json({ ok: true, message: '過去 24 小時沒有新內容', count: 0, items: [] });
  }

  const prompt = `你是球鞋媒體 F.RAW 的素材編輯。下面是今天從各來源抓到的 ${allItems.length} 則內容。

請幫每則做:
1. 中文標題(20 字內,直接、不要農場標)
2. 一句話摘要(40 字內)
3. 分類:release(發售) / sneaker(球鞋新聞) / brand(品牌動態) / culture(文化/聯名)
4. 重要度:high / medium / low(依台灣讀者興趣判斷,Nike/adidas/聯名款/限量款優先)

只輸出 JSON 陣列,不要加任何前後說明文字、不要加 markdown 程式碼框,格式:
[{"index":0,"zhTitle":"...","summary":"...","category":"...","priority":"..."}]

內容:
${allItems.map((it, i) => `[${i}] (${it.source}) ${it.title}\n${it.contentSnippet}`).join('\n\n')}`;

  let processed = [];
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-flash-latest' });
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    processed = JSON.parse(jsonMatch[0]);
  } catch (err) {
    console.error('AI parse failed:', err);
    processed = allItems.map((_, i) => ({
      index: i,
      zhTitle: allItems[i].title,
      summary: '(AI 摘要失敗,顯示原標題)',
      category: 'sneaker',
      priority: 'medium',
    }));
  }

  const enriched = processed.map((p) => ({ ...allItems[p.index], ...p }));

  return Response.json({ ok: true, count: enriched.length, items: enriched });
}
