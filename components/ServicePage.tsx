import Link from 'next/link'
import FAQSection from './FAQSection'
import RichContent, { type RichBlock } from './RichContent'
import { FAQSchema, BreadcrumbSchema } from './SchemaMarkup'
import AcceptedByMarquee from './AcceptedByMarquee'
import { type Lang, t, site, getWaUrl } from '@/lib/i18n'

export interface FAQItem {
  q: Record<string, string>
  a: Record<string, string>
}
export interface ContentSection {
  [key: string]: string | undefined
  en: string
  ar: string
  ru?: string
  zh?: string
  es?: string
}
export interface ServicePageProps {
  lang: Lang
  title: Record<string, string>
  subtitle?: Record<string, string>
  description: Record<string, string>
  authority?: string | Record<string,string>
  waMessage: string
  bullets?: Array<Record<string, string>>
  sections?: Array<ContentSection>
  subsections?: Array<ContentSection>
  bodyContent?: Array<ContentSection>
  requiredDocs?: Array<Record<string, string>>
  faqItems?: FAQItem[]
  extraButtons?: Array<{ label: Record<string,string>; href: string; variant?: 'primary'|'secondary' }>
  isTableegh?: boolean
  breadcrumb?: Array<{ label: string; href: string }>
  relatedServices?: Array<{ label: Record<string,string>; href: string }>
  richBlocks?: RichBlock[]
  children?: React.ReactNode
}

const WA_ICON = <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884"/></svg>

const L = {
  price_from:  { en:'From', ar:'من', ru:'От', zh:'从', es:'Desde' },
  accepted_by: { en:'Accepted by', ar:'مقبول لدى', ru:'Принимается', zh:'被以下机构接受', es:'Aceptado por' },
  start_wa:    { en:'Start on WhatsApp — Reply in 5 Min', ar:'ابدأ عبر واتساب — رد خلال 5 دقائق', ru:'Начать в WhatsApp — ответ за 5 мин', zh:'通过 WhatsApp 开始 — 5分钟内回复', es:'Iniciar en WhatsApp — Respuesta en 5 Min' },
  tableegh:    { en:'⚠️ Tableegh delivery required for legal validity in Dubai Courts.', ar:'⚠️ التسليم عبر تبليغ مطلوب للصلاحية القانونية في محاكم دبي.', ru:'⚠️ Доставка через Tableegh обязательна для юридической силы в Dubai Courts.', zh:'⚠️ Tableegh送达是在Dubai Courts具有法律效力的必要条件。', es:'⚠️ La entrega por Tableegh es obligatoria para la validez legal en Dubai Courts.' },
  faq_h:       { en:'Frequently Asked Questions', ar:'الأسئلة الشائعة', ru:'Часто задаваемые вопросы', zh:'常见问题', es:'Preguntas Frecuentes' },
  req_docs_h:  { en:'Documents Required', ar:'المستندات المطلوبة', ru:'Необходимые документы', zh:'所需文件', es:'Documentos Requeridos' },
  cta_h:       { en:'Same-Day Service', ar:'خدمة نفس اليوم', ru:'Услуга в тот же день', zh:'当日服务', es:'Servicio el Mismo Día' },
  cta_sub:     { en:'Contact before 2 PM for same-day processing.', ar:'تواصل قبل 2 ظهراً للمعالجة في نفس اليوم.', ru:'Свяжитесь до 14:00 для обработки в тот же день.', zh:'下午2点前联系即可当日处理。', es:'Contacte antes de las 2 PM para el mismo día.' },
  same_day:    { en:'Same-Day Service — Contact Before 2 PM', ar:'خدمة نفس اليوم — تواصل قبل 2 ظهراً', ru:'В тот же день — до 14:00', zh:'当日服务 — 下午2点前', es:'Mismo Día — Antes de las 2 PM' },
  related_h:   { en:'Related Services', ar:'خدمات ذات صلة', ru:'Похожие услуги', zh:'相关服务', es:'Servicios Relacionados' },
  no_hidden:   { en:'No hidden fees', ar:'بدون رسوم خفية', ru:'Без скрытых сборов', zh:'无隐藏费用', es:'Sin cargos ocultos' },
  qr_code:     { en:'QR-Verified', ar:'مُتحقَّق منه QR', ru:'QR-верификация', zh:'二维码验证', es:'Verificado QR' },
  home:        { en:'Home', ar:'الرئيسية', ru:'Главная', zh:'首页', es:'Inicio' },
}

