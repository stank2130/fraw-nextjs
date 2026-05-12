'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

export default function SearchBar() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const inputRef = useRef(null)
  const wrapRef = useRef(null)

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus()
  }, [open])

  useEffect(() => {
    const handleClick = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setOpen(false)
        setQuery('')
        setResults([])
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  useEffect(() => {
    if (!query.trim()) { setResults([]); return }
    const timer = setTimeout(async () => {
      setLoading(true)
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
        const data = await res.json()
        setResults(data)
      } catch (e) {
        setResults([])
      } finally {
        setLoading(false)
      }
    }, 300)
    return () => clearTimeout(timer)
  }, [query])

  return (
    <>
      <style>{`
        .search-wrap { position: relative; display: flex; align-items: center; }
        .search-input {
          width: 0; opacity: 0; padding: 0;
          border: none; background: transparent;
          font-family: var(--font-mono); font-size: 11px;
          color: var(--text); outline: none;
          transition: width 0.3s ease, opacity 0.3s ease, padding 0.3s ease;
        }
        .search-input.is-open {
          width: 180px; opacity: 1; padding: 4px 10px;
          border-bottom: 0.5px solid var(--border2);
        }
        .search-btn {
          background: none; border: none; cursor: pointer;
          color: var(--muted); display: flex; align-items: center;
          padding: 4px; margin-left: 8px;
          transition: color 0.2s;
        }
        .search-btn:hover { color: var(--accent); }
        .search-dropdown {
          position: absolute; top: calc(100% + 12px); right: 0;
          width: 320px; background: rgba(10,10,10,0.98);
          backdrop-filter: blur(14px);
          border: 0.5px solid var(--border);
          z-index: 200;
        }
        .search-result-item {
          display: block; padding: 12px 16px;
          border-bottom: 0.5px solid var(--border);
          text-decoration: none;
          transition: background 0.15s;
        }
        .search-result-item:last-child { border-bottom: none; }
        .search-result-item:hover { background: var(--surface); }
        .search-empty {
          padding: 16px; font-family: var(--font-mono);
          font-size: 9px; color: var(--muted);
          letter-spacing: 0.1em; text-align: center;
        }
        @media (max-width: 768px) { .search-wrap { display: none; } }
      `}</style>
      <div className="search-wrap" ref={wrapRef}>
        <input
          ref={inputRef}
          className={`search-input${open ? ' is-open' : ''}`}
          placeholder="搜尋文章..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <button className="search-btn" onClick={() => { setOpen(!open); if (open) { setQuery(''); setResults([]) } }} aria-label="搜尋">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
        </button>
        {open && query && (
          <div className="search-dropdown">
            {loading ? (
              <div className="search-empty">搜尋中...</div>
            ) : results.length > 0 ? (
              results.map(r => (
                <Link key={r._id} href={`/article/${r.slug?.current}`} className="search-result-item" onClick={() => { setOpen(false); setQuery(''); setResults([]) }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '7px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '4px' }}>{r.category}</div>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: '13px', fontWeight: 600, color: 'var(--text)', lineHeight: 1.4 }}>{r.title}</div>
                  {r.excerpt && <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--muted)', marginTop: '4px', lineHeight: 1.5, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{r.excerpt}</div>}
                </Link>
              ))
            ) : (
              <div className="search-empty">找不到相關文章</div>
            )}
          </div>
        )}
      </div>
    </>
  )
}
