import type { Metadata } from 'next'
import Link from 'next/link'
import { LANGS, type Lang, t, site , getPageMeta, HREFLANG_MAP } from '@/lib/i18n'
import content from '@/data/content.json'
import FAQSection from '@/components/FAQSection'

import { ArticleSchema } from '@/components/SchemaMarkup'
interface Props { params: Promise<{ lang: Lang; slug: string }> }

const BLOG_SLUGS = [
  'how-to-get-poa-dubai',
  'power-of-attorney-types-dubai',
  'difference-between-general-and-special-poa-uae',
  'how-to-cancel-poa-dubai',
  'poa-rejected-by-authority-what-to-do',
  'poa-for-banking-uae-guide',
  'corporate-poa-vs-individual-poa-uae',
  'power-of-attorney-property-sale-dubai',
  'dld-property-gift-transfer-dubai',
  'mofa-attestation-guide',
  'mofa-attestation-step-by-step-dubai',
  'mofa-attestation-uae-complete-guide-2026',
  'apostille-vs-attestation',
  'apostille-vs-embassy-attestation-uae-guide',
  'what-is-apostille-uae',
  'eviction-notice-dubai-guide',
  'eviction-notice-requirements-dubai',
  'whatsapp-eviction-notice-dubai-valid',
  'rdc-filing-guide-dubai',
  'how-to-attend-rdc-hearing-dubai-2026',
  'legal-translation-dubai-guide',
  'last-will-testament-dubai-expats',
  'travelling-minor-child-uae-rules',
  'same-day-notary-dubai',
  'notary-public-vs-lawyer-dubai',
  'notarize-documents-without-visiting-uae',
  'affidavit-dubai-complete-guide',
  'corporate-documents-dubai',
]

function slugToTitle(slug: string): string {
  return slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
    .replace('Poa','POA').replace('Rdc','RDC').replace('Uae','UAE').replace('Mofa','MOFA').replace('Dld','DLD')
}

export async function generateStaticParams() {
  const params: Record<string, string>[] = []
  for (const lang of LANGS)
    for (const slug of BLOG_SLUGS)
      params.push({ lang, slug })
  return params
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params
  const bc = (content.blog_content as Record<string, Record<string, string>>)[slug]
  const title = bc?.[`title_${lang}`] || bc?.title_en || `${slugToTitle(slug)} | E-Notary Dubai`
  const description = bc?.[`meta_${lang}`] || bc?.meta_en || ''
  return {
    title,
    description,
    alternates: {
      canonical: `https://www.enotarydubai.ae/${lang}/blog/${slug}/`,
      'x-default': `https://www.enotarydubai.ae/en/blog/${slug}/`,
      languages: Object.fromEntries(LANGS.map((l) => [HREFLANG_MAP[l], `https://www.enotarydubai.ae/${l}/blog/${slug}/`]))
    },
  }
}

const LABELS = {
  back:    { en: '← Back to Blog', ar: '← العودة للمدونة', ru: '← Назад к блогу', zh: '← 返回博客', es: '← Volver al Blog' },
  cta:     { en: 'Need professional help with this?', ar: 'تحتاج مساعدة متخصصة في هذا الموضوع؟', ru: 'Нужна профессиональная помощь?', zh: '需要专业帮助？', es: '¿Necesita ayuda profesional?' },
  wa:      { en: 'Chat on WhatsApp — Reply in 5 Minutes', ar: 'تحدث على واتساب — رد خلال 5 دقائق', ru: 'Чат в WhatsApp — ответ за 5 минут', zh: 'WhatsApp聊天——5分钟内回复', es: 'Chat en WhatsApp — Respuesta en 5 Minutos' },
  faq_h:   { en: 'Frequently Asked Questions', ar: 'الأسئلة الشائعة', ru: 'Часто задаваемые вопросы', zh: '常见问题', es: 'Preguntas Frecuentes' },
  related: { en: 'Related Articles', ar: 'مقالات ذات صلة', ru: 'Похожие статьи', zh: '相关文章', es: 'Artículos Relacionados' },
  read:    { en: 'Read article →', ar: '← اقرأ المقال', ru: 'Читать →', zh: '阅读 →', es: 'Leer →' },
}

