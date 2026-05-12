import { getLatestArticles, getUpcomingReleases, getSiteSettings } from '../lib/sanity'
import { urlFor } from '../lib/sanity'
import Link from 'next/link'
import Image from 'next/image'
import HeroCarousel from './components/HeroCarousel'
import MobileNav from './components/MobileNav'

export const revalidate = 60

function formatDate(dateStr) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('zh-TW', { month: 'long', day: 'numeric' })
}

export default async function HomePage() {
  const [articles, releases, settings] = await Promise.all([
    getLatestArticles(9),
    getUpcomingReleases(4),
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

  const cats = settings?.categories || {}

const catLabel = (key) => {
  const map = {
    review: '評測',
    unboxing: '開箱',
    culture: '新聞',
    release: '發售',
    'brand-story': '品牌故事',
  }
  return map[key] || key
}

  const tickerItems = settings?.tickerItems?.length > 0
    ? settings.tickerItems
    : ['Jordan 4 Bred Reimagined', 'New Balance 1906R', 'Adidas Samba OG 補貨', 'Nike Air Max 95']

  const heroArticles = (settings?.heroArticles || []).map(a => ({
    ...a,
    coverImageUrl: a.coverImage ? urlFor(a.coverImage).width(800).height(600).url() : null
  }))

  return (
    <div style={{ minHeight: '100vh' }}>

      <style>{`
        @keyframes tick { from { transform: translateX(0) } to { transform: translateX(-50%) } }

        .nav-inner {
          display: flex;
          align-items: center;
          width: 100%;
        }
        .nav-logo { flex: 0 0 auto; }
        .nav-links-spread {
          display: flex;
          flex: 1;
          justify-content: space-evenly;
          padding-left: 10%;
          padding-right: 5%;
        }

        .articles-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .releases-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
        }

        .footer-wrap {
          padding: 22px 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 0.5px solid var(--border);
        }

        .section-pad { padding: 44px 32px; }

        @media (max-width: 1024px) {
          .articles-grid { grid-template-columns: repeat(2, 1fr); }
          .releases-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 768px) {
          .nav-links-spread { display: none; }
          .articles-grid { grid-template-columns: 1fr; gap: 28px; }
          .releases-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; }
          .section-pad { padding: 28px 20px; }
          .footer-wrap { flex-direction: column; gap: 8px; align-items: flex-start; padding: 20px; }
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
        <div className="nav-inner">
          <span className="nav-logo" style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', fontWeight: 700, letterSpacing: '0.28em' }}>
            {settings?.siteTitle || 'F.RAW 阜絡'}
          </span>
          <div className="nav-links-spread">
            {navItems.map((l, i) => (
              <Link key={i} href={l.href || '#'} style={{
                fontFamily: 'var(--font-mono)', fontSize: '11px',
                letterSpacing: '0.16em', textTransform: 'uppercase',
                color: 'var(--text)', textDecoration: 'none'
              }}>{l.label}</Link>
            ))}
          </div>
          <MobileNav navItems={navItems} siteTitle={settings?.siteTitle} />
        </div>
      </nav>

      {/* TICKER */}
      <div style={{
        display: 'flex', alignItems: 'center', height: '28px',
        borderBottom: '0.5px solid var(--border)', overflow: 'hidden'
      }}>
        <div style={{
          flexShrink: 0, padding: '0 16px', height: '100%',
          display: 'flex', alignItems: 'center',
          background: 'var(--accent)',
          fontFamily: 'var(--font-mono)', fontSize: '8px', letterSpacing: '0.16em',
          textTransform: 'uppercase', color: 'var(--accent-dark)'
        }}>最新消息</div>
        <div style={{ flex: 1, overflow: 'hidden' }}>
          <div style={{ display: 'flex', width: 'max-content', animation: 'tick 40s linear infinite' }}>
            {[...tickerItems, ...tickerItems].map((item, i) => (
              <span key={i} style={{
                fontFamily: 'var(--font-mono)', fontSize: '9px',
                letterSpacing: '0.06em', color: 'var(--muted)', whiteSpace: 'nowrap', padding: '0 6px'
              }}>{item} <span style={{ color: 'var(--hint)', margin: '0 12px' }}>—</span></span>
            ))}
          </div>
        </div>
      </div>

      {/* HERO CAROUSEL */}
      <HeroCarousel articles={heroArticles} />

      {/* LATEST ARTICLES */}
      <section className="section-pad" style={{ borderBottom: '0.5px solid var(--border)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase' }}>最新文章</span>
        </div>
        <div className="articles-grid">
          {articles.map(article => (
            <Link key={article._id} href={`/article/${article.slug?.current}`} style={{ display: 'block', cursor: 'pointer' }}>
              <div style={{ width: '100%', aspectRatio: '16/9', background: 'var(--surface2)', marginBottom: '16px', position: 'relative', overflow: 'hidden' }}>
                {article.coverImage && (
                  <Image src={urlFor(article.coverImage).width(600).height(338).url()}
                    alt={article.title} fill style={{ objectFit: 'cover' }} />
                )}
              </div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)', display: 'block', marginBottom: '8px' }}>
                {catLabel(article.category)}
              </span>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '14px', fontWeight: 600, lineHeight: 1.55, marginBottom: '10px' }}>{article.title}</h3>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', color: 'var(--muted)' }}>
                {formatDate(article.publishedAt)}
                {article.readTime && ` · ${article.readTime} 分鐘`}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* RELEASE RADAR */}
      <section className="section-pad" style={{ borderBottom: '0.5px solid var(--border)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase' }}>發售雷達</span>
        </div>
        <div className="releases-grid">
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
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--accent)' }}>NT${release.price.amount.toLocaleString()}</span>
                  ) : null}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FOOTER */}
<footer className="footer-wrap">
  <span style={{ fontFamily: 'var(--font-serif)', fontSize: '14px', fontWeight: 700, letterSpacing: '0.22em', color: 'var(--hint)' }}>
    {settings?.siteTitle || 'F.RAW 阜絡'}
  </span>
<div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
  <a href="https://mail.google.com/mail/?view=cm&to=stank2130@gmail.com,jhangtff@gmail.com&su=F.RAW 阜絡聯絡" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--muted)', textDecoration: 'none' }}>
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <polyline points="2,4 12,13 22,4"/>
  </svg>
  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.12em', textTransform: 'uppercase' }}>聯絡我們</span>
</a>
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
