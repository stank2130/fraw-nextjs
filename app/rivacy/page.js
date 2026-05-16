import Link from 'next/link'
import MobileNav from '../components/MobileNav'
import SearchBar from '../components/SearchBar'
import { getSiteSettings } from '../../lib/sanity'

export const metadata = {
  title: '隱私權政策 — F.RAW 阜絡',
  description: 'F.RAW 阜絡隱私權政策',
}

export default async function PrivacyPage() {
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
        .privacy-nav-spread { display: flex; flex: 1; justify-content: space-evenly; padding-left: 10%; padding-right: 5%; }
        .privacy-footer { padding: 22px 32px; display: flex; align-items: center; justify-content: space-between; border-top: 0.5px solid var(--border); }
        .privacy-body { max-width: 720px; margin: 0 auto; padding: 60px 32px; }
        .privacy-section { margin-bottom: 40px; }
        @media (max-width: 768px) {
          .privacy-nav-spread { display: none; }
          .privacy-body { padding: 40px 20px; }
          .privacy-footer { padding: 20px; flex-direction: column; gap: 8px; align-items: flex-start; }
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
          <div className="privacy-nav-spread">
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

      <div className="privacy-body">

        <div style={{ marginBottom: '48px', paddingBottom: '32px', borderBottom: '0.5px solid var(--border)' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '16px' }}>Legal</div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '36px', fontWeight: 700, marginBottom: '12px' }}>隱私權政策</h1>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--muted)' }}>最後更新：2025 年 5 月</span>
        </div>

        {[
          {
            title: '1. 資料蒐集',
            content: 'F.RAW 阜絡（以下稱「本網站」）可能透過 Google Analytics 等第三方工具蒐集匿名瀏覽資料，包含頁面瀏覽次數、使用者所在地區、裝置類型等資訊，以改善網站內容與使用體驗。本網站不會主動蒐集您的個人識別資料，除非您主動透過聯絡表單或電子郵件與我們聯繫。'
          },
          {
            title: '2. Cookie 使用',
            content: '本網站使用 Cookie 及類似技術以提供更好的瀏覽體驗，並透過 Google Analytics 進行流量分析。您可透過瀏覽器設定拒絕或刪除 Cookie，但部分網站功能可能因此受到影響。'
          },
          {
            title: '3. 第三方服務',
            content: '本網站使用以下第三方服務：Google Analytics（流量分析）、Google AdSense（廣告服務）、TradingView（股價資訊嵌入）、Sanity CMS（內容管理）、Vercel（網站託管）。這些服務可能依據各自的隱私權政策蒐集相關資料，請參閱各服務商的隱私權政策以獲得更多資訊。'
          },
          {
            title: '4. 廣告',
            content: '本網站可能顯示由 Google AdSense 提供的廣告。Google 可能根據您過去瀏覽本網站及其他網站的紀錄，向您投放個人化廣告。您可透過 Google 廣告設定頁面管理個人化廣告偏好。'
          },
          {
            title: '5. 資料安全',
            content: '我們採取合理的技術與管理措施保護您的資料安全。然而，網際網路的傳輸無法保證絕對安全，請您了解此風險。'
          },
          {
            title: '6. 連結至第三方網站',
            content: '本網站內容可能包含連結至第三方網站。這些網站擁有各自獨立的隱私權政策，本網站不對其內容或隱私實踐負責。'
          },
          {
            title: '7. 政策更新',
            content: '本隱私權政策可能不定期更新。更新後的政策將公告於本頁面，請定期查閱。繼續使用本網站即表示您同意接受更新後的政策。'
          },
          {
            title: '8. 聯絡我們',
            content: '若您對本隱私權政策有任何疑問，歡迎透過電子郵件與我們聯繫：stank2130@gmail.com'
          },
        ].map((s, i) => (
          <div key={i} className="privacy-section">
            <h2 style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text)', marginBottom: '16px' }}>{s.title}</h2>
            <p style={{ fontFamily: 'var(--font-serif)', fontSize: '14px', fontWeight: 300, color: 'var(--text2)', lineHeight: 2 }}>{s.content}</p>
          </div>
        ))}

      </div>

      {/* FOOTER */}
      <footer className="privacy-footer">
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