const blogData = content.blog_content as Record<string, {
  title_en?: string; title_ar?: string; title_ru?: string; title_zh?: string; title_es?: string;
  meta_en?: string; meta_ar?: string; meta_ru?: string; meta_zh?: string; meta_es?: string;
  date?: string
  date_updated?: string
  h2?: Array<Record<string,string>>
  content?: Array<Record<string,string>>
  list_items?: Array<Record<string,string>>
  faq?: Array<{q: Record<string,string>; a: Record<string,string>}>
}>

export default async function BlogArticlePage({ params }: Props) {
  const { lang, slug } = await params
  const bc = blogData[slug]
  const titleKey = `title_${lang}` as keyof typeof bc
  const metaKey = `meta_${lang}` as keyof typeof bc
  const title = (bc?.[titleKey] as string) || bc?.title_en || slugToTitle(slug)
  const metaDesc = (bc?.[metaKey] as string) || bc?.meta_en || ''
  const waUrl = `https://wa.me/${site.phone.replace(/\D/g,'')}?text=${encodeURIComponent(`I read your article: ${bc?.title_en || slugToTitle(slug)}`)}`

  const sections = bc?.h2 || []
  const paragraphs = bc?.content || []
  const listItems = bc?.list_items || []
  const faqItems = bc?.faq || []

  // Get 3 related articles (exclude current)
  const related = BLOG_SLUGS.filter(s => s !== slug).slice(0, 3)

  function getText(item: Record<string,string>) {
    return item[lang] || item.en || ''
  }

  return (
    <article className="bg-white min-h-[80vh]">
      <ArticleSchema
        headline={title}
        url={`https://www.enotarydubai.ae/${lang}/blog/${slug}/`}
        lang={lang}
        datePublished={bc?.date}
        dateModified={bc?.date_updated}
        description={metaDesc || undefined}
      />
      {/* Hero */}
      <div className="hero-bg py-12">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <Link href={`/${lang}/blog`} className="text-navy-400 hover:text-gold-400 text-xs font-medium mb-4 inline-block transition-colors">
            {t(LABELS.back, lang)}
          </Link>
          <h1 className="font-serif text-2xl font-bold text-white sm:text-3xl leading-tight">{title}</h1>
          {metaDesc && (
            <p className="text-navy-300 text-sm mt-3 max-w-2xl leading-relaxed">{metaDesc}</p>
          )}
          {bc?.date && (
            <div className="flex items-center gap-3 mt-4">
              <time dateTime={bc.date} className="text-xs text-navy-400">
                {new Date(bc.date).toLocaleDateString(
                  lang === 'ar' ? 'ar-AE' : lang === 'zh' ? 'zh-CN' : lang === 'ru' ? 'ru-RU' : lang === 'es' ? 'es-ES' : 'en-GB',
                  { year: 'numeric', month: 'long', day: 'numeric' }
                )}
              </time>
              {bc.date_updated && bc.date_updated !== bc.date && (
                <span className="text-xs text-navy-500">
                  · {t({ en: 'Updated', ar: 'محدّث', ru: 'Обновلено', zh: '已更新', es: 'Actualizado' }, lang)} {new Date(bc.date_updated).toLocaleDateString(
                    lang === 'ar' ? 'ar-AE' : lang === 'zh' ? 'zh-CN' : lang === 'ru' ? 'ru-RU' : lang === 'es' ? 'es-ES' : 'en-GB',
                    { year: 'numeric', month: 'short' }
                  )}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-3xl px-4 lg:px-8 py-12">

        {sections.length === 0 && paragraphs.length === 0 ? (
          <p className="text-navy-500 mb-8 text-sm">
            {t({en:'Full article coming soon.',ar:'المقال الكامل قريباً.',ru:'Полная статья скоро.',zh:'完整文章即将推出。',es:'Artículo completo próximamente.'}, lang)}
          </p>
        ) : (
          <div className="space-y-8">
            {sections.length > 0 ? (() => {
              /* ── Smart content distribution ──────────────────────────────
               * 1. Paragraphs: 1:1 with sections (para[i] → section[i])
               * 2. List items: evenly distributed across sections
               * 3. All h2 sections always render (even without paragraphs)
               */
              const sCount = sections.length
              const listsPerSec = listItems.length > 0 ? Math.floor(listItems.length / sCount) : 0
              const listsRemainder = listItems.length > 0 ? listItems.length % sCount : 0
              let listOffset = 0

              return sections.map((sec, i) => {
                const secTitle = getText(sec)
                if (!secTitle) return null

                // 1:1 paragraph mapping
                const secPara = i < paragraphs.length ? paragraphs[i] : null

                // Evenly distributed list items (extra items go to earlier sections)
                const listsForThis = listsPerSec + (i < listsRemainder ? 1 : 0)
                const secLis = listItems.slice(listOffset, listOffset + listsForThis)
                listOffset += listsForThis

                const paraText = secPara ? getText(secPara) : ''

                return (
                  <div key={i}>
                    <h2 className="font-serif text-xl font-bold text-navy-900 mb-4 pb-2 border-b border-navy-100">
                      {secTitle}
                    </h2>
                    {paraText && (
                      <p className="text-navy-600 leading-relaxed mb-3 text-sm">{paraText}</p>
                    )}
                    {secLis.length > 0 && (
                      <ul className="mt-3 space-y-1.5">
                        {secLis.map((li, j) => {
                          const txt = getText(li)
                          return txt ? (
                            <li key={j} className="flex items-start gap-2 text-sm text-navy-600">
                              <span className="text-gold-500 font-bold mt-0.5 shrink-0">→</span>
                              {txt}
                            </li>
                          ) : null
                        })}
                      </ul>
                    )}
                  </div>
                )
              })
            })() : (
              <>
                {/* Standalone paragraphs (when no sections) */}
                {paragraphs.map((p, i) => {
                  const txt = getText(p)
                  return txt ? (
                    <p key={i} className="text-navy-600 leading-relaxed mb-4 text-sm">{txt}</p>
                  ) : null
                })}

                {/* Standalone list items */}
                {listItems.length > 0 && (
                  <ul className="space-y-2">
                    {listItems.map((li, i) => {
                      const txt = getText(li)
                      return txt ? (
                        <li key={i} className="flex items-start gap-2 text-sm text-navy-600">
                          <span className="text-gold-500 font-bold mt-0.5 shrink-0">→</span>
                          {txt}
                        </li>
                      ) : null
                    })}
                  </ul>
                )}
              </>
            )}
          </div>
        )}

        {/* FAQ section */}
        {faqItems.length > 0 && (
          <div className="mt-12">
            <h2 id="faq-heading" className="gold-line font-serif text-xl font-bold text-navy-900 mb-6 inline-block">
              {t(LABELS.faq_h, lang)}
            </h2>
            <FAQSection items={faqItems} lang={lang} />
          </div>
        )}

        {/* CTA */}
        <div className="rounded-2xl bg-navy-900 p-8 text-center mt-12">
          <h2 className="font-serif text-lg font-bold text-white mb-2">{t(LABELS.cta, lang)}</h2>
          <p className="text-navy-400 text-xs mb-5">{t({en:'We reply in 5 minutes — no obligation.', ar:'نرد في 5 دقائق — بدون أي التزام.', ru:'Ответим за 5 минут.', zh:'5分钟内回复。', es:'Respondemos en 5 minutos.'}, lang)}</p>
          <a href={waUrl} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] text-white font-bold px-8 py-3 rounded-xl hover:bg-[#20b958] transition-colors text-sm">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884"/>
            </svg>
            {t(LABELS.wa, lang)}
          </a>
        </div>

        {/* Related articles */}
        <div className="mt-12">
          <h2 className="font-serif text-lg font-bold text-navy-900 mb-4">{t(LABELS.related, lang)}</h2>
          <div className="grid gap-3 sm:grid-cols-3">
            {related.map(relSlug => {
              const relBc = blogData[relSlug]
              const relTitleKey = `title_${lang}` as keyof typeof relBc
              const relTitle = (relBc?.[relTitleKey] as string) || relBc?.title_en || slugToTitle(relSlug)
              return (
                <Link key={relSlug} href={`/${lang}/blog/${relSlug}`}
                  className="group bg-navy-50 rounded-xl p-4 border border-navy-100 hover:border-gold-400/40 transition-colors">
                  <p className="text-xs font-semibold text-navy-800 leading-snug mb-2 group-hover:text-navy-600 line-clamp-2">{relTitle}</p>
                  <span className="text-xs text-gold-600 font-semibold">{t(LABELS.read, lang)}</span>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </article>
  )
}
