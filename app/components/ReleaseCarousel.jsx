'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function ReleaseCarousel({ releases }) {
  const [pos, setPos] = useState(0)

  const CARD_WIDTH = 220
  const GAP = 14
  const STEP = CARD_WIDTH + GAP

const total = releases.length
const maxPos = total * STEP
const prev = () => setPos(p => (p - STEP * 2 + maxPos) % maxPos)
const next = () => setPos(p => (p + STEP * 2) % maxPos)

  const currencySymbol = (currency) => {
    const map = { USD: '$', TWD: 'NT$', RMB: '¥', JPY: '¥', HKD: 'HK$', EUR: '€', GBP: '£' }
    return map[currency] || '$'
  }

  const PROJECT_ID = 's1wp8h96'
  const DATASET = 'production'

  function getImageUrl(image) {
    if (!image?.asset?._ref) return null
    const ref = image.asset._ref
    const [, id, dimensions, format] = ref.match(/image-([a-f0-9]+)-(\d+x\d+)-(\w+)/) || []
    if (!id) return null
    return `https://cdn.sanity.io/images/${PROJECT_ID}/${DATASET}/${id}-${dimensions}.${format}`
  }

  return (
    <div style={{ position: 'relative', padding: '0 28px' }}>
      <style>{`
        .release-carousel-track {
          display: flex;
          gap: 14px;
          transition: transform 0.4s ease;
          align-items: stretch;
        }
        .release-carousel-card {
          flex-shrink: 0;
          width: 220px;
          text-decoration: none;
          display: flex;
          flex-direction: column;
        }
        .release-carousel-inner {
          background: var(--surface);
          border: 0.5px solid var(--border);
          padding: 12px;
          position: relative;
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        .release-carousel-inner.hot {
          background: #0C0B00;
          border-color: #3A3800;
        }
        .release-carousel-btn {
          position: absolute;
          top: 42%;
          transform: translateY(-50%);
          background: var(--accent);
          border: none;
          color: #000;
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 10;
          font-size: 20px;
          font-weight: 700;
          transition: opacity 0.2s;
          box-shadow: 0 2px 12px rgba(0,0,0,0.4);
        }
        .release-carousel-btn:hover { opacity: 0.85; }
        .release-carousel-btn-left { left: -8px; }
        .release-carousel-btn-right { right: -8px; }
        @media (max-width: 768px) {
          .release-carousel-card { width: 160px; }
          .release-carousel-btn { display: none; }
        }
      `}</style>

      <div style={{ overflow: 'hidden' }}>
        <div
          className="release-carousel-track"
          style={{ transform: `translateX(-${pos}px)` }}
        >
          {releases.map(release => {
            const imgUrl = getImageUrl(release.image)
            return (
              <Link key={release._id} href={`/releases/${release.slug?.current}`} className="release-carousel-card">
                <div className={`release-carousel-inner${release.hot ? ' hot' : ''}`}>
                  {/* 本週強推標籤放右上角 */}
                  {release.hot && (
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'var(--accent)' }} />
                  )}
                  {release.hot && (
                    <span style={{
                      position: 'absolute', top: '8px', right: '8px',
                      fontFamily: 'var(--font-mono)', fontSize: '6px',
                      background: 'var(--accent)', color: 'var(--accent-dark)',
                      padding: '2px 6px', letterSpacing: '0.1em', textTransform: 'uppercase',
                      zIndex: 1
                    }}>本週強推</span>
                  )}

                  {/* 圖片 */}
                  <div style={{ width: '100%', aspectRatio: '1/1', background: 'var(--surface2)', marginBottom: '10px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {imgUrl ? (
                      <img src={imgUrl} alt={release.name} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '8px' }} />
                    ) : (
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', color: 'var(--hint)' }}>圖片</span>
                    )}
                  </div>

                  {/* 品牌 */}
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '7px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '4px' }}>{release.brand}</div>

                  {/* 名稱 - flex-grow 讓高度一致 */}
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: '11px', fontWeight: 600, lineHeight: 1.4, color: release.hot ? 'var(--accent)' : 'var(--text)', marginBottom: '10px', flexGrow: 1 }}>{release.name}</div>

                  {/* 日期 + 價格 */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '7px', color: 'var(--muted)' }}>{release.releaseDate}</span>
                    {release.price?.amount && (
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--accent)' }}>
                        {currencySymbol(release.price.currency)}{release.price.amount.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      <button className="release-carousel-btn release-carousel-btn-left" onClick={prev}>←</button>
      <button className="release-carousel-btn release-carousel-btn-right" onClick={next}>→</button>
    </div>
  )
}
