import { getUpcomingReleases, getSiteSettings } from '../../lib/sanity'
import { urlFor } from '../../lib/sanity'
import Link from 'next/link'
import Image from 'next/image'

export const revalidate = 60

export default async function ReleasesPage() {
  const [releases, settings] = await Promise.all([
    getUpcomingReleases(20),
    getSiteSettings(),
  ])

  return (
    <div style={{ minHeight: '100vh' }}>
      <style>{`
        .releases-nav-links { display: flex; gap: 36px; }
        .releases-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
        }
        .releases-header { padding: 44px 32px 24px; border-bottom: 0.5px solid var(--border); }
        .releases-section { padding: 44px 32px; }
        .releases-footer {
          padding: 22px 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 0.5px solid var(--border);
        }
        @media (max-width: 1024px) {
          .releases-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 768px) {
          .releases-nav-links { display: none; }
          .releases-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; }
          .releases-header { padding: 28px 20px 20px; }
          .releases-section { padding: 24px 20px; }
          .releases-footer { padding: 20px; flex-direction: column; gap: 8px; align-items: flex-start; }
        }
      `}</style>

      {/* NAV */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: '54px', padding: '0 32px',
        background: 'rgba(10,10,10,0.92)', backdropFilter: 'blur(14px)',
        borderBottom: '0.5px solid var(--border)'
      }}>
        <Link href="/" style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', fontWeight: 700, letterSpacing: '0.28em', textDecoration: 'none', color: 'var(--text)' }}>
          {settings?.siteTitle || 'F.RAW 阜絡'}
        </Link>
        <div className="releases-nav-links">
          {[
            { label: '發售', href: '/releases' },
            { label: '評測', href: '/category/review' },
            { label: '文化', href: '/category/culture' },
            { label: '典藏', href: '/category/classic' },
          ].map((l, i) => (
            <Link key={i} href={l.href} style={{
              fontFamily: 'var(--font-mono)', fontSize: '11px',
              letterSpacing: '0.16em', textTransform: 'uppercase',
              color: l.href === '/releases' ? 'var(--accent)' : 'var(--text)',
              textDecoration: 'none'
            }}>{l.label}</Link>
          ))}
        </div>
      </nav>

      {/* HEADER */}
      <div className="releases-header">
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--accent)' }}>發售雷達</span>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '36px', fontWeight: 700, marginTop: '10px' }}>即將發售</h1>
      </div>

      {/* GRID */}
      <section className="releases-section">
        <div className="releases-grid">
          {releases.map(release => (
            <Link key={release._id} href={`/releases/${release.slug?.current}`} style={{ display: 'block', textDecoration: 'none' }}>
              <div style={{
                background: release.hot ? '#0C0B00' : 'var(--surface)',
                border: `0.5px solid ${release.hot ? '#3A3800' : 'var(--border)'}`,
                padding: '14px 13px', position: 'relative'
              }}>
                {release.hot && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'var(--accent)' }}></div>}
                <div style={{ width: '100%', aspectRatio: '4/3', background: 'var(--surface2)', marginBottom: '12px', position: 'relative', overflow: 'hidden' }}>
                  {release.image ? (
                    <Image src={urlFor(release.image).width(300).height(225).url()}
                      alt={release.name} fill style={{ objectFit: 'contain', padding: '8px' }} />
                  ) : (
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', color: 'var(--hint)', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>圖片</span>
                  )}
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '4px' }}>{release.brand}</div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '12px', fontWeight: 600, lineHeight: 1.4, color: release.hot ? 'var(--accent)' : 'var(--text)', marginBottom: '12px' }}>{release.name}</div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', color: 'var(--muted)' }}>{release.releaseDate}</span>
                  {release.hot ? (
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '7px', background: 'var(--accent)', color: 'var(--accent-dark)', padding: '2px 7px' }}>本週強推</span>
                  ) : release.price && (
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--accent)' }}>${release.price}</span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="releases-footer">
        <span style={{ fontFamily: 'var(--font-serif)', fontSize: '14px', fontWeight: 700, letterSpacing: '0.22em', color: 'var(--hint)' }}>
          {settings?.siteTitle || 'F.RAW 阜絡'}
        </span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--hint)' }}>© 2025 F.RAW 阜絡</span>
      </footer>
    </div>
  )
}