function ts(s: ContentSection, lang: Lang): string {
  return s[lang] || s.en || s.ar || ''
}
const SKIP_PHRASES = ['ready to get','whatsapp','contact us','get started','frequently asked','how it works']
function shouldSkip(section: ContentSection): boolean {
  // Only check English version — prevents accidentally hiding Arabic/Russian/Chinese content
  const enText = (section.en || '').toLowerCase()
  return SKIP_PHRASES.some(s => enText.includes(s))
}

export default function ServicePage({
  lang, title, subtitle, description, authority, waMessage,
  bullets, sections, subsections, bodyContent, requiredDocs,
  faqItems, extraButtons, isTableegh, breadcrumb, relatedServices, richBlocks, children
}: ServicePageProps) {
  const waUrl = getWaUrl(waMessage)
  const isRTL = lang === 'ar'

  // Filter visible items
  const visSections = (sections || []).filter(s => {
    const tx = ts(s, lang)
    return tx && !shouldSkip(s)
  })
  const paragraphs = (bodyContent || []).filter(p => {
    const tx = ts(p, lang)
    return tx && tx.length > 20 && !tx.startsWith('⚡') && !shouldSkip(p)
  })
  const visSubs = (subsections || []).filter(s => {
    const tx = ts(s, lang)
    return tx && !shouldSkip(s)
  })

  // BreadcrumbList JSON-LD — built from the same `breadcrumb` prop that drives
  // the visible UI nav, with Home prepended to match what users see.
  const breadcrumbSchemaItems =
    breadcrumb && breadcrumb.length > 0
      ? [
          { name: t(L.home, lang), url: `https://www.enotarydubai.ae/${lang}/` },
          ...breadcrumb.map((crumb) => ({
            name: crumb.label,
            url: `https://www.enotarydubai.ae/${lang}${crumb.href}/`.replace(/\/+$/, '/'),
          })),
        ]
      : []

  return (
    <>
      {breadcrumbSchemaItems.length > 0 && <BreadcrumbSchema items={breadcrumbSchemaItems}/>}
      {faqItems && faqItems.length > 0 && <FAQSchema items={faqItems} lang={lang}/>}

      {/* ── HERO ── */}
      <section className="relative hero-bg py-12 lg:py-16 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">

          {/* Breadcrumb */}
          {breadcrumb && breadcrumb.length > 0 && (
            <nav className="flex flex-wrap items-center gap-1.5 mb-5 text-xs text-navy-500">
              <Link href={`/${lang}`} className="hover:text-navy-300 transition-colors">{t(L.home, lang)}</Link>
              {breadcrumb.map((crumb, i) => (
                <span key={i} className="flex items-center gap-1.5">
                  <span className="text-navy-700">/</span>
                  {i === breadcrumb.length - 1
                    ? <span className="text-navy-400">{crumb.label}</span>
                    : <Link href={`/${lang}${crumb.href}`} className="hover:text-navy-300 transition-colors">{crumb.label}</Link>
                  }
                </span>
              ))}
            </nav>
          )}

          <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
            <div className="max-w-2xl">
              {subtitle && (
                <p className="overline-label mb-3">{t(subtitle, lang)}</p>
              )}
              <h1 className="font-serif font-bold text-white mb-4 leading-[1.08] tracking-tight"
                style={{fontSize:'clamp(28px, 4vw, 44px)', letterSpacing:'-0.02em'}}>
                {t(title, lang)}
              </h1>
              <p className="leading-relaxed mb-6 font-light"
                style={{color:'#7a9cc0', fontSize:'14px', maxWidth:'520px'}}>
                {t(description, lang)}
              </p>

              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2 mb-5">
                {authority && (
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1.5 rounded-md"
                    style={{background:'rgba(212,180,58,.1)',color:'#d4b43a',border:'1px solid rgba(212,180,58,.2)'}}>
                    <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                    </svg>
                    {typeof authority === 'string' ? authority : t(authority as Record<string,string>, lang)}
                  </span>
                )}
                <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1.5 rounded-md"
                  style={{background:'rgba(37,211,102,.08)',color:'#25D366',border:'1px solid rgba(37,211,102,.2)'}}>
                  <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                  {t(L.same_day, lang)}
                </span>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1.5 rounded-md"
                  style={{background:'rgba(74,106,150,.2)',color:'#b8cde0',border:'1px solid rgba(74,106,150,.3)'}}>
                  {t(L.qr_code, lang)}
                </span>
              </div>

              {/* Stats row */}
              <div className="hero-stats-row mb-5">
                <div className="hero-stat-item">
                  <span className="hero-stat-num">500+</span>
                  <div className="hero-stat-label">
                    <strong>{t({en:'Documents',ar:'وثيقة',ru:'Документов',zh:'份文件',es:'Documentos'}, lang)}</strong>
                    {t({en:'Notarized',ar:'موثقة',ru:'Заверено',zh:'已公证',es:'Notarizados'}, lang)}
                  </div>
                </div>
                <div className="hero-stat-sep" />
                <div className="hero-stat-item">
                  <span className="hero-stat-num">100%</span>
                  <div className="hero-stat-label">
                    <strong>{t({en:'First-Try',ar:'من الأولى',ru:'С первого',zh:'一次通过',es:'Primera Vez'}, lang)}</strong>
                    {t({en:'Accepted',ar:'مقبولة',ru:'Принято',zh:'接受率',es:'Aceptado'}, lang)}
                  </div>
                </div>
              </div>

              {/* Authority logos — infinite scrolling marquee */}
              <div className="mb-6" dir="ltr">
                <AcceptedByMarquee
                  variant="light"
                  logoHeight={56}
                  gap={14}
                  speed={50}
                  title={t(L.accepted_by, lang)}
                  showTitle={true}
                />
              </div>

              {/* CTA buttons */}
              <div className="flex flex-wrap gap-3">
                <a href={waUrl} target="_blank" rel="noopener noreferrer"
                  className="btn-wa px-6 py-3 shadow-lg shadow-black/20">
                  {WA_ICON} {t(L.start_wa, lang)}
                </a>
                {extraButtons?.map((btn) => (
                  <Link key={btn.href} href={btn.href}
                    className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-colors ${
                      btn.variant === 'primary' ? 'bg-gold-400 text-navy-900 hover:bg-gold-300'
                      : 'bg-navy-800 text-navy-200 hover:bg-navy-700 border border-navy-700'
                    }`}>
                    {t(btn.label, lang)}
                  </Link>
                ))}
              </div>
            </div>

            {/* poa-doc image right column */}
            <div className="hidden lg:flex items-center justify-center">
              <div className="relative">
                <div className="absolute -inset-4 rounded-3xl"
                  style={{background:'radial-gradient(ellipse at center, rgba(212,180,58,.06) 0%, transparent 70%)'}} />
                <img src="/assets/hero/poa-doc.png" alt="UAE Notary Document"
                  className="relative w-[340px] h-auto"
                  style={{filter:'drop-shadow(0 0 30px rgba(212,180,58,.12))'}} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tableegh notice */}
      {isTableegh && (
        <div className="bg-amber-50 border-y border-amber-200 py-3">
          <div className="mx-auto max-w-5xl px-4 lg:px-8">
            <p className="text-amber-800 text-sm font-medium">{t(L.tableegh, lang)}</p>
          </div>
        </div>
      )}

      {/* ── MAIN CONTENT ── */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-10">

            {/* ── Left: main content ── */}
            <article
              className="space-y-10 min-w-0"
              itemScope
              itemType="https://schema.org/Service"
            >

              {/* When richBlocks has content, skip generic sections to avoid duplication */}
              {richBlocks && richBlocks.length > 0 ? null : (
              <>
              {/* Generic bullets fallback */}
              {bullets && bullets.length > 0 && !visSections.length && (
                <div className="grid gap-3 sm:grid-cols-2">
                  {bullets.map((b, i) => (
                    <div key={i} className="feature-card">
                      <span className="feature-icon">
                        <svg className="w-3 h-3 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/>
                        </svg>
                      </span>
                      <p className="text-sm text-navy-700 leading-relaxed">{t(b, lang)}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Sections + content paired or separate */}
              {visSections.length > 0 && paragraphs.length > 0 && visSections.length === paragraphs.length ? (
                <div className="space-y-8">
                  {visSections.map((section, i) => {
                    const heading = ts(section, lang)
                    const para = ts(paragraphs[i], lang)
                    return (
                      <div key={i}>
                        <h2 className="gold-line font-serif text-xl font-bold text-navy-900 mb-3">{heading}</h2>
                        {para && <p className="text-sm text-navy-600 leading-relaxed">{para}</p>}
                      </div>
                    )
                  })}
                </div>
              ) : (
                <>
                  {visSections.length > 0 && (
                    <div className="space-y-6">
                      {visSections.map((section, i) => (
                        <h2 key={i} className="gold-line font-serif text-xl font-bold text-navy-900">
                          {ts(section, lang)}
                        </h2>
                      ))}
                    </div>
                  )}
                  {paragraphs.length > 0 && (
                    <div className="space-y-4">
                      {paragraphs.map((p, i) => {
                        const txt = ts(p, lang)
                        if (!txt) return null
                        return <p key={i} className="text-sm text-navy-600 leading-relaxed">{txt}</p>
                      })}
                    </div>
                  )}
                </>
              )}

              {/* Subsections as feature cards */}
              {visSubs.length > 0 && (
                <div className="grid gap-3 sm:grid-cols-2">
                  {visSubs.map((sub, i) => {
                    const subTitle = ts(sub, lang)
                    if (!subTitle) return null
                    return (
                      <div key={i} className="feature-card">
                        <span className="feature-icon">
                          <svg className="w-3 h-3 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/>
                          </svg>
                        </span>
                        <p className="text-sm text-navy-700 font-medium leading-relaxed">{subTitle}</p>
                      </div>
                    )
                  })}
                </div>
              )}

              </>
              )}

              {/* Rich content blocks — distinctive visual sections */}
              {richBlocks && richBlocks.length > 0 && (
                <RichContent blocks={richBlocks} lang={lang} />
              )}

              {/* Required docs */}
              {requiredDocs && requiredDocs.length > 0 && (
                <div>
                  <h2 className="gold-line font-serif text-xl font-bold text-navy-900 mb-4">
                    {t(L.req_docs_h, lang)}
                  </h2>
                  <ul className="space-y-2">
                    {requiredDocs.map((doc, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-navy-700 bg-navy-50 rounded-xl px-4 py-3 border border-navy-100">
                        <span className="text-gold-500 font-bold mt-0.5 shrink-0">{i+1}.</span>
                        {t(doc, lang)}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Custom slot */}
              {children}

              {/* FAQ */}
              {faqItems && faqItems.length > 0 && (
                <div>
                  <h2 id="faq-heading" className="gold-line font-serif text-xl font-bold text-navy-900 mb-6">
                    {t(L.faq_h, lang)}
                  </h2>
                  <FAQSection items={faqItems} lang={lang}/>
                </div>
              )}

              {/* Mobile CTA */}
              <div className="lg:hidden cta-block">
                <p className="text-gold-400 text-xs font-bold uppercase tracking-widest mb-1">{t(L.cta_h, lang)}</p>
                <p className="text-navy-400 text-xs mb-5">{t(L.cta_sub, lang)}</p>
                <div className="flex flex-wrap gap-3 justify-center">
                  <a href={waUrl} target="_blank" rel="noopener noreferrer"
                    className="btn-wa px-8 py-3.5">
                    {WA_ICON} {t(L.start_wa, lang)}
                  </a>
                  <a href={`tel:${site.phone}`}
                    className="inline-flex items-center gap-2 bg-navy-800 text-navy-200 font-bold px-6 py-3.5 rounded-xl hover:bg-navy-700 transition-colors text-sm border border-navy-700">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 7V5z"/>
                    </svg>
                    {site.phone_display}
                  </a>
                </div>
              </div>
            </article>

            {/* ── Sticky Sidebar (desktop only) ── */}
            <aside className="hidden lg:block" aria-label="Service Navigation">
              <div className="sticky top-20 space-y-3">

                {/* CTA card */}
                <div className="rounded-xl overflow-hidden" style={{background:'#060e1f',border:'1px solid rgba(212,180,58,.12)'}}>
                  <div className="px-5 py-3" style={{background:'rgba(212,180,58,.08)',borderBottom:'1px solid rgba(212,180,58,.12)'}}>
                    <p className="text-[10px] font-bold uppercase tracking-[.14em]" style={{color:'#d4b43a'}}>{t(L.cta_h, lang)}</p>
                  </div>
                  <div className="px-5 py-4">
                    <p className="text-xs leading-relaxed mb-4" style={{color:'#4a6a96',fontWeight:300}}>{t(L.cta_sub, lang)}</p>
                    <a href={waUrl} target="_blank" rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full font-bold text-sm text-white rounded-lg py-3 mb-2.5 transition-colors hover:opacity-90"
                      style={{background:'#25D366'}}>
                      {WA_ICON} WhatsApp
                    </a>
                    <a href={`tel:${site.phone}`}
                      className="flex items-center justify-center gap-2 w-full text-xs font-semibold rounded-lg py-2.5 transition-colors"
                      style={{background:'rgba(255,255,255,.05)',color:'#7a9cc0',border:'1px solid rgba(74,106,150,.3)'}}>
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 7V5z"/>
                      </svg>
                      {site.phone_display}
                    </a>
                  </div>
                </div>

                {/* No hidden fees */}
                <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl"
                  style={{background:'rgba(29,158,117,.06)',border:'1px solid rgba(29,158,117,.15)'}}>
                  <svg className="w-4 h-4 shrink-0" fill="none" stroke="#1d9e75" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <p className="text-xs font-semibold" style={{color:'#0f6e56'}}>{t(L.no_hidden, lang)}</p>
                </div>

                {/* Related services */}
                {relatedServices && relatedServices.length > 0 && (
                  <div className="rounded-xl overflow-hidden" style={{border:'1px solid #e8ecf5'}}>
                    <div className="px-4 py-3" style={{borderBottom:'1px solid #f0f2f8'}}>
                      <p className="text-[10px] font-bold uppercase tracking-[.1em]" style={{color:'#8a9abc'}}>{t(L.related_h, lang)}</p>
                    </div>
                    <div>
                      {relatedServices.map((svc, i) => (
                        <Link key={i} href={svc.href}
                          className="flex items-center justify-between px-4 py-2.5 group transition-colors hover:bg-navy-50"
                          style={{borderBottom: i < relatedServices.length - 1 ? '1px solid #f7f8fb' : 'none'}}>
                          <span className="text-xs font-medium text-navy-700 group-hover:text-gold-600 transition-colors">{t(svc.label, lang)}</span>
                          <svg className="w-3 h-3 flex-shrink-0 text-navy-400 group-hover:text-gold-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d={isRTL ? 'M15 19l-7-7 7-7' : 'M9 5l7 7-7 7'}/>
                          </svg>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </aside>

          </div>
        </div>
      </section>
    </>
  )
}
