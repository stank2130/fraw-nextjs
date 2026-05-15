import { getLatestArticles, getUpcomingReleases, getSiteSettings, getArticleCount } from '../lib/sanity'
import { urlFor } from '../lib/sanity'
import Link from 'next/link'
import Image from 'next/image'
import HeroCarousel from './components/HeroCarousel'
import MobileNav from './components/MobileNav'
import SearchBar from './components/SearchBar'
import ArticleGrid from './components/ArticleGrid'

export const revalidate = 60

function formatDate(dateStr) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('zh-TW', { month: 'long', day: 'numeric' })
}

export default async function HomePage() {
  const [articles, releases, settings, totalArticles] = await Promise.all([
    getLatestArticles(9),
    getUpcomingReleases(4),
    getSiteSettings(),
    getArticleCount(),
  ])

  const navItems = settings?.navLinks?.length > 0
    ? settings.navLinks
    : [
        { label: '開箱', href: '/category/unboxing' },
        { label: '評測', href: '/category/review' },
        { label: '新聞', href: '/category/culture' },
        { label: '發售', href: '/releases' },
      ]

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

        .nav-inner { display: flex; align-items: center; width: 100%; }
        .nav-logo { flex: 0 0 auto; }
        .nav-links-spread {
          display: flex; flex: 1;
          justify-content: space-evenly;
          padding-left: 10%; padding-right: 5%;
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
