import { getLatestArticles, getUpcomingReleases, getFeaturedArticle } from '../lib/sanity'
import { urlFor } from '../lib/sanity'
import Link from 'next/link'
import Image from 'next/image'

export const revalidate = 60

function formatDate(dateStr) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('zh-TW', { month: 'long', day: 'numeric' })
}

export default async function HomePage() {
  const [featured, articles, releases] = await Promise.all([
    getFeaturedArticle(),
    getLatestArticles(6),
    getUpcomingReleases(4),
  ])

  return (
    <div style={{ minHeight: '100vh' }}>

      {/* NAV */}
      <nav style={{ position:'sticky', top:0, zIndex:100, display:'flex', alignItems:'center',
        justifyContent:'space-between', height:'54px', padding:'0 32px',
        background:'rgba(10,10,10,0.92)', backdropFilter:'blur(14px)',
        borderBottom:'0.5px solid var(--border)' }}>
        <span style={{ fontFamily:'var(--font-serif)', fontSize:'18px', fontWeight:700,
          letterSpacing:'0.28em' }}>阜<span style={{color:'var(--accent)'}}>．</span>絡</span>
        <div style={{ display:'flex', gap:'28px' }}>
          {['發售','評測','文化','典藏'].map(l => (
            <span key={l} style={{ fontFamily:'var(--font-mono)', fontSize:'9px',
              letterSpacing:'0.16em', textTransform:'uppercase', color:'var(--muted)',
              cursor:'pointer' }}>{l}</span>
          ))}
        </div>
        <span style={{ fontFamily:'var(--font-mono)', fontSize:'9px', letterSpacing:'0.12em',
          textTransform:'uppercase', background:'var(--accent)', color:'var(--accent-dark)',
          padding:'6px 14px', cursor:'pointer' }}>訂閱電子報</span>
      </nav>

      {/* HERO */}
      {featured && (
        <section style={{ display:'grid', gridTemplateColumns:'1fr 1fr',
          minHeight:'520px', borderBottom:'0.5px solid var(--border)' }}>
          <div style={{ padding:'52px 44px', borderRight:'0.5px solid var(--border)',
            display:'flex', flexDirection:'column', justifyContent:'space-between' }}>
            <div>
              <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'28px' }}>
                <span style={{ fontFamily:'var(--font-mono)', fontSize:'9px',
                  letterSpacing:'0.16em', textTransform:'uppercase', color:'var(--accent)' }}>封面故事</span>
                <div style={{ flex:1, height:'0.5px', background:'var(--border2)' }}></div>
                <span style={{ fontFamily:'var(--font-mono)', fontSize:'8px',
                  border:'0.5px solid var(--border2)', color:'var(--muted)', padding:'2px 10px' }}>
                  {featured.category}
                </span>
              </div>
              <h1 style={{ fontFamily:'var(--font-serif)', fontSize:'52px', fontWeight:700,
                lineHeight:1.05, letterSpacing:'0.04em', marginBottom:'20px' }}>
                {featured.title}
              </h1>
              <p style={{ fontFamily:'var(--font-serif)', fontSize:'13px', fontWeight:300,
                color:'var(--text2)', lineHeight:1.9, maxWidth:'340px', marginBottom:'36px' }}>
                {featured.excerpt}
              </p>
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:'16px' }}>
              <span style={{ fontFamily:'var(--font-mono)', fontSize:'9px',
                color:'var(--muted)', letterSpacing:'0.06em' }}>
                {formatDate(featured.publishedAt)}
                {featured.readTime && ` · ${featured.readTime} 分鐘`}
              </span>
              <Link href={`/article/${featured.slug?.current}`}
                style={{ fontFamily:'var(--font-mono)', fontSize:'9px',
                  letterSpacing:'0.12em', textTransform:'uppercase',
                  borderBottom:'1px solid var(--accent)', paddingBottom:'2px' }}>
                閱讀全文 →
              </Link>
            </div>
          </div>
          <div style={{ background:'var(--surface)', position:'relative', overflow:'hidden',
            display:'flex', alignItems:'center', justifyContent:'center' }}>
            {featured.coverImage ? (
              <Image src={urlFor(featured.coverImage).width(800).height(600).url()}
                alt={featured.title} fill style={{ objectFit:'cover' }} priority />
            ) : (
              <span style={{ fontFamily:'var(--font-mono)', fontSize:'10px', color:'var(--hint)' }}>
                封面圖片
              </span>
            )}
          </div>
        </section>
      )}

      {/* LATEST ARTICLES */}
      <section style={{ padding:'44px 32px', borderBottom:'0.5px solid var(--border)' }}>
        <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'24px' }}>
          <span style={{ fontFamily:'var(--font-mono)', fontSize:'9px', fontWeight:700,
            letterSpacing:'0.18em', textTransform:'uppercase' }}>最新文章</span>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'24px' }}>
          {articles.map(article => (
            <Link key={article._id} href={`/article/${article.slug?.current}`}
              style={{ display:'block', cursor:'pointer' }}>
              <div style={{ width:'100%', aspectRatio:'16/9', background:'var(--surface2)',
                marginBottom:'16px', position:'relative', overflow:'hidden' }}>
                {article.coverImage && (
                  <Image src={urlFor(article.coverImage).width(600).height(338).url()}
                    alt={article.title} fill style={{ objectFit:'cover' }} />
                )}
              </div>
              <span style={{ fontFamily:'var(--font-mono)', fontSize:'8px',
                letterSpacing:'0.14em', textTransform:'uppercase',
                color:'var(--accent)', display:'block', marginBottom:'8px' }}>
                {article.category}
              </span>
              <h3 style={{ fontFamily:'var(--font-serif)', fontSize:'14px', fontWeight:600,
                lineHeight:1.55, marginBottom:'10px' }}>{article.title}</h3>
              <span style={{ fontFamily:'var(--font-mono)', fontSize:'8px', color:'var(--muted)' }}>
                {formatDate(article.publishedAt)}
                {article.readTime && ` · ${article.readTime} 分鐘`}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* RELEASE RADAR */}
      <section style={{ padding:'44px 32px', borderBottom:'0.5px solid var(--border)' }}>
        <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'24px' }}>
          <span style={{ fontFamily:'var(--font-mono)', fontSize:'9px', fontWeight:700,
            letterSpacing:'0.18em', textTransform:'uppercase' }}>發售雷達</span>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'14px' }}>
          {releases.map(release => (
            <div key={release._id} style={{
              background: release.hot ? '#0C0B00' : 'var(--surface)',
              border: `0.5px solid ${release.hot ? '#3A3800' : 'var(--border)'}`,
              padding:'14px 13px', position:'relative' }}>
              {release.hot && (
                <div style={{ position:'absolute', top:0, left:0, right:0,
                  height:'1px', background:'var(--accent)' }}></div>
              )}
              <div style={{ width:'100%', aspectRatio:'4/3', background:'var(--surface2)',
                marginBottom:'12px', position:'relative', overflow:'hidden',
                display:'flex', alignItems:'center', justifyContent:'center' }}>
                {release.image ? (
                  <Image src={urlFor(release.image).width(300).height(225).url()}
                    alt={release.name} fill style={{ objectFit:'contain', padding:'8px' }} />
                ) : (
                  <span style={{ fontFamily:'var(--font-mono)', fontSize:'8px', color:'var(--hint)' }}>圖片</span>
                )}
              </div>
              <div style={{ fontFamily:'var(--font-mono)', fontSize:'8px',
                letterSpacing:'0.14em', textTransform:'uppercase',
                color:'var(--muted)', marginBottom:'4px' }}>{release.brand}</div>
              <div style={{ fontFamily:'var(--font-serif)', fontSize:'12px', fontWeight:600,
                lineHeight:1.4, color: release.hot ? 'var(--accent)' : 'var(--text)',
                marginBottom:'12px' }}>{release.name}</div>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                <span style={{ fontFamily:'var(--font-mono)', fontSize:'8px', color:'var(--muted)' }}>
                  {release.releaseDate}
                </span>
                {release.hot ? (
                  <span style={{ fontFamily:'var(--font-mono)', fontSize:'7px',
                    background:'var(--accent)', color:'var(--accent-dark)',
                    padding:'2px 7px', letterSpacing:'0.1em', textTransform:'uppercase' }}>
                    本週強推
                  </span>
                ) : release.price && (
                  <span style={{ fontFamily:'var(--font-mono)', fontSize:'10px',
                    color:'var(--accent)' }}>${release.price}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding:'22px 32px', display:'flex', alignItems:'center',
        justifyContent:'space-between', borderTop:'0.5px solid var(--border)' }}>
        <span style={{ fontFamily:'var(--font-serif)', fontSize:'14px', fontWeight:700,
          letterSpacing:'0.22em', color:'var(--hint)' }}>阜．絡</span>
        <span style={{ fontFamily:'var(--font-mono)', fontSize:'9px', color:'var(--hint)' }}>
          © 2025 F.RAW 阜絡
        </span>
      </footer>

    </div>
  )
}