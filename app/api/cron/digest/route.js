import Parser from 'rss-parser';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Resend } from 'resend';
import { SOURCES, RECIPIENTS, SENDER } from '../../../../lib/sources';

export const maxDuration = 60;
export const dynamic = 'force-dynamic';

const HOURS_BACK = 24;

export async function GET(request) {
  const auth = request.headers.get('authorization');
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', { status: 401 });
  }

  const parser = new Parser({ timeout: 15000 });
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const resend = new Resend(process.env.RESEND_API_KEY);

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
    return Response.json({ ok: true, message: 'No new items', count: 0 });
  }

  const prompt = `你是球鞋媒體 F.RAW 的素材編輯。下面是今天從各來源抓到的 ${allItems.length} 則內容。

請幫每則做:
1. 中文標題(20 字內,直接、不要農場標)
2. 一句話摘要(40 字內)
3. 分類:release(發售) / sneaker(球鞋新聞) / brand(品牌動態) / culture(文化/聯名)
4. 重要度:high / medium / low(依台灣讀者興趣判斷,Nike/adidas/聯名款/限量款優先)
5. 若內容與球鞋、跑鞋、時尚、運動完全無關(例如美食、手錶、影劇),重要度設為 low

只輸出 JSON 陣列,不要加任何前後說明文字、不要加 markdown 程式碼框,格式:
[{"index":0,"zhTitle":"...","summary":"...","category":"...","priority":"..."}]

內容:
${allItems.map((it, i) => `[${i}] (${it.source}) ${it.title}\n${it.contentSnippet}`).join('\n\n')}`;

  let processed = [];
  const modelsToTry = ['gemini-flash-latest', 'gemini-flash-lite-latest', 'gemini-2.5-flash'];
  let lastError = null;

  for (const modelName of modelsToTry) {
    let success = false;
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent(prompt);
        const text = result.response.text();
        const jsonMatch = text.match(/\[[\s\S]*\]/);
        processed = JSON.parse(jsonMatch[0]);
        console.log(`AI success with model: ${modelName}, attempt: ${attempt + 1}`);
        success = true;
        break;
      } catch (err) {
        lastError = err;
        console.error(`[${modelName}] attempt ${attempt + 1} failed:`, err.message);
        if (err.status === 503 || err.status === 429) {
          await new Promise((r) => setTimeout(r, 2000));
        } else {
          break;
        }
      }
    }
    if (success) break;
  }

  if (processed.length === 0) {
    console.error('All AI attempts failed:', lastError?.message);
    processed = allItems.map((_, i) => ({
      index: i,
      zhTitle: allItems[i].title,
      summary: '',
      category: 'sneaker',
      priority: 'medium',
    }));
  }

  // 來源強制分類:跑步來源一律歸 running
  const enriched = processed.map((p) => {
    const item = { ...allItems[p.index], ...p };
    if (item.type === 'running') {
      item.category = 'running';
    }
    return item;
  });

  const groups = {
    release: enriched.filter((x) => x.category === 'release').sort(byPriority),
    sneaker: enriched.filter((x) => x.category === 'sneaker').sort(byPriority),
    running: enriched.filter((x) => x.category === 'running').sort(byPriority),
    brand: enriched.filter((x) => x.category === 'brand').sort(byPriority),
    culture: enriched.filter((x) => x.category === 'culture').sort(byPriority),
  };

  const html = renderEmail(groups);
  const today = new Date().toLocaleDateString('zh-TW', { timeZone: 'Asia/Taipei' });

  await resend.emails.send({
    from: SENDER,
    to: RECIPIENTS,
    subject: `F.RAW 素材日報 ${today}(${enriched.length} 則)`,
    html,
  });

  return Response.json({ ok: true, count: enriched.length });
}

function byPriority(a, b) {
  const order = { high: 0, medium: 1, low: 2 };
  return order[a.priority] - order[b.priority];
}

function renderEmail(groups) {
  const section = (title, items, color) => {
    if (items.length === 0) return '';
    return `
      <h2 style="color:${color};border-bottom:2px solid ${color};padding-bottom:8px;margin-top:32px;font-family:'Noto Serif TC',serif;">${title}(${items.length})</h2>
      ${items
        .map(
          (it) => `
        <div style="margin:16px 0;padding:12px;background:#1a1a1a;border-left:3px solid ${it.priority === 'high' ? '#E8F03C' : '#444'};">
          <div style="font-size:12px;color:#888;margin-bottom:4px;">${it.source} · ${it.priority?.toUpperCase() || ''}</div>
          <div style="font-size:16px;color:#fff;font-weight:bold;margin-bottom:6px;">${it.zhTitle}</div>
          <div style="font-size:14px;color:#ccc;margin-bottom:8px;">${it.summary}</div>
          <a href="${it.link}" style="font-size:12px;color:#E8F03C;text-decoration:none;">原文連結 →</a>
        </div>
      `
        )
        .join('')}
    `;
  };

  return `
    <div style="background:#0A0A0A;padding:24px;font-family:-apple-system,sans-serif;color:#fff;max-width:680px;margin:0 auto;">
      <h1 style="color:#E8F03C;font-family:'Noto Serif TC',serif;margin:0 0 8px 0;">F.RAW 素材日報</h1>
      <div style="color:#888;font-size:13px;margin-bottom:8px;">${new Date().toLocaleDateString('zh-TW', { timeZone: 'Asia/Taipei' })}</div>
      ${section('🔥 發售情報', groups.release, '#E8F03C')}
      ${section('👟 球鞋新聞', groups.sneaker, '#E8F03C')}
      ${section('🏃 跑步 / 機能', groups.running, '#E8F03C')}
      ${section('🏷️ 品牌動態', groups.brand, '#E8F03C')}
      ${section('🎨 文化 / 聯名', groups.culture, '#E8F03C')}
      <div style="margin-top:32px;padding-top:16px;border-top:1px solid #333;color:#666;font-size:12px;">
        F.RAW 阜絡 · fraw.tw
      </div>
    </div>
  `;
}
