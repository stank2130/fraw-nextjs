'use client'

import { useEffect } from 'react'

export default function InstagramEmbed({ url, type = 'post' }) {
  useEffect(() => {
    if (window.instgrm) {
      window.instgrm.Embeds.process()
    }
  }, [url])

  if (type === 'reel') {
    const reelId = url.match(/\/reel\/([^/?]+)/)?.[1]
    if (!reelId) return null
    return (
      <div style={{ position: 'relative', width: '100%', maxWidth: '400px', margin: '0 auto' }}>
        <iframe
          src={`https://www.instagram.com/reel/${reelId}/embed`}
          style={{
            width: '100%',
            height: '740px',
            border: 'none',
            overflow: 'hidden',
            borderRadius: '4px',
          }}
          scrolling="no"
          allowTransparency
          allowFullScreen
        />
      </div>
    )
  }

  return (
    <>
      <script async src="https://www.instagram.com/embed.js" />
      <blockquote
        className="instagram-media"
        data-instgrm-permalink={url}
        data-instgrm-version="14"
        style={{
          background: '#FFF',
          border: '0',
          borderRadius: '3px',
          boxShadow: '0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)',
          margin: '1px',
          maxWidth: '540px',
          minWidth: '326px',
          padding: '0',
          width: '100%'
        }}
      />
    </>
  )
}
