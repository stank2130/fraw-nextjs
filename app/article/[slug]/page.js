import ImageCarousel from '../../components/ImageCarousel'
import Link from 'next/link'
import { getArticleBySlug, getAllArticleSlugs, getRelatedArticles, getSiteSettings, urlFor } from '../../../lib/sanity'
import { notFound } from 'next/navigation'
import InstagramEmbed from '../../components/InstagramEmbed'
import MobileNav from '../../components/MobileNav'
import SearchBar from '../../components/SearchBar'

export const revalidate = 60

export async function generateStaticParams() {
  const slugs = await getAllArticleSlugs()
  return slugs.map(s => ({ slug: s.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  if (!article) return {}
  return { title: `${article.title} — F.RAW 阜絡` }
}

function formatDate(dateStr) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('zh-TW', { year: 'numeric', month: 'long', day: 'numeric' })
}

function getYoutubeId(url) {
  if (!url) return null
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)
  return match ? match[1] : null
}

function renderBlock(block, index) {
  if (block._type === 'imageGallery') {
    return <ImageCarousel key={index} images={block.images} />
  }
  if (block._type === 'youtubeEmbed') {
    const match = block.url?.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)
    const id = match ? match[1] : null
    if (!id) return null
    return (
      <div key={index} className="youtube-wrap">
        <iframe src={`https://www.youtube.com/embed/${id}`} title={`YouTube ${index}`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
      </div>
    )
  }
  if (block._type === 'instagramEmbed') {
    if (!block.url) return null
    return (
      <div key={index} className="ig-wrap">
        <InstagramEmbed url={block.url} type={block.type || 'post'} />
      </div>
    )
  }
  if (block._type === 'image') {
    return (
      <figure key={index} style={{ margin: '2em 0' }}>
        <img src={urlFor(block).width(1200).fit('max').url()} alt={block.caption || ''} style={{ width: '100%', height: 'auto', display: 'block' }} />
        {block.caption && (
          <figcaption style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--muted)', marginTop: '8px', letterSpacing: '0.04em' }}>{block.caption}</figcaption>
        )}
      </figure>
    )
  }
  if (block._type !== 'block') return null
  const text = block.children?.map(child => child.text).join('') || ''
  if (!text) return null
  const style = block.style || 'normal'
  if (style === 'h2') return <h2 key={index} style={{ fontFamily: 'var(--font-serif)', fontSize: '26px', fontWeight: 700, color: 'var(--text)', margin: '2.2em 0 0.7em', letterSpacing: '0.02em', lineHeight: 1.3 }}>{text}</h2>
  if (style === 'h3') return <h3 key={index} style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)', margin: '2em 0 0.6em' }}>{text}</h3>
  if (style === 'blockquote') return <blockquote key={index} style={{ borderLeft: '2px solid var(--accent)', paddingLeft: '20px', margin: '2em 0', fontFamily: 'var(--font-serif)', fontSize: '16px', fontStyle: 'italic', fontWeight: 300, color: 'var(--text)', lineHeight: 1.8 }}>{text}</blockquote>
  return <p key={index} style={{ fontFamily: 'var(--font-serif)', fontSize: '15px', fontWeight: 300, color: 'var(--text2)', lineHeight: 1.95, marginBottom: '1.6em' }}>{text}</p>
}

const catMap = { review: '評測', unboxing: '開箱', culture: '新聞', release: '發售', 'brand-story': '品牌故事' }

