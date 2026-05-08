'use client'

import { useEffect, useState, useRef } from 'react'

interface Props {
  text: string
  lang: string
  fallback?: string
  className?: string
  as?: 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'li'
}

// Client-side translation cache
const cache: Record<string, string> = {}
const pendingBatch: Array<{text: string; lang: string; resolve: (v: string) => void}> = []
let batchTimer: ReturnType<typeof setTimeout> | null = null

async function flushBatch() {
  if (!pendingBatch.length) return
  const batch = [...pendingBatch]
  pendingBatch.length = 0

  // Group by language
  const byLang: Record<string, typeof batch> = {}
  batch.forEach(item => {
    if (!byLang[item.lang]) byLang[item.lang] = []
    byLang[item.lang].push(item)
  })

  for (const [lang, items] of Object.entries(byLang)) {
    const texts = items.map(i => i.text)
    try {
      const res = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ texts, targetLang: lang }),
      })
      const data = await res.json()
      if (data.translations) {
        items.forEach((item, idx) => {
          const translated = data.translations[idx] || item.text
          const key = `${item.lang}:${item.text}`
          cache[key] = translated
          item.resolve(translated)
        })
      } else {
        items.forEach(item => item.resolve(item.text))
      }
    } catch {
      items.forEach(item => item.resolve(item.text))
    }
  }
}

function translate(text: string, lang: string): Promise<string> {
  const key = `${lang}:${text}`
  if (cache[key]) return Promise.resolve(cache[key])
  if (lang === 'en' || text === lang) return Promise.resolve(text)

  return new Promise(resolve => {
    pendingBatch.push({ text, lang, resolve })
    if (batchTimer) clearTimeout(batchTimer)
    batchTimer = setTimeout(flushBatch, 50) // batch for 50ms
  })
}

export default function AutoTranslate({ text, lang, fallback, className, as: Tag = 'span' }: Props) {
  const [translated, setTranslated] = useState(fallback || text)
  const mounted = useRef(true)

  useEffect(() => {
    mounted.current = true
    if (lang === 'en' || !text) {
      setTranslated(text)
      return
    }
    
    translate(text, lang).then(result => {
      if (mounted.current) setTranslated(result)
    })

    return () => { mounted.current = false }
  }, [text, lang])

  return <Tag className={className}>{translated}</Tag>
}
