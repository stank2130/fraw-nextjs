import { getLatestArticles, getSiteSettings } from '../../../lib/sanity'
import { urlFor } from '../../../lib/sanity'
import Link from 'next/link'
import Image from 'next/image'

export const revalidate = 60

function formatDate(dateStr) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('zh-TW', { month: 'long', day: 'numeric' })
}

const categoryMap = {
  review: '評測',
  culture: '文化',
  classic: '典藏',
  unboxing: '開箱',
  release: '發售',
}

export default async function CategoryPage({ params }) {
  const { slug } = params
  const [allArticles, settings] = await Promise.all([
    getLatestArticles(50),
    getSiteSettings(),
  ])

  const articles = allArticles.filter(a => a.category === slug)
  const label = categoryMap[slug] || slug

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* NAV */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: '54px', padding: '0 32px',
        background: 'rgba(10,10,10,0.92)', backdropFilter: 'blur(14px)',
        borderBottom: '0.5px solid var(--border)'
      }}>
        <Link href="/" style={{ fontFamily: 'var(--font-serif)', fontSize: '18px', fontWeight: 700, letterSpacing: '0.28em', textDecoration: 'none', color: 'var(--text)' }}>
          {settings?.siteTitle || 'F.RAW 阜絡'}
        </Link>
        <div style={{ display: 'flex', gap: '28px' }}>
          {[
            { label: '發售', href: '/releases' },
            { label: '評測', href: '/category/review' },
            { label: '文化', href: '/category/culture' },
            { label: '典藏', href: '/category/classic' },
          ].map((l, i) => (
            <Link key={i} href={l.href} style={{
              fontFamily: 'var(--font-mono)', fontSize: '9px',
              letterSpacing: '0.16em', textTransform: 'uppercase',
              color: l.href === `/category/${slug}` ? 'var(--accent)' : 'var(--muted)',
              textDecoration: 'none'
            }}>{l.label}</Link>
          ))}
        </div>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.12em',
          textTransform: 'uppercase', background: 'var(--accent)', color: 'var(--accent-dark)',
          padding: '6px 14px', cursor: 'pointer'
        }}>訂閱電子報</span>
      </nav>

      {/* HEADER */}
      <div style={{ padding: '44px 32px 24px', borderBottom: '0.5px solid var(--border)' }}>
        <Link href="/" style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--muted)', textDecoration: 'none', letterSpacing: '0.1em' }}>← 返回首頁</Link>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '36px', fontWeight: 700, marginTop: '10px' }}>{label}</h1>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--muted)' }}>{articles.length} 篇文章</span>
      </div>

      {/* ARTICLES */}
      <section style={{ padding: '44px 32px' }}>
        {articles.length === 0 ? (
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--muted)' }}>目前還沒有文章。</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '24px' }}>
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
      <footer style={{ padding: '22px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '0.5px solid var(--border)' }}>
        <span style={{ fontFamily: 'var(--font-serif)', fontSize: '14px', fontWeight: 700, letterSpacing: '0.22em', color: 'var(--hint)' }}>
          {settings?.siteTitle || 'F.RAW 阜絡'}
        </span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--hint)' }}>© 2025 F.RAW 阜絡</span>
      </footer>
    </div>
  )
}