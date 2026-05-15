'use client'
import { useEffect, useRef, useState } from 'react'

const STOCKS = [
  { proName: 'NYSE:NKE', title: 'Nike' },
  { proName: 'NASDAQ:LULU', title: 'Lululemon' },
  { proName: 'NYSE:ONON', title: 'On Holding' },
  { proName: 'OTC:ADDYY', title: 'Adidas' },
  { proName: 'NYSE:DECK', title: 'HOKA' },
  { proName: 'NYSE:UAA', title: 'Under Armour' },
  { proName: 'NYSE:SKX', title: 'Skechers' },
  { proName: 'NASDAQ:COLM', title: 'Columbia' },
  { proName: 'NYSE:VFC', title: 'VF Corp' },
  { proName: 'NYSE:BIRK', title: 'Birkenstock' },
  { proName: 'NYSE:YETI', title: 'YETI' },
  { proName: 'NYSE:WWW', title: 'Wolverine' },
  { proName: 'NASDAQ:CROX', title: 'Crocs' },
  { proName: 'NYSE:FL', title: 'Foot Locker' },
  { proName: 'NYSE:DKS', title: "Dick's Sporting" },
  { proName: 'NYSE:GOOS', title: 'Canada Goose' },
  { proName: 'OTC:PUMSY', title: 'Puma' },
  { proName: 'OTC:ASCCY', title: 'ASICS' },
  { proName: 'NYSE:ANF', title: 'Abercrombie' },
  { proName: 'NYSE:GIL', title: 'Gildan' },
]

function MiniCard({ proName, title, onSelect }) {
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) return
    ref.current.innerHTML = ''
    const script = document.createElement('script')
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js'
    script.async = true
    script.innerHTML = JSON.stringify({
      symbol: proName,
      width: '100%',
      height: '100%',
      locale: 'en',
      dateRange: '1M',
      colorTheme: 'dark',
      isTransparent: true,
      autosize: true,
    })
    ref.current.appendChild(script)
  }, [proName])

  return (
    <div
      onClick={() => onSelect({ proName, title })}
      style={{
        border: '0.5px solid var(--border)',
        background: 'var(--surface)',
        cursor: 'pointer',
        overflow: 'hidden',
        transition: 'border-color 0.2s',
      }}
      onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent)'}
      onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
    >
      <div style={{ padding: '8px 10px', borderBottom: '0.5px solid var(--border)' }}>
        <div style={{ fontFamily: 'var(--font-serif)', fontSize: '11px', fontWeight: 600, color: 'var(--text)' }}>{title}</div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '7px', color: 'var(--muted)', letterSpacing: '0.08em' }}>{proName}</div>
      </div>
      <div ref={ref} style={{ height: '80px', width: '100%' }} />
    </div>
  )
}

function Modal({ stock, onClose }) {
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) return
    ref.current.innerHTML = ''
    const script = document.createElement('script')
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js'
    script.async = true
    script.innerHTML = JSON.stringify({
      symbols: [[stock.title, stock.proName]],
      chartOnly: false,
      width: '100%',
      height: '100%',
      locale: 'en',
      colorTheme: 'dark',
      autosize: true,
      showVolume: false,
      hideDateRanges: false,
      scalePosition: 'right',
      scaleMode: 'Normal',
      fontSize: '10',
      noTimeScale: false,
      valuesTracking: '1',
    })
    ref.current.appendChild(script)

    const handleKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [stock])

  return (
    <div
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{ width: '90vw', maxWidth: '900px', height: '70vh', background: '#0A0A0A', border: '0.5px solid var(--border)', padding: '20px', position: 'relative' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>{stock.proName}</div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', fontWeight: 700, color: 'var(--text)' }}>{stock.title}</div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: '0.5px solid var(--border)', color: 'var(--muted)', cursor: 'pointer', padding: '4px 12px', fontFamily: 'var(--font-mono)', fontSize: '9px' }}>ESC ✕</button>
        </div>
        <div ref={ref} style={{ height: 'calc(100% - 60px)', width: '100%' }} />
      </div>
    </div>
  )
}

export default function StockTicker() {
  const tickerRef = useRef(null)
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    if (!tickerRef.current) return
    tickerRef.current.innerHTML = ''
    const script = document.createElement('script')
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js'
    script.async = true
    script.innerHTML = JSON.stringify({
      symbols: STOCKS,
      showSymbolLogo: false,
      colorTheme: 'dark',
      isTransparent: true,
      displayMode: 'compact',
      locale: 'en',
    })
    tickerRef.current.appendChild(script)
  }, [])

  return (
    <>
      {selected && <Modal stock={selected} onClose={() => setSelected(null)} />}

      <section style={{ borderBottom: '0.5px solid var(--border)' }}>
        <div style={{ padding: '0 32px', display: 'flex', alignItems: 'center', borderBottom: '0.5px solid var(--border)', height: '36px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--accent)' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text)' }}>運動產業股價</span>
          </div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '7px', color: 'var(--hint)', marginLeft: 'auto' }}>美股延遲 15 分鐘 · by TradingView</span>
        </div>

        <div ref={tickerRef} style={{ height: '46px', overflow: 'hidden' }} />

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '8px',
          padding: '16px 32px 24px',
        }}>
          <style>{`
            @media (max-width: 1024px) { .stock-grid { grid-template-columns: repeat(4, 1fr) !important; } }
            @media (max-width: 768px) { .stock-grid { grid-template-columns: repeat(2, 1fr) !important; } }
          `}</style>
          {STOCKS.map(stock => (
            <MiniCard key={stock.proName} proName={stock.proName} title={stock.title} onSelect={setSelected} />
          ))}
        </div>
      </section>
    </>
  )
}
