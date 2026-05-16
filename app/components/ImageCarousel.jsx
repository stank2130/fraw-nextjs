'use client'
import { useState } from 'react'

const PROJECT_ID = 's1wp8h96'
const DATASET = 'production'

function getSanityImageUrl(image) {
  if (!image?.asset?._ref) return null
  const ref = image.asset._ref
  const [, id, dimensions, format] = ref.match(/image-([a-f0-9]+)-(\d+x\d+)-(\w+)/) || []
  if (!id) return null
  return `https://cdn.sanity.io/images/${PROJECT_ID}/${DATASET}/${id}-${dimensions}.${format}`
}

export default function ImageCarousel({ images }) {
  const [current, setCurrent] = useState(0)

  if (!images || images.length === 0) return null

  const prev = () => setCurrent(p => (p - 1 + images.length) % images.length)
  const next = () => setCurrent(p => (p + 1) % images.length)

  return (
    <div style={{ position: 'relative', margin: '2em 0', userSelect: 'none' }}>
      <style>{`
        .img-carousel-wrap { position: relative; width: 100%; overflow: hidden; background: var(--surface); }
        .img-carousel-track { display: flex; transition: transform 0.4s ease; }
        .img-carousel-slide { min-width: 100%; }
        .img-carousel-slide img { width: 100%; height: auto; display: block; max-height: 600px; object-fit: contain; }
        .img-carousel-btn { position: absolute; top: 50%; transform: translateY(-50%); background: rgba(10,10,10,0.7); border: 0.5px solid var(--border2); color: var(--text); width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 10; font-size: 16px; transition: background 0.2s; }
        .img-carousel-btn:hover { background: var(--accent); color: var(--accent-dark); }
        .img-carousel-btn-left { left: 12px; }
        .img-carousel-btn-right { right: 12px; }
        .img-carousel-dots { display: flex; justify-content: center; gap: 6px; margin-top: 12px; }
        .img-carousel-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--border2); border: none; cursor: pointer; padding: 0; transition: background 0.2s; }
        .img-carousel-dot.active { background: var(--accent); }
      `}</style>

      <div className="img-carousel-wrap">
        <div className="img-carousel-track" style={{ transform: `translateX(-${current * 100}%)` }}>
          {images.map((img, i) => {
            const url = getSanityImageUrl(img)
            return (
              <div key={i} className="img-carousel-slide">
                {url && <img src={url} alt={img.alt || `圖片 ${i + 1}`} />}
              </div>
            )
          })}
        </div>
        {images.length > 1 && (
          <>
            <button className="img-carousel-btn img-carousel-btn-left" onClick={prev}>←</button>
            <button className="img-carousel-btn img-carousel-btn-right" onClick={next}>→</button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="img-carousel-dots">
          {images.map((_, i) => (
            <button key={i} className={`img-carousel-dot${i === current ? ' active' : ''}`} onClick={() => setCurrent(i)} />
          ))}
        </div>
      )}

      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--muted)', textAlign: 'center', marginTop: '8px' }}>
        {current + 1} / {images.length}
      </div>
    </div>
  )
}
