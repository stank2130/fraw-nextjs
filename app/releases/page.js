import { getUpcomingReleases, getSiteSettings } from '../../lib/sanity'
import { urlFor } from '../../lib/sanity'
import Link from 'next/link'
import Image from 'next/image'
import MobileNav from '../components/MobileNav'

export const revalidate = 60

export async function generateMetadata() {
  return { title: '發售雷達 — F.RAW 阜絡' }
}

export default async function ReleasesPage() {
  const [releases, settings] = await Promise.all([
    getUpcomingReleases(20),
    getSiteSettings(),
  ])

  const navItems = settings?.navLinks?.length > 0
    ? settings.navLinks
    : [
        { label: '開箱', href: '/category/unboxing' },
        { label: '評測', href: '/category/review' },
        { label: '新聞', href: '/category/culture' },
        { label: '發售', href: '/releases' },
      ]

  const currencySymbol = (currency) => {
    const map = { USD: '$', TWD: 'NT$', RMB: '¥', JPY: '¥', HKD: 'HK$', EUR: '€', GBP: '£' }
    return map[currency] || '$'
  }

  return (
    <div style={{ minHeight: '100vh' }}>
      <style>{`
        .releases-page-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
        }
        .releases-nav-spread {
          display: flex;
          flex: 1;
          justify-content: space-evenly;
          padding-left: 10%;
          padding-right: 5%;
        }
        .releases-footer {
          padding: 22px 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 0.5px solid var(--border);
        }
        @media (max-width: 1024px) {
          .releases-page-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 768px) {
          .releases-nav-spread { display: none; }
          .releases-page-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; }
          .releases-footer { padding: 20px; flex-direction: column; gap: 8px; align-items: flex-start; }
        }
      `}</style>

      {/* NAV */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 100,
        height: '54px', padding: '0 32px',
        background: 'rgba(10,10,10,0.92)', backdropFilter: 'blur(14px)',
        borderBottom: '0.5px solid var(--border)',
        display: 'flex', alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          <Link href="/" style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', fontWeight: 700, letterSpacing: '0.28em', flexShrink: 0 }}>
            F.RAW 阜絡
          </Link>
          <div className="releases-nav-spread">
            {navItems.map((l, i) => (
              <Link key={i} href={l.href || '#'} style={{
                fontFamily: 'var(--font-mono)', fontSize: '11px',
                letterSpacing: '0.16em', textTransform: 'uppercase',
                color: l.href === '/releases' ? 'var(--accent)' : 'var(--text)',
                textDecoration: 'none'
              }}>{l.label}</Link>
            ))}
          </div>
          <MobileNav navItems={navItems} siteTitle="F.RAW 阜絡" />
        </div>
      </nav>

      {/* HEADER */}
      <div style={{ padding: '44px 32px 28px', borderBottom: '0.5px solid var(--border)' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '10px' }}>Release Radar</div>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '36px', fontWeight: 700, letterSpacing: '0.04em' }}>發售雷達</h1>
      </div>

      {/* GRID */}
      <section style={{ padding: '32px 32px 60px' }}>
        <div className="releases-page-grid">
          {releases.map(release => (
            <Link key={release._id} href={`/releases/${release.slug?.current}`} style={{ display: 'block', textDecoration: 'none' }}>
              <div style={{
                background: release.hot ? '#0C0B00' : 'var(--surface)',
                border: `0.5px solid ${release.hot ? '#3A3800' : 'var(--border)'}`,
                padding: '14px 13px', position: 'relative'
              }}>
                {release.hot && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'var(--accent)' }}></div>}
                <div style={{ width: '100%', aspectRatio: '4/3', background: 'var(--surface2)', marginBottom: '12px', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {release.image ? (
                    <Image src={urlFor(release.image).width(300).height(225).url()}
                      alt={release.name} fill style={{ objectFit: 'contain', padding: '8px' }} />
                  ) : (
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', color: 'var(--hint)' }}>圖片</span>
                  )}
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '4px' }}>{release.brand}</div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '12px', fontWeight: 600, lineHeight: 1.4, color: release.hot ? 'var(--accent)' : 'var(--text)', marginBottom: '12px' }}>{release.name}</div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', color: 'var(--muted)' }}>{release.releaseDate}</span>
                  {release.hot ? (
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '7px', background: 'var(--accent)', color: 'var(--accent-dark)', padding: '2px 7px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>本週強推</span>
                  ) : release.price?.amount ? (
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--accent)' }}>{currencySymbol(release.price.currency)}{release.price.amount.toLocaleString()}</span>
                  ) : null}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="releases-footer">
  <span style={{ fontFamily: 'var(--font-serif)', fontSize: '14px', fontWeight: 700, letterSpacing: '0.22em', color: 'var(--hint)' }}>F.RAW 阜絡</span>
<div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
  <a href="https://www.instagram.com/fraw.tw/" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--muted)', textDecoration: 'none' }}>
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
    </svg>
    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Instagram</span>
  </a>
  <a href="mailto:stank2130@gmail.com,jhangtff@gmail.com" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--muted)', textDecoration: 'none' }}>
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2"/>
      <polyline points="2,4 12,13 22,4"/>
    </svg>
    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.12em', textTransform: 'uppercase' }}>聯絡我們</span>
  </a>
  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--hint)' }}>© 2025 F.RAW 阜絡</span>
</div>
</footer>
    </div>
  )
}
