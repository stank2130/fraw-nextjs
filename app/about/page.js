import Link from 'next/link'
import MobileNav from '../components/MobileNav'
import SearchBar from '../components/SearchBar'
import { getSiteSettings } from '../../lib/sanity'

export const metadata = {
  title: '關於我們 — F.RAW 阜絡',
  description: 'F.RAW 阜絡，讓運動與文化融入生活的球鞋媒體。',
}

export default async function AboutPage() {
  const settings = await getSiteSettings()

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
        .about-nav-spread { display: flex; flex: 1; justify-content: space-evenly; padding-left: 10%; padding-right: 5%; }
        .about-footer { padding: 22px 32px; display: flex; align-items: center; justify-content: space-between; border-top: 0.5px solid var(--border); }
        .about-body { max-width: 720px; margin: 0 auto; padding: 60px 32px; }
        .about-section { margin-bottom: 60px; }
        @media (max-width: 768px) {
          .about-nav-spread { display: none; }
          .about-body { padding: 40px 20px; }
          .about-footer { padding: 20px; flex-direction: column; gap: 8px; align-items: flex-start; }
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
          <div className="about-nav-spread">
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

      <div className="about-body">

        {/* HEADER */}
        <div style={{ marginBottom: '60px', paddingBottom: '40px', borderBottom: '0.5px solid var(--border)' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '16px' }}>About</div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '48px', fontWeight: 700, lineHeight: 1.05, letterSpacing: '0.04em', marginBottom: '24px' }}>
            F.RAW 阜絡
          </h1>
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: '18px', fontWeight: 300, color: 'var(--text2)', lineHeight: 1.9 }}>
            讓運動與文化，真正融入你的生活。
          </p>
        </div>

        {/* SECTION 1 */}
        <div className="about-section">
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '20px' }}>我們是誰</div>
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: '15px', fontWeight: 300, color: 'var(--text2)', lineHeight: 2, marginBottom: '20px' }}>
            F.RAW 阜絡，是一個關於球鞋、運動與當代文化的媒體平台。我們相信，一雙鞋不只是一雙鞋——它承載著設計語言、街頭歷史、運動精神，以及每個穿上它的人的故事。
          </p>
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: '15px', fontWeight: 300, color: 'var(--text2)', lineHeight: 2 }}>
            「RAW」代表的是我們看待事物的方式——直接、真實、不過度包裝。我們不只報導發售資訊，更想帶你深入球鞋背後的世界：品牌的故事、設計師的思維、以及這些文化如何滲透進我們的日常生活。
          </p>
        </div>

        {/* SECTION 2 */}
        <div className="about-section">
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '20px' }}>我們報導什麼</div>
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: '15px', fontWeight: 300, color: 'var(--text2)', lineHeight: 2, marginBottom: '20px' }}>
            從最新的球鞋發售情報、深度開箱評測，到品牌故事與球鞋文化觀察——我們試圖用不同的角度，讓你看見這個產業有趣的一面。
          </p>
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: '15px', fontWeight: 300, color: 'var(--text2)', lineHeight: 2 }}>
            除了文字與照片，我們也透過影片帶你更直觀地感受每一雙鞋的細節與質感。因為有些東西，你得親眼看到才能真正理解。
          </p>
        </div>

        {/* SECTION 3 */}
        <div className="about-section">
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '20px' }}>我們的理念</div>
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: '15px', fontWeight: 300, color: 'var(--text2)', lineHeight: 2, marginBottom: '20px' }}>
            運動從來不只是競技場上的事。它早已走進街頭、走進音樂、走進藝術，成為當代生活美學的一部分。我們想做的，就是記錄這些交織的瞬間，讓更多人發現運動文化有趣的所在。
          </p>
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: '15px', fontWeight: 300, color: 'var(--text2)', lineHeight: 2 }}>
            不論你是球鞋收藏家、運動愛好者，還是純粹對設計與文化感興趣的人——F.RAW 阜絡，都歡迎你。
          </p>
        </div>

        {/* CONTACT */}
        <div style={{ padding: '32px', border: '0.5px solid var(--border)', background: 'var(--surface)' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '16px' }}>聯絡我們</div>
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: '14px', fontWeight: 300, color: 'var(--text2)', lineHeight: 1.9, marginBottom: '20px' }}>
            媒體合作、廣告洽詢、或任何想法，歡迎隨時與我們聯繫。
          </p>
          <a href="https://mail.google.com/mail/?view=cm&to=stank2130@gmail.com,jhangtff@gmail.com&su=F.RAW%20%E9%98%9C%E7%B5%A1%E8%81%AF%E7%B5%A1" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent)', textDecoration: 'none', borderBottom: '1px solid var(--accent)', paddingBottom: '2px' }}>
            寄信給我們 →
          </a>
        </div>

      </div>

      {/* FOOTER */}
      <footer className="about-footer">
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
