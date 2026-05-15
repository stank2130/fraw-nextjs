'use client'
import { useEffect, useRef } from 'react'

const STOCKS = [
  { proName: 'NYSE:NKE', title: 'Nike' },
  { proName: 'OTC:ADDYY', title: 'Adidas' },
  { proName: 'OTC:PUMSY', title: 'Puma' },
  { proName: 'OTC:ASCCY', title: 'ASICS' },
  { proName: 'NASDAQ:LULU', title: 'Lululemon' },
  { proName: 'NYSE:ONON', title: 'On Holding' },
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
  { proName: 'NYSE:ANF', title: 'Abercrombie' },
  { proName: 'NYSE:GIL', title: 'Gildan' },
]

export default function StockTicker() {
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) return
    ref.current.innerHTML = ''
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
    ref.current.appendChild(script)
  }, [])

  return (
    <section style={{ borderBottom: '0.5px solid var(--border)' }}>
      <style>{`
        @media (max-width: 768px) { .stock-ticker-wrap { display: none !important; } }
      `}</style>
      <div className="stock-ticker-wrap" style={{ display: 'block' }}>
        <div style={{ padding: '0 32px', display: 'flex', alignItems: 'center', borderBottom: '0.5px solid var(--border)', height: '36px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--accent)' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text)' }}>運動產業股價</span>
          </div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '7px', color: 'var(--hint)', marginLeft: 'auto' }}>美股延遲 15 分鐘 · by TradingView</span>
        </div>
        <div ref={ref} style={{ height: '46px', overflow: 'hidden' }} />
      </div>
    </section>
  )
}
