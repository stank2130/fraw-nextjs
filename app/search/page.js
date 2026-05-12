import { client } from '../../lib/sanity'
import { urlFor } from '../../lib/sanity'
import Link from 'next/link'
import Image from 'next/image'
import MobileNav from '../components/MobileNav'
import SearchBar from '../components/SearchBar'
import { getSiteSettings } from '../../lib/sanity'

function formatDate(dateStr) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('zh-TW', { month: 'long', day: 'numeric' })
}

const catMap = { review: '評測', unboxing: '開箱', culture: '新聞', release: '發售', 'brand-story': '品牌故事' }

export default async function SearchPage({ searchParams }) {
  const { q } = await searchParams
  const query = q || ''

  const [results, settings] = await Promise.all([
    query.trim() ? client.fetch(`
      *[_type == "article" && (
        title match $q ||
        excerpt match $q
      )] | order(publishedAt desc) {
        _id, title, slug, category, excerpt, coverImage, publishedAt, readTime
      }
    `, { q: `*${query}*` }) : [],
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

  return (
    <div style={{ minHeight: '100vh' }}>
      <style>{`
        .search-page-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .search-nav-spread { display: flex; flex: 1; justify-content: space-evenly; padding-left: 10%; padding-right: 5%; }
        .search-footer { padding: 22px 32px; display: flex; align-items: center; justify-content: space-between; border-top: 0.5px solid var(--border); }
        @media (max-width: 1024px) { .search-page-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 768px) {
          .search-nav-spread { display: none; }
          .search-page-grid { grid-template-columns: 1fr; gap: 28px; }
          .search-footer { padding: 20px; flex-direction: column; gap: 8px; align-items: flex-start; }
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
          <Link href="/" style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', fontWeight: 700, letterSpacing: '0.28em', flexShrink: 0, textDecoration: 'none', color: 'var(--text)' }}>
            F.RAW 阜絡
          </Link>
          <div className="search-nav-spread">
            {navItems.map((l, i) => (
              <Link key={i} href={l.href || '#'} style={{
                fontFamily: 'var(--font-mono)', fontSize: '11px',
                letterSpacing: '0.16em', textTransform: 'uppercase',
                color: 'var(--text)', textDecoration: 'none'
              }}>{l.label}</Link>
            ))}
          </div>
          <MobileNav navItems={navItems} siteTitle="F.RAW 阜絡" />
          <SearchBar />
        </div>
      </nav>

      {/* HEADER */}
      <div style={{ padding: '44px 32px 24px', borderBottom: '0.5px solid var(--border)' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '10px' }}>Search</div>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '36px', fontWeight: 700, marginBottom: '8px' }}>
          {query ? `「${query}」的搜尋結果` : '搜尋文章'}
        </h1>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--muted)' }}>
          {query ? `共 ${results.length} 篇文章` : '請輸入關鍵字'}
        </span>
      </div>

      {/* RESULTS */}
      <section style={{ padding: '44px 32px 60px' }}>
        {!query.trim() ? (
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--muted)' }}>請在上方搜尋框輸入關鍵字。</p>
        ) : results.length === 0 ? (
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--muted)' }}>找不到「{query}」的相關文章。</p>
        ) : (
          <div className="search-page-grid">
            {results.map(article => (
              <Link key={article._id} href={`/article/${article.slug?.current}`} style={{ display: 'block', textDecoration: 'none' }}>
                <div style={{ width: '100%', aspectRatio: '16/9', background: 'var(--surface2)', marginBottom: '16px', position: 'relative', overflow: 'hidden' }}>
                  {article.coverImage && (
                    <Image src={urlFor(article.coverImage).width(600).height(338).url()}
                      alt={article.title} fill style={{ objectFit: 'cover' }} />
                  )}
                </div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)', display: 'block', marginBottom: '8px' }}>
                  {catMap[article.category] || article.category}
                </span>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '14px', fontWeight: 600, lineHeight: 1.55, marginBottom: '10px', color: 'var(--text)' }}>{article.title}</h3>
                {article.excerpt && (
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--muted)', lineHeight: 1.6, marginBottom: '10px', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{article.excerpt}</p>
                )}
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
      <footer className="search-footer">
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
          <a href="https://mail.google.com/mail/?view=cm&to=stank2130@gmail.com,jhangtff@gmail.com&su=F.RAW%20%E9%98%9C%E7%B5%A1%E8%81%AF%E7%B5%A1" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--muted)', textDecoration: 'none' }}>
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