export default async function ArticlePage({ params }) {
  const { slug } = await params
  const [article, settings] = await Promise.all([
    getArticleBySlug(slug),
    getSiteSettings(),
  ])
  if (!article) notFound()

  const related = await getRelatedArticles(article.category, article._id)
  const youtubeIds = (article.youtubeUrls || []).map(url => getYoutubeId(url)).filter(Boolean)
  const sidebarAds = settings?.sidebarAds || []

  const navItems = settings?.navLinks?.length > 0
    ? settings.navLinks
    : [
        { label: '開箱', href: '/category/unboxing' },
        { label: '評測', href: '/category/review' },
        { label: '新聞', href: '/category/culture' },
        { label: '發售', href: '/releases' },
      ]

  return (
    <div>
      <style>{`
        .article-layout {
          max-width: 1200px;
          margin: 0 auto;
          padding: 60px 32px;
          display: grid;
          grid-template-columns: 1fr 280px;
          gap: 48px;
          align-items: start;
        }
        .article-sidebar { position: sticky; top: 74px; }
        .article-title { font-family: var(--font-serif); font-size: 44px; font-weight: 700; line-height: 1.1; letter-spacing: 0.02em; color: var(--text); margin-bottom: 20px; }
        .youtube-wrap { position: relative; width: 100%; padding-bottom: 56.25%; margin: 2em 0; background: var(--surface); }
        .youtube-wrap iframe { position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none; }
        .ig-wrap { margin: 2em 0; display: flex; justify-content: center; }
        .sidebar-section { border: 0.5px solid var(--border); padding: 20px; margin-bottom: 20px; background: var(--surface); }
        .sidebar-label { font-family: var(--font-mono); font-size: 8px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--accent); margin-bottom: 16px; display: block; }
        .related-item { display: flex; gap: 12px; margin-bottom: 16px; padding-bottom: 16px; border-bottom: 0.5px solid var(--border); text-decoration: none; }
        .related-item:last-child { margin-bottom: 0; padding-bottom: 0; border-bottom: none; }
        .related-thumb { width: 64px; height: 48px; background: var(--surface2); flex-shrink: 0; position: relative; overflow: hidden; }
        .related-thumb img { width: 100%; height: 100%; object-fit: cover; position: absolute; top: 0; left: 0; }
        .ad-block { display: block; width: 100%; margin-bottom: 12px; }
        .ad-block:last-child { margin-bottom: 0; }
        .ad-block img { width: 100%; height: auto; display: block; }
        .ad-block:hover img { opacity: 0.85; }
        .ad-label { font-family: var(--font-mono); font-size: 11px; color: var(--text); margin-top: 6px; display: block; }
        .article-nav-spread { display: flex; flex: 1; justify-content: space-evenly; padding-left: 10%; padding-right: 5%; }
        .article-footer { padding: 22px 32px; display: flex; align-items: center; justify-content: space-between; border-top: 0.5px solid var(--border); }

        @media (max-width: 1024px) { .article-layout { grid-template-columns: 1fr 240px; gap: 32px; } }
        @media (max-width: 768px) {
          .article-nav-spread { display: none; }
          .article-layout { grid-template-columns: 1fr; padding: 32px 20px; gap: 0; }
          .article-sidebar { position: static; margin-top: 48px; padding-top: 48px; border-top: 0.5px solid var(--border); }
          .article-title { font-size: 28px; }
          .article-footer { flex-direction: column; gap: 8px; align-items: flex-start; padding: 20px; }
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
          <div className="article-nav-spread">
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

      <div className="article-layout">
        <article>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px', flexWrap: 'wrap' }}>
            <span style={{ background: 'var(--accent)', color: 'var(--accent-dark)', fontFamily: 'var(--font-mono)', fontSize: '8px', letterSpacing: '0.12em', textTransform: 'uppercase', padding: '2px 8px' }}>
              {catMap[article.category] || article.category}
            </span>
            {article.publishedAt && <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--muted)', letterSpacing: '0.06em' }}>{formatDate(article.publishedAt)}</span>}
            {article.readTime && <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--muted)', letterSpacing: '0.06em' }}>{article.readTime} 分鐘閱讀</span>}
            {article.author && <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--muted)', letterSpacing: '0.06em' }}>By {article.author}</span>}
          </div>

          <h1 className="article-title">{article.title}</h1>

          {article.excerpt && (
            <p style={{ fontFamily: 'var(--font-serif)', fontSize: '15px', fontWeight: 300, color: 'var(--text2)', lineHeight: 1.9, borderLeft: '2px solid var(--accent)', paddingLeft: '18px', marginBottom: '36px' }}>
              {article.excerpt}
            </p>
          )}

          {article.coverImage && (
            <div style={{ marginBottom: '48px', overflow: 'hidden' }}>
              <img src={urlFor(article.coverImage).width(1400).fit('max').url()} alt={article.title} style={{ width: '100%', height: 'auto', display: 'block' }} />
            </div>
          )}

          {youtubeIds.map((id, i) => (
  <div key={i} className="youtube-wrap">
    <iframe src={`https://www.youtube.com/embed/${id}`} title={`${article.title} ${i + 1}`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
  </div>
))}

{(article.instagramUrls || []).map((url, i) => (
  <div key={i} className="ig-wrap"><InstagramEmbed url={url} type="post" /></div>
))}

{(article.instagramReelUrls || []).map((url, i) => (
  <div key={i} className="ig-wrap"><InstagramEmbed url={url} type="reel" /></div>
))}

          <div>{article.body?.map((block, i) => renderBlock(block, i))}</div>

          <div style={{ marginTop: '60px', paddingTop: '24px', borderTop: '0.5px solid var(--border)' }}>
            <Link href="/" style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)' }}>← 返回 F.RAW</Link>
          </div>
        </article>

        <aside className="article-sidebar">
          {sidebarAds.length > 0 && (
            <div className="sidebar-section">
              <span className="sidebar-label">推薦好物</span>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
  {sidebarAds.map((ad, i) => (
    <a key={i} href={ad.url} target="_blank" rel="noopener noreferrer sponsored" style={{ display: 'block', textDecoration: 'none' }}>
      {ad.image && <img src={urlFor(ad.image).width(140).height(140).url()} alt={ad.label || '廣告'} style={{ width: '100%', height: 'auto', display: 'block' }} />}
      {ad.label && <span style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', color: 'var(--text)', marginTop: '4px', display: 'block', lineHeight: 1.3 }}>{ad.label}</span>}
    </a>
  ))}
</div>
            </div>
          )}

          {related.length > 0 && (
            <div className="sidebar-section">
              <span className="sidebar-label">相關文章</span>
              {related.map(r => (
                <Link key={r._id} href={`/article/${r.slug?.current}`} className="related-item">
                  <div className="related-thumb">
                    {r.coverImage && <img src={urlFor(r.coverImage).width(128).height(96).url()} alt={r.title} />}
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '7px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '4px' }}>{catMap[r.category] || r.category}</div>
                    <div style={{ fontFamily: 'var(--font-serif)', fontSize: '12px', fontWeight: 600, lineHeight: 1.45, color: 'var(--text)' }}>{r.title}</div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </aside>
      </div>

     {/* FOOTER */}
      <footer className="footer-wrap">
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
          <a href="https://mail.google.com/mail/?view=cm&to=stank2130@gmail.com,jhangtff@gmail.com&su=F.RAW%20%E9%98%9C%E7%B5%A1%E8%81%AF%E7%B5%A1" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--muted)', textDecoration: 'none' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2"/>
              <polyline points="2,4 12,13 22,4"/>
            </svg>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.12em', textTransform: 'uppercase' }}>聯絡我們</span>
          </a>
<Link href="/about" style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', textDecoration: 'none' }}>關於我們</Link>
          <Link href="/privacy" style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', textDecoration: 'none' }}>隱私權政策</Link>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--hint)' }}>© 2025 F.RAW 阜絡</span>
        </div>
      </footer>
    </div>
  )
}
