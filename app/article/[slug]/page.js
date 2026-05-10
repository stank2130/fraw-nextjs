import Link from 'next/link'
import { getArticleBySlug, getAllArticleSlugs, getRelatedArticles, urlFor } from '../../../lib/sanity'
import { notFound } from 'next/navigation'
import InstagramEmbed from '../../components/InstagramEmbed'

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
  if (block._type === 'image') {
    return (
      <figure key={index} style={{ margin: '2em 0' }}>
        <img
          src={urlFor(block).width(1200).fit('max').url()}
          alt={block.caption || ''}
          style={{ width: '100%', height: 'auto', display: 'block' }}
        />
        {block.caption && (
          <figcaption style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--muted)', marginTop: '8px', letterSpacing: '0.04em' }}>
            {block.caption}
          </figcaption>
        )}
      </figure>
    )
  }

  if (block._type !== 'block') return null
  const text = block.children?.map(child => child.text).join('') || ''
  if (!text) return null
  const style = block.style || 'normal'

  if (style === 'h2') return (
    <h2 key={index} style={{ fontFamily: 'var(--font-serif)', fontSize: '26px', fontWeight: 700, color: 'var(--text)', margin: '2.2em 0 0.7em', letterSpacing: '0.02em', lineHeight: 1.3 }}>{text}</h2>
  )
  if (style === 'h3') return (
    <h3 key={index} style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)', margin: '2em 0 0.6em' }}>{text}</h3>
  )
  if (style === 'blockquote') return (
    <blockquote key={index} style={{ borderLeft: '2px solid var(--accent)', paddingLeft: '20px', margin: '2em 0', fontFamily: 'var(--font-serif)', fontSize: '16px', fontStyle: 'italic', fontWeight: 300, color: 'var(--text)', lineHeight: 1.8 }}>{text}</blockquote>
  )
  return (
    <p key={index} style={{ fontFamily: 'var(--font-serif)', fontSize: '15px', fontWeight: 300, color: 'var(--text2)', lineHeight: 1.95, marginBottom: '1.6em' }}>{text}</p>
  )
}

const catMap = { review: '評測', unboxing: '開箱', culture: '文化', release: '發售', 'brand-story': '品牌故事' }

