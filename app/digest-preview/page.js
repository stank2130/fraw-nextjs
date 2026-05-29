'use client';

import { useState } from 'react';

export default function DigestPreview() {
  const [secret, setSecret] = useState('');
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendResult, setSendResult] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  async function fetchPreview() {
    setLoading(true);
    setError('');
    setData(null);
    setSendResult('');
    try {
      const res = await fetch(`/api/cron/digest/preview?key=${encodeURIComponent(secret)}`);
      if (!res.ok) {
        setError(`錯誤:${res.status} ${res.statusText}`);
        setLoading(false);
        return;
      }
      const json = await res.json();
      setData(json);
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  }

  async function sendEmail() {
    if (!confirm('確定要立刻寄出一封 email 嗎?')) return;
    setSending(true);
    setSendResult('');
    try {
      const res = await fetch(`/api/cron/digest?key=${encodeURIComponent(secret)}`);
      if (!res.ok) {
        setSendResult(`❌ 寄信失敗:${res.status} ${res.statusText}`);
        setSending(false);
        return;
      }
      const json = await res.json();
      if (json.ok) {
        setSendResult(`✅ 已寄出,共 ${json.count} 則`);
      } else {
        setSendResult(`⚠️ 沒寄出:${json.message || '未知原因'}`);
      }
    } catch (e) {
      setSendResult(`❌ 寄信失敗:${e.message}`);
    }
    setSending(false);
  }

  const groups = data?.items ? {
    release: data.items.filter(x => x.category === 'release'),
    sneaker: data.items.filter(x => x.category === 'sneaker'),
    running: data.items.filter(x => x.category === 'running'),
    brand: data.items.filter(x => x.category === 'brand'),
    culture: data.items.filter(x => x.category === 'culture'),
  } : null;

  const sectionStyle = { color: '#E8F03C', borderBottom: '2px solid #E8F03C', paddingBottom: 8, marginTop: 32 };
  const cardStyle = (priority) => ({
    margin: '16px 0',
    padding: 12,
    background: '#1a1a1a',
    borderLeft: `3px solid ${priority === 'high' ? '#E8F03C' : '#444'}`,
  });

  return (
    <div style={{ background: '#0A0A0A', minHeight: '100vh', color: '#fff', padding: 24 }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <h1 style={{ color: '#E8F03C', marginBottom: 8 }}>F.RAW 素材日報 - 預覽</h1>
        <p style={{ color: '#888', fontSize: 13, marginBottom: 24 }}>
          這頁只給你看,不會寄出 email。輸入 CRON_SECRET 後點按鈕抓取最新內容。
        </p>

        <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
          <input
            type="password"
            placeholder="貼上 CRON_SECRET"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            style={{
              flex: 1, minWidth: 200, padding: '10px 12px', background: '#1a1a1a',
              border: '1px solid #333', color: '#fff', borderRadius: 4,
            }}
          />
          <button
            onClick={fetchPreview}
            disabled={loading || !secret}
            style={{
              padding: '10px 20px', background: '#E8F03C', color: '#000',
              border: 'none', borderRadius: 4, cursor: 'pointer', fontWeight: 'bold',
            }}
          >
            {loading ? '抓取中...' : '預覽'}
          </button>
          <button
            onClick={sendEmail}
            disabled={sending || !secret}
            style={{
              padding: '10px 20px', background: '#1a1a1a', color: '#E8F03C',
              border: '1px solid #E8F03C', borderRadius: 4, cursor: 'pointer', fontWeight: 'bold',
            }}
            title="會立刻寄一封 email 給收件人清單"
          >
            {sending ? '寄送中...' : '✉️ 寄出 Email'}
          </button>
        </div>

        {sendResult && (
          <div style={{
            padding: 12, marginBottom: 16, borderRadius: 4,
            background: sendResult.startsWith('✅') ? '#102a10' : '#2a1010',
            color: sendResult.startsWith('✅') ? '#86efac' : '#ff6b6b',
          }}>
            {sendResult}
          </div>
        )}

        {loading && (
          <div style={{ color: '#888' }}>抓取 RSS + AI 摘要中,大約 30-60 秒...</div>
        )}

        {error && (
          <div style={{ color: '#ff6b6b', padding: 16, background: '#2a1010', borderRadius: 4 }}>
            {error}
          </div>
        )}

        {data && (
          <>
            <div style={{ color: '#888', fontSize: 13, marginBottom: 16 }}>
              共 {data.count} 則 · 過去 24 小時
            </div>

            {groups && Object.entries({
              '🔥 發售情報': groups.release,
              '👟 球鞋新聞': groups.sneaker,
              '🏃 跑步 / 機能': groups.running,
              '🏷️ 品牌動態': groups.brand,
              '🎨 文化 / 聯名': groups.culture,
            }).map(([title, items]) => items.length > 0 && (
              <div key={title}>
                <h2 style={sectionStyle}>{title}({items.length})</h2>
                {items.map((it, i) => (
                  <div key={i} style={cardStyle(it.priority)}>
                    <div style={{ fontSize: 12, color: '#888', marginBottom: 4 }}>
                      {it.source} · {it.priority?.toUpperCase()}
                    </div>
                    <div style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 6 }}>
                      {it.zhTitle}
                    </div>
                    <div style={{ fontSize: 14, color: '#ccc', marginBottom: 8 }}>
                      {it.summary}
                    </div>
                    <a href={it.link} target="_blank" rel="noopener noreferrer"
                       style={{ fontSize: 12, color: '#E8F03C', textDecoration: 'none' }}>
                      原文連結 →
                    </a>
                  </div>
                ))}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
