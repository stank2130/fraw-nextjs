'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

function formatDate(dateStr) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('zh-TW', { month: 'long', day: 'numeric' })
}

function catLabel(key) {
  const map = {
    review: '評測',
    unboxing: '開箱',
    culture: '文化',
    release: '發售',
    'brand-story': '品牌故事',
  }
  return map[key] || key
}

export default function HeroCarousel({ articles }) {
  const [current, setCurrent] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!articles || articles.length <= 1) return
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % articles.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [articles])

  const prev = () => setCurrent(p => (p - 1 + articles.length) % articles.length)
  const next = () => setCurrent(p => (p + 1) % articles.length)

  if (!articles || articles.length === 0) return null

  const article = articles[current]

  return (
    <>
      <style>{`
        .hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 520px;
          border-bottom: 0.5px solid var(--border);
        }
        .hero-text {
          padding: 52px 44px;
          border-right: 0.5px solid var(--border);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .hero-title {
          font-family: var(--font-serif);
          font-size: 52px;
          font-weight: 700;
          line-height: 1.05;
          letter-spacing: 0.04em;
          margin-bottom: 20px;
          color: var(--text);
        }
        .hero-image-wrap {
          background: var(--surface);
          position: relative;
          overflow: hidden;
          min-height: 300px;
        }
        .hero-image-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          position: absolute;
          top: 0; left: 0;
        }
        .hero-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(10,10,10,0.7);
          border: 0.5px solid var(--border2);
          color: var(--text);
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 20;
          font-size: 16px;
        }
        .hero-arrow:hover { background: var(--accent); color: var(--accent-dark); }
        .hero-arrow-left { left: 12px; }
        .hero-arrow-right { right: 12px; }
        .hero-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--border2);
          cursor: pointer;
          border: none;
          padding: 0;
          display: inline-block;
          transition: background 0.2s;
        }
        .hero-dot.active { background: var(--accent); }

        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr; min-height: unset; }
          .hero-text { padding: 28px 20px; border-right: none; border-bottom: 0.5px solid var(--border); order: 2; }
          .hero-title { font-size: 30px; }
          .hero-image-wrap { min-height: 220px; order: 1; }
        }
      `}</style>

      <section className="hero-grid">
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
              <Link href={`/article/${article.slug?.current}`} style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.12em', textTransform: 'uppercase', borderBottom: '1px solid var(--accent)', paddingBottom: '2px', color: 'var(--text)', textDecoration: 'none' }}>
                閱讀全文 →
              </Link>
            </div>
            {mounted && articles.length > 1 && (
              <div style={{ display: 'flex', gap: '8px' }}>
                {articles.map((_, i) => (
                  <button key={i} className={`hero-dot${i === current ? ' active' : ''}`} onClick={() => setCurrent(i)} />
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="hero-image-wrap">
          {article.coverImageUrl && (
            <img src={article.coverImageUrl} alt={article.title} />
          )}
          {mounted && articles.length > 1 && (
            <>
              <button className="hero-arrow hero-arrow-left" onClick={prev}>←</button>
              <button className="hero-arrow hero-arrow-right" onClick={next}>→</button>
            </>
          )}
        </div>
      </section>
    </>
  )
}