export default async function ArticlePage({ params }) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  if (!article) notFound()

  const related = await getRelatedArticles(article.category, article._id)
  const youtubeId = getYoutubeId(article.youtubeUrl)

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
        .article-main {}
        .article-sidebar {
          position: sticky;
          top: 74px;
        }
        .article-title {
          font-family: var(--font-serif);
          font-size: 44px;
          font-weight: 700;
          line-height: 1.1;
          letter-spacing: 0.02em;
          color: var(--text);
          margin-bottom: 20px;
        }
        .youtube-wrap {
          position: relative;
          width: 100%;
          padding-bottom: 56.25%;
          margin: 2em 0;
          background: var(--surface);
        }
        .youtube-wrap iframe {
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          border: none;
        }
        .ig-wrap {
          margin: 2em 0;
          display: flex;
          justify-content: center;
        }
        .sidebar-section {
          border: 0.5px solid var(--border);
          padding: 20px;
          margin-bottom: 20px;
          background: var(--surface);
        }
        .sidebar-label {
          font-family: var(--font-mono);
          font-size: 8px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 16px;
          display: block;
        }
        .related-item {
          display: flex;
          gap: 12px;
          margin-bottom: 16px;
          padding-bottom: 16px;
          border-bottom: 0.5px solid var(--border);
          text-decoration: none;
        }
        .related-item:last-child {
          margin-bottom: 0;
          padding-bottom: 0;
          border-bottom: none;
        }
        .related-thumb {
          width: 64px;
          height: 48px;
          background: var(--surface2);
          flex-shrink: 0;
          position: relative;
          overflow: hidden;
        }
        .related-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          position: absolute;
          top: 0; left: 0;
        }
        .affiliate-placeholder {
          width: 100%;
          aspect-ratio: 1/1;
          background: var(--surface2);
          border: 0.5px dashed var(--border2);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 12px;
          cursor: pointer;
        }

        @media (max-width: 1024px) {
          .article-layout {
            grid-template-columns: 1fr 240px;
            gap: 32px;
          }
        }

        @media (max-width: 768px) {
          .article-layout {
            grid-template-columns: 1fr;
            padding: 32px 20px;
            gap: 0;
          }
          .article-sidebar {
            position: static;
            margin-top: 48px;
            padding-top: 48px;
            border-top: 0.5px solid var(--border);
          }
          .article-title { font-size: 28px; }
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
        <Link href="/" style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', fontWeight: 700, letterSpacing: '0.28em' }}>
          F.RAW 阜絡
        </Link>
        <Link href="/" style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text)' }}>
          ← 返回首頁
        </Link>
      </nav>

      <div className="article-layout">

        {/* 左：文章內文 */}
        <article className="article-main">

          {/* META */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px', flexWrap: 'wrap' }}>
            <span style={{ background: 'var(--accent)', color: 'var(--accent-dark)', fontFamily: 'var(--font-mono)', fontSize: '8px', letterSpacing: '0.12em', textTransform: 'uppercase', padding: '2px 8px' }}>
              {catMap[article.category] || article.category}
            </span>
            {article.publishedAt && (
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--muted)', letterSpacing: '0.06em' }}>
                {formatDate(article.publishedAt)}
              </span>
            )}
            {article.readTime && (
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--muted)', letterSpacing: '0.06em' }}>
                {article.readTime} 分鐘閱讀
              </span>
            )}
            {article.author && (
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--muted)', letterSpacing: '0.06em' }}>
                By {article.author}
              </span>
            )}
          </div>

          {/* TITLE */}
          <h1 className="article-title">{article.title}</h1>

          {/* EXCERPT */}
          {article.excerpt && (
            <p style={{ fontFamily: 'var(--font-serif)', fontSize: '15px', fontWeight: 300, color: 'var(--text2)', lineHeight: 1.9, borderLeft: '2px solid var(--accent)', paddingLeft: '18px', marginBottom: '36px' }}>
              {article.excerpt}
            </p>
          )}

          {/* COVER */}
          {article.coverImage && (
            <div style={{ marginBottom: '48px', overflow: 'hidden' }}>
              <img
                src={urlFor(article.coverImage).width(1400).fit('max').url()}
                alt={article.title}
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </div>
          )}

          {/* YOUTUBE */}
          {youtubeId && (
            <div className="youtube-wrap">
              <iframe
                src={`https://www.youtube.com/embed/${youtubeId}`}
                title={article.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}

          {/* INSTAGRAM 貼文 */}
          {article.instagramUrl && (
            <div className="ig-wrap">
              <InstagramEmbed url={article.instagramUrl} type="post" />
            </div>
          )}

          {/* INSTAGRAM REELS */}
          {article.instagramReelUrl && (
            <div className="ig-wrap">
              <InstagramEmbed url={article.instagramReelUrl} type="reel" />
            </div>
          )}

          {/* BODY */}
          <div>
            {article.body?.map((block, i) => renderBlock(block, i))}
          </div>

          {/* 相關文章（手機版顯示在這） */}
          {related.length > 0 && (
            <div style={{ marginTop: '60px', paddingTop: '32px', borderTop: '0.5px solid var(--border)', display: 'none' }} className="related-mobile">
              <span className="sidebar-label">相關文章</span>
              {related.map(r => (
                <Link key={r._id} href={`/article/${r.slug?.current}`} className="related-item">
                  <div className="related-thumb">
                    {r.coverImage && (
                      <img src={urlFor(r.coverImage).width(128).height(96).url()} alt={r.title} />
                    )}
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '7px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '4px' }}>
                      {catMap[r.category] || r.category}
                    </div>
                    <div style={{ fontFamily: 'var(--font-serif)', fontSize: '12px', fontWeight: 600, lineHeight: 1.45, color: 'var(--text)' }}>
                      {r.title}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* BACK */}
          <div style={{ marginTop: '60px', paddingTop: '24px', borderTop: '0.5px solid var(--border)' }}>
            <Link href="/" style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)' }}>
              ← 返回 F.RAW
            </Link>
          </div>
        </article>

        {/* 右：Sidebar */}
        <aside className="article-sidebar">

          {/* 聯盟行銷版位 */}
          <div className="sidebar-section">
            <span className="sidebar-label">推薦好物</span>
            <div className="affiliate-placeholder">
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', color: 'var(--hint)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>廣告版位</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '7px', color: 'var(--hint)' }}>250 × 250</span>
            </div>
            <div className="affiliate-placeholder">
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', color: 'var(--hint)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>廣告版位</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '7px', color: 'var(--hint)' }}>250 × 250</span>
            </div>
          </div>

          {/* 相關文章 */}
          {related.length > 0 && (
            <div className="sidebar-section">
              <span className="sidebar-label">相關文章</span>
              {related.map(r => (
                <Link key={r._id} href={`/article/${r.slug?.current}`} className="related-item">
                  <div className="related-thumb">
                    {r.coverImage && (
                      <img src={urlFor(r.coverImage).width(128).height(96).url()} alt={r.title} />
                    )}
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '7px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '4px' }}>
                      {catMap[r.category] || r.category}
                    </div>
                    <div style={{ fontFamily: 'var(--font-serif)', fontSize: '12px', fontWeight: 600, lineHeight: 1.45, color: 'var(--text)' }}>
                      {r.title}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

        </aside>
      </div>
    </div>
  )
}
