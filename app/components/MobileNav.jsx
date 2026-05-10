'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function MobileNav({ navItems, siteTitle }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <style>{`
        .mobile-nav-btn {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
          flex-direction: column;
          gap: 5px;
        }
        .mobile-nav-btn span {
          display: block;
          width: 22px;
          height: 1.5px;
          background: var(--text);
          transition: all 0.2s;
        }
        .mobile-menu {
          display: none;
          position: fixed;
          top: 54px;
          left: 0; right: 0;
          background: rgba(10,10,10,0.98);
          backdrop-filter: blur(14px);
          border-bottom: 0.5px solid var(--border);
          z-index: 99;
          padding: 24px 32px;
          flex-direction: column;
          gap: 0;
        }
        .mobile-menu-item {
          display: block;
          fontFamily: var(--font-mono);
          font-family: var(--font-mono);
          font-size: 13px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--text);
          text-decoration: none;
          padding: 16px 0;
          border-bottom: 0.5px solid var(--border);
        }
        .mobile-menu-item:last-child { border-bottom: none; }
        .mobile-menu-item:hover { color: var(--accent); }

        @media (max-width: 768px) {
          .mobile-nav-btn { display: flex; }
          .mobile-menu.is-open { display: flex; }
        }
      `}</style>

      {/* 漢堡按鈕 */}
      <button
        className="mobile-nav-btn"
        onClick={() => setOpen(!open)}
        aria-label="選單"
      >
        <span style={{ transform: open ? 'rotate(45deg) translate(4.5px, 4.5px)' : 'none' }} />
        <span style={{ opacity: open ? 0 : 1 }} />
        <span style={{ transform: open ? 'rotate(-45deg) translate(4.5px, -4.5px)' : 'none' }} />
      </button>

      {/* 展開選單 */}
      <div className={`mobile-menu${open ? ' is-open' : ''}`}>
        {navItems.map((l, i) => (
          <Link
            key={i}
            href={l.href || '#'}
            className="mobile-menu-item"
            onClick={() => setOpen(false)}
          >
            {l.label}
          </Link>
        ))}
      </div>
    </>
  )
}
