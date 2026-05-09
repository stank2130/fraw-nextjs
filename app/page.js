import { getLatestArticles, getUpcomingReleases, getFeaturedArticle, getSiteSettings } from '../lib/sanity'
import { urlFor } from '../lib/sanity'
import Link from 'next/link'
import Image from 'next/image'

export const revalidate = 60

function formatDate(dateStr) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('zh-TW', { month: 'long', day: 'numeric' })
}

export default async function HomePage() {
  const [featured, articles, releases, settings] = await Promise.all([
    getFeaturedArticle(),
    getLatestArticles(6),
    getUpcomingReleases(4),
    getSiteSettings(),
  ])

  const navItems = settings?.navLinks?.length > 0
    ? settings.navLinks
    : [
        { label: '發售', href: '/releases' },
        { label: '評測', href: '/category/review' },
        { label: '文化', href: '/category/culture' },
        { label: '典藏', href: '/category/classic' },
      ]

  const cats = settings?.categories || {}

  const catLabel = (key) => {
    const map = {
      review: cats.review || '評測',
      unboxing: cats.unboxing || '開箱',
      culture: cats.culture || '文化',
      release: cats.release || '發售',
      'brand-story': cats.brandStory || '品牌故事',
    }
    return map[key] || key
  }

  const tickerItems = settings?.tickerItems?.length > 0
    ? settings.tickerItems
    : ['Jordan 4 Bred Reimagined', 'New Balance 1906R', 'Adidas Samba OG 補貨', 'Nike Air Max 95']

  return (
    <div style={{ minHeight: '100vh' }}>

      <style>{`
        @keyframes tick { from { transform: translateX(0) } to { transform: translateX(-50%) } }

        .nav-links { display: flex; gap: 28px; }

        .hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 520px;
          border-bottom: 0.5px solid var(--border);
        }
        .hero-text {
          padding: 52px 44px;
          border-right: 0.5px solid var(--border);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .hero-title {
          font-family: var(--font-serif);
          font-size: 52px;
          font-weight: 700;
          line-height: 1.05;
          letter-spacing: 0.04em;
          margin-bottom: 20px;
        }
        .hero-image {
          background: var(--surface);
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 300px;
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
          .nav-links { display: none; }
          .hero-grid { grid-template-columns: 1fr; min-height: unset; }
          .hero-text { padding: 28px 20px; border-right: none; border-bottom: 0.5px solid var(--border); }
          .hero-title { font-size: 30px; }
          .hero-image { min-height: 220px; order: -1; }
          .articles-grid { grid-template-columns: 1fr; gap: 28px; }
          .releases-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; }
          .section-pad { padding: 28px 20px; }
          .footer-wrap { flex-direction: column; gap: 8px; align-items: flex-start; padding: 20px; }
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
        <span style={{ fontFamily: 'var(--font-serif)', fontSize: '18px', fontWeight: 700, letterSpacing: '0.28em' }}>
          {settings?.siteTitle || 'F.RAW 阜絡'}
        </span>
        <div className="nav-links">
          {navItems.map((l, i) => (
            <Link key={i} href={l.href || '#'} style={{
              fontFamily: 'var(--font-mono)', fontSize: '9px',
              letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--muted)', textDecoration: 'none'
            }}>{l.label}</Link>
          ))}
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

      {/* HERO */}
      {featured && (
        <section className="hero-grid">
          <div className="hero-text">
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--accent)' }}>封面故事</span>
                <div style={{ flex: 1, height: '0.5px', background: 'var(--border2)' }}></div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', border: '0.5px solid var(--border2)', color: 'var(--muted)', padding: '2px 10px' }}>
                  {catLabel(featured.category)}
                </span>
              </div>
              <h1 className="hero-title">{featured.title}</h1>
              <p style={{
                fontFamily: 'var(--font-serif)', fontSize: '13px', fontWeight: 300,
                color: 'var(--text2)', lineHeight: 1.9, maxWidth: '340px', marginBottom: '36px'
              }}>{featured.excerpt}</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--muted)', letterSpacing: '0.06em' }}>
                {formatDate(featured.publishedAt)}
                {featured.readTime && ` · ${featured.readTime} 分鐘`}
              </span>
              <Link href={`/article/${featured.slug?.current}`} style={{
                fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.12em',
                textTransform: 'uppercase', borderBottom: '1px solid var(--accent)', paddingBottom: '2px'
              }}>閱讀全文 →</Link>
            </div>
          </div>
          <div className="hero-image">
            {featured.coverImage ? (
              <Image src={urlFor(featured.coverImage).width(800).height(600).url()}
                alt={featured.title} fill style={{ objectFit: 'cover' }} priority />
            ) : (
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--hint)' }}>封面圖片</span>
            )}
          </div>
        </section>
      )}

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
      <footer className="footer-wrap">
        <span style={{ fontFamily: 'var(--font-serif)', fontSize: '14px', fontWeight: 700, letterSpacing: '0.22em', color: 'var(--hint)' }}>
          {settings?.siteTitle || 'F.RAW 阜絡'}
        </span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--hint)' }}>© 2025 F.RAW 阜絡</span>
      </footer>

    </div>
  )
}
