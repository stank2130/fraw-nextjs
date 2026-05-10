import Link from 'next/link'
import { getArticleBySlug, getAllArticleSlugs, urlFor } from '../../../lib/sanity'
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

export default async function ArticlePage({ params }) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  if (!article) notFound()

  const catMap = { review: '評測', unboxing: '開箱', culture: '文化', release: '發售', 'brand-story': '品牌故事' }
  const youtubeId = getYoutubeId(article.youtubeUrl)

  return (
    <div>
      <style>{`
        .article-wrap {
          max-width: 780px;
          margin: 0 auto;
          padding: 60px 32px;
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

        @media (max-width: 768px) {
          .article-wrap { padding: 32px 20px; }
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
        <Link href="/" style={{ fontFamily: 'var(--font-serif)', fontSize: '18px', fontWeight: 700, letterSpacing: '0.28em' }}>
          F.RAW 阜絡
        </Link>
        <Link href="/" style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)' }}>
          ← 返回首頁
        </Link>
      </nav>

      <article className="article-wrap">

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

        {/* INSTAGRAM */}
        {article.instagramUrl && (
          <div className="ig-wrap">
            <InstagramEmbed url={article.instagramUrl} />
          </div>
        )}

        {/* BODY */}
        <div>
          {article.body?.map((block, i) => renderBlock(block, i))}
        </div>

        {/* BACK */}
        <div style={{ marginTop: '60px', paddingTop: '24px', borderTop: '0.5px solid var(--border)' }}>
          <Link href="/" style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)' }}>
            ← 返回 F.RAW
          </Link>
        </div>
      </article>
    </div>
  )
}
