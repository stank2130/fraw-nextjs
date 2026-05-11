import { getLatestArticles, getSiteSettings } from '../../../lib/sanity'
import { urlFor } from '../../../lib/sanity'
import Link from 'next/link'
import Image from 'next/image'
import MobileNav from '../../components/MobileNav'

export const revalidate = 60

function formatDate(dateStr) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('zh-TW', { month: 'long', day: 'numeric' })
}

const categoryMap = {
  review: '評測',
  culture: '新聞',
  classic: '典藏',
  unboxing: '開箱',
  release: '發售',
}

export default async function CategoryPage({ params }) {
  const { slug } = await params
  const [allArticles, settings] = await Promise.all([
    getLatestArticles(50),
    getSiteSettings(),
  ])

  const articles = allArticles.filter(a => a.category === slug)
  const label = categoryMap[slug] || slug

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
        .cat-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .cat-header { padding: 44px 32px 24px; border-bottom: 0.5px solid var(--border); }
        .cat-section { padding: 44px 32px; }
        .cat-footer { padding: 22px 32px; display: flex; align-items: center; justify-content: space-between; border-top: 0.5px solid var(--border); }
        .cat-nav-spread { display: flex; flex: 1; justify-content: space-evenly; padding-left: 10%; padding-right: 5%; }

        @media (max-width: 1024px) { .cat-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 768px) {
          .cat-nav-spread { display: none; }
          .cat-grid { grid-template-columns: 1fr; gap: 28px; }
          .cat-header { padding: 28px 20px 20px; }
          .cat-section { padding: 28px 20px; }
          .cat-footer { padding: 20px; flex-direction: column; gap: 8px; align-items: flex-start; }
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
          <Link href="/" style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', fontWeight: 700, letterSpacing: '0.28em', textDecoration: 'none', color: 'var(--text)', flexShrink: 0 }}>
            {settings?.siteTitle || 'F.RAW 阜絡'}
          </Link>
          <div className="cat-nav-spread">
            {navItems.map((l, i) => (
              <Link key={i} href={l.href || '#'} style={{
                fontFamily: 'var(--font-mono)', fontSize: '11px',
                letterSpacing: '0.16em', textTransform: 'uppercase',
                color: l.href === `/category/${slug}` ? 'var(--accent)' : 'var(--text)',
                textDecoration: 'none'
              }}>{l.label}</Link>
            ))}
          </div>
          <MobileNav navItems={navItems} siteTitle={settings?.siteTitle} />
        </div>
      </nav>

      {/* HEADER */}
      <div className="cat-header">
        <Link href="/" style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--muted)', textDecoration: 'none', letterSpacing: '0.1em' }}>← 返回首頁</Link>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '36px', fontWeight: 700, marginTop: '10px' }}>{label}</h1>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--muted)' }}>{articles.length} 篇文章</span>
      </div>

      {/* ARTICLES */}
      <section className="cat-section">
        {articles.length === 0 ? (
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--muted)' }}>目前還沒有文章。</p>
        ) : (
          <div className="cat-grid">
            {articles.map(article => (
              <Link key={article._id} href={`/article/${article.slug?.current}`} style={{ display: 'block', textDecoration: 'none' }}>
                <div style={{ width: '100%', aspectRatio: '16/9', background: 'var(--surface2)', marginBottom: '16px', position: 'relative', overflow: 'hidden' }}>
                  {article.coverImage && (
                    <Image src={urlFor(article.coverImage).width(600).height(338).url()}
                      alt={article.title} fill style={{ objectFit: 'cover' }} />
                  )}
                </div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)', display: 'block', marginBottom: '8px' }}>
                  {label}
                </span>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '14px', fontWeight: 600, lineHeight: 1.55, marginBottom: '10px', color: 'var(--text)' }}>{article.title}</h3>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', color: 'var(--muted)' }}>
                  {formatDate(article.publishedAt)}
                  {article.readTime && ` · ${article.readTime} 分鐘`}
                </span>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* FOOTER */}
      <footer className="cat-footer">
  <span style={{ fontFamily: 'var(--font-serif)', fontSize: '14px', fontWeight: 700, letterSpacing: '0.22em', color: 'var(--hint)' }}>
    {settings?.siteTitle || 'F.RAW 阜絡'}
  </span>
  <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
    <a href="https://www.instagram.com/fraw.tw/" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--muted)', textDecoration: 'none' }}>
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
  </svg>
  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Instagram</span>
</a>
    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--hint)' }}>© 2025 F.RAW 阜絡</span>
  </div>
</footer>
    </div>
  )
}
