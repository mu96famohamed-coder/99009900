'use client'

import { useState } from 'react'
import { type Lang, t } from '@/lib/i18n'

interface FAQItem {
  q: Record<string, string>
  a: Record<string, string>
}

interface Props {
  items: FAQItem[]
  lang: Lang
  variant?: 'default' | 'dark'
}

export default function FAQSection({ items, lang, variant = 'default' }: Props) {
  const [open, setOpen] = useState<number | null>(null)

  const isDark = variant === 'dark'

  return (
    <section className="space-y-2" aria-labelledby="faq-heading">
      {items.map((item, i) => {
        const isOpen = open === i
        const question = t(item.q, lang)
        const answer = t(item.a, lang)
        if (!question) return null

        return (
          <div
            key={i}
            className={`rounded-2xl overflow-hidden border transition-colors duration-200 ${
              isDark
                ? isOpen ? 'bg-navy-800 border-navy-700' : 'bg-navy-800/60 border-navy-700/60 hover:border-navy-600'
                : isOpen ? 'bg-white border-navy-200 shadow-sm' : 'bg-white border-navy-100 hover:border-navy-200'
            }`}
          >
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className={`w-full flex items-center justify-between gap-4 px-5 py-4 text-start transition-colors duration-150 ${
                isDark ? 'hover:bg-navy-700/40' : 'hover:bg-navy-50/60'
              }`}
              aria-expanded={isOpen}
            >
              <span className={`font-semibold text-sm leading-snug ${isDark ? 'text-white' : 'text-navy-900'}`}>
                {question}
              </span>
              <span className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-colors duration-200 ${
                isOpen ? 'bg-gold-400 text-navy-900' : isDark ? 'bg-navy-700 text-navy-400' : 'bg-navy-100 text-navy-500'
              }`}>
                <svg
                  className={`w-3.5 h-3.5 transition-transform duration-280 ${isOpen ? 'rotate-180' : ''}`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7"/>
                </svg>
              </span>
            </button>

            {/* CSS grid animation - no max-height hacks */}
            <div className={`faq-body ${isOpen ? 'open' : ''}`}>
              <div>
                <p className={`px-5 pb-5 pt-1 text-sm leading-relaxed border-t ${
                  isDark ? 'text-navy-300 border-navy-700' : 'text-navy-600 border-navy-100'
                }`}>
                  {answer}
                </p>
              </div>
            </div>
          </div>
        )
      })}
    </section>
  )
}
