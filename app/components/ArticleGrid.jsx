'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

function formatDate(dateStr) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('zh-TW', { month: 'long', day: 'numeric' })
}

const catMap = { review: '評測', unboxing: '開箱', culture: '新聞', release: '發售', 'brand-story': '品牌故事' }

function urlFor(image) {
  if (!image?.asset?._ref) return null
  const ref = image.asset._ref
  const [, id, dimensions, format] = ref.match(/image-([a-f0-9]+)-(\d+x\d+)-(\w+)/) || []
  if (!id) return null
  return `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/production/${id}-${dimensions}.${format}`
}

export default function ArticleGrid({ initialArticles, initialTotal }) {
  const [articles, setArticles] = useState(initialArticles)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(initialArticles.length < initialTotal)
  const [loading, setLoading] = useState(false)

  const loadMore = async () => {
    setLoading(true)
    try {
      const nextPage = page + 1
      const res = await fetch(`/api/articles?page=${nextPage}`)
      const data = await res.json()
      setArticles(prev => [...prev, ...data.articles])
      setPage(nextPage)
      setHasMore(data.hasMore)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="articles-grid">
        {articles.map(article => (
          <Link key={article._id} href={`/article/${article.slug?.current}`} style={{ display: 'block', cursor: 'pointer', textDecoration: 'none' }}>
            <div style={{ width: '100%', aspectRatio: '16/9', background: 'var(--surface2)', marginBottom: '16px', position: 'relative', overflow: 'hidden' }}>
              {article.coverImage && urlFor(article.coverImage) && (
                <Image
                  src={urlFor(article.coverImage)}
                  alt={article.title}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              )}
            </div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)', display: 'block', marginBottom: '8px' }}>
              {catMap[article.category] || article.category}
            </span>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '14px', fontWeight: 600, lineHeight: 1.55, marginBottom: '10px', color: 'var(--text)' }}>{article.title}</h3>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', color: 'var(--muted)' }}>
              {formatDate(article.publishedAt)}
              {article.readTime && ` · ${article.readTime} 分鐘`}
            </span>
          </Link>
        ))}
      </div>

      {hasMore && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '48px' }}>
          <button
            onClick={loadMore}
            disabled={loading}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: loading ? 'var(--muted)' : 'var(--text)',
              background: 'none',
              border: `0.5px solid ${loading ? 'var(--border)' : 'var(--text)'}`,
              padding: '12px 40px',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s',
            }}
          >
            {loading ? '載入中...' : '觀看更多文章 →'}
          </button>
        </div>
      )}
    </>
  )
}
