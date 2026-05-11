import { getUpcomingReleases, getSiteSettings } from '../../lib/sanity'
import { urlFor } from '../../lib/sanity'
import Link from 'next/link'
import Image from 'next/image'
import MobileNav from '../components/MobileNav'

export const revalidate = 60

export async function generateStaticParams() {
  const slugs = await getAllReleaseSlugs()
  return slugs.map(s => ({ slug: s.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const release = await getReleaseBySlug(slug)
  if (!release) return {}
  return { title: `${release.name} — F.RAW 阜絡` }
}

const currencySymbol = (currency) => {
  const map = { USD: '$', TWD: 'NT$', RMB: '¥', JPY: '¥', HKD: 'HK$', EUR: '€', GBP: '£' }
  return map[currency] || '$'
}

export default async function ReleaseDetailPage({ params }) {
  const { slug } = await params
  const [release, settings] = await Promise.all([
    getReleaseBySlug(slug),
    getSiteSettings(),
  ])
  if (!release) notFound()

  const navItems = settings?.navLinks?.length > 0
    ? settings.navLinks
    : [
        { label: '開箱', href: '/category/unboxing' },
        { label: '評測', href: '/category/review' },
        { label: '新聞', href: '/category/culture' },
        { label: '發售', href: '/releases' },
      ]

  return (
    <div style={{ minHeight: '100vh' }}>
      <style>{`
        .release-detail-wrap {
          max-width: 960px;
          margin: 0 auto;
          padding: 52px 32px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 52px;
        }
        .release-image-block {
          position: relative;
          width: 100%;
          aspect-ratio: 1/1;
          background: var(--surface);
        }
        .release-meta-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 0;
          border-bottom: 0.5px solid var(--border);
        }
        .release-nav-spread {
          display: flex;
          flex: 1;
          justify-content: space-evenly;
          padding-left: 10%;
          padding-right: 5%;
        }
        .release-footer {
          padding: 22px 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 0.5px solid var(--border);
        }

        @media (max-width: 768px) {
          .release-detail-wrap { grid-template-columns: 1fr; padding: 28px 20px; gap: 28px; }
          .release-nav-spread { display: none; }
          .release-footer { padding: 20px; flex-direction: column; gap: 8px; align-items: flex-start; }
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
          <div className="release-nav-spread">
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

      <div className="release-detail-wrap">

        {/* 左：圖片 */}
        <div className="release-image-block">
          {release.image ? (
            <Image
              src={urlFor(release.image).width(800).height(800).url()}
              alt={release.name}
              fill
              style={{ objectFit: 'contain', padding: '24px' }}
              priority
            />
          ) : (
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--hint)' }}>暫無圖片</span>
            </div>
          )}
          {release.hot && (
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'var(--accent)' }}></div>
          )}
        </div>

        {/* 右：資訊 */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ marginBottom: '24px' }}>
            {release.hot && (
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '7px', background: 'var(--accent)', color: 'var(--accent-dark)', padding: '3px 10px', letterSpacing: '0.12em', textTransform: 'uppercase', display: 'inline-block', marginBottom: '14px' }}>本週強推</span>
            )}
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '8px' }}>{release.brand}</div>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '32px', fontWeight: 700, lineHeight: 1.15, color: 'var(--text)' }}>{release.name}</h1>
          </div>

          {release.price?.amount && (
            <div style={{ marginBottom: '28px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '24px', color: 'var(--accent)', letterSpacing: '0.04em' }}>
                {currencySymbol(release.price.currency)}{release.price.amount.toLocaleString()}
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--muted)', marginLeft: '8px' }}>
                {release.price.currency}
              </span>
            </div>
          )}

          <div style={{ borderTop: '0.5px solid var(--border)' }}>
            {release.releaseDate && (
              <div className="release-meta-row">
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>發售日期</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text)' }}>{release.releaseDate}</span>
              </div>
            )}
            {release.colorway && (
              <div className="release-meta-row">
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>配色</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text)' }}>{release.colorway}</span>
              </div>
            )}
            {release.styleCode && (
              <div className="release-meta-row">
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>貨號</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text)' }}>{release.styleCode}</span>
              </div>
            )}
            {release.where && (
              <div className="release-meta-row">
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>購買管道</span>
                <a href={release.where} target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accent)', textDecoration: 'underline' }}>前往購買 →</a>
              </div>
            )}
            {release.notes && (
              <div style={{ padding: '16px 0' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '10px' }}>備註</div>
                <p style={{ fontFamily: 'var(--font-serif)', fontSize: '13px', fontWeight: 300, color: 'var(--text2)', lineHeight: 1.9 }}>{release.notes}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="release-footer">
        <span style={{ fontFamily: 'var(--font-serif)', fontSize: '14px', fontWeight: 700, letterSpacing: '0.22em', color: 'var(--hint)' }}>F.RAW 阜絡</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--hint)' }}>© 2025 F.RAW 阜絡</span>
      </footer>
    </div>
  )
}
