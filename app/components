'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

function formatDate(dateStr) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('zh-TW', { month: 'long', day: 'numeric' })
}

export default function HeroCarousel({ articles, catLabel }) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (articles.length <= 1) return
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % articles.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [articles.length])

  const prev = () => setCurrent(prev => (prev - 1 + articles.length) % articles.length)
  const next = () => setCurrent(prev => (prev + 1) % articles.length)

  if (!articles || articles.length === 0) return null
  const article = articles[current]

  return (
    <section style={{
      display: 'grid', gridTemplateColumns: '1fr 1fr',
      minHeight: '520px', borderBottom: '0.5px solid var(--border)',
      position: 'relative'
    }}
    className="hero-grid">

      <style>{`
        .hero-grid { display: grid; grid-template-columns: 1fr 1fr; min-height: 520px; border-bottom: 0.5px solid var(--border); position: relative; }
        .hero-text { padding: 52px 44px; border-right: 0.5px solid var(--border); display: flex; flex-direction: column; justify-content: space-between; }
        .hero-title { font-family: var(--font-serif); font-size: 52px; font-weight: 700; line-height: 1.05; letter-spacing: 0.04em; margin-bottom: 20px; }
        .hero-image { background: var(--surface); position: relative; overflow: hidden; display: flex; align-items: center; justify-content: center; min-height: 300px; }
        .hero-arrow { position: absolute; top: 50%; transform: translateY(-50%); background: rgba(10,10,10,0.6); border: 0.5px solid var(--border2); color: var(--text); width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 10; font-size: 14px; transition: background 0.2s; }
        .hero-arrow:hover { background: var(--accent); color: var(--accent-dark); }
        .hero-arrow-left { left: 12px; }
        .hero-arrow-right { right: 12px; }
        .hero-dots { position: absolute; bottom: 16px; left: 50%; transform: translateX(-50%); display: flex; gap: 8px; z-index: 10; }
        .hero-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--border2); cursor: pointer; transition: background 0.2s; border: none; padding: 0; }
        .hero-dot.active { background: var(--accent); }
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr; min-height: unset; }
          .hero-text { padding: 28px 20px; border-right: none; border-bottom: 0.5px solid var(--border); order: 2; }
          .hero-title { font-size: 30px; }
          .hero-image { min-height: 220px; order: 1; }
        }
      `}</style>

      {/* 文字區 */}
      <div className="hero-text">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--accent)' }}>封面故事</span>
            <div style={{ flex: 1, height: '0.5px', background: 'var(--border2)' }}></div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', border: '0.5px solid var(--border2)', color: 'var(--muted)', padding: '2px 10px' }}>
              {catLabel(article.category)}
            </span>
          </div>
          <h1 className="hero-title">{article.title}</h1>
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: '13px', fontWeight: 300, color: 'var(--text2)', lineHeight: 1.9, maxWidth: '340px', marginBottom: '36px' }}>
            {article.excerpt}
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--muted)', letterSpacing: '0.06em' }}>
              {formatDate(article.publishedAt)}
              {article.readTime && ` · ${article.readTime} 分鐘`}
            </span>
            <Link href={`/article/${article.slug?.current}`} style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.12em', textTransform: 'uppercase', borderBottom: '1px solid var(--accent)', paddingBottom: '2px' }}>
              閱讀全文 →
            </Link>
          </div>
          {/* 圓點 */}
          {articles.length > 1 && (
            <div style={{ display: 'flex', gap: '8px' }}>
              {articles.map((_, i) => (
                <button key={i} className={`hero-dot${i === current ? ' active' : ''}`} onClick={() => setCurrent(i)} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 圖片區 */}
      <div className="hero-image">
        {article.coverImage ? (
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        ) : (
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--hint)' }}>封面圖片</span>
        )}
        {/* 左右箭頭 */}
        {articles.length > 1 && (
          <>
            <button className="hero-arrow hero-arrow-left" onClick={prev}>←</button>
            <button className="hero-arrow hero-arrow-right" onClick={next}>→</button>
          </>
        )}
      </div>
    </section>
  )
}
