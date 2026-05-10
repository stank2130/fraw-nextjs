'use client'

import { useEffect, useRef } from 'react'

export default function InstagramEmbed({ url }) {
  const ref = useRef(null)

  useEffect(() => {
    if (window.instgrm) {
      window.instgrm.Embeds.process()
    }
  }, [url])

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
        ref={ref}
      />
    </>
  )
}
