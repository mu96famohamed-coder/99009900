import Link from 'next/link'
import { type Lang, t, site, cta } from '@/lib/i18n'
import FAQSection from '@/components/FAQSection'
import { BreadcrumbSchema } from '@/components/SchemaMarkup'

interface FAQItem {
  q: Record<string, string>
  a: Record<string, string>
}

interface BreadcrumbItem {
  label: string
  href?: string
}

interface Props {
  lang: Lang
  h1: string
  h1Ar?: string
  tagline?: string
  authority?: string
  waMessage: string
  breadcrumbs: BreadcrumbItem[]
  children?: React.ReactNode
  faqItems?: FAQItem[]
  badge?: string
  showTableegh?: boolean
}

const LABELS = {
  accepted_by: { en: 'Accepted by', ar: 'مقبول من', ru: 'Принимается', zh: '被接受', es: 'Aceptado por' },
  tableegh: { en: 'Requires Tableegh delivery', ar: 'يتطلب تسليم عبر تبليغ', ru: 'Требует доставки Tableegh', zh: '需要Tableegh送达', es: 'Requiere entrega Tableegh' },
  faq_title: { en: 'Frequently Asked Questions', ar: 'الأسئلة الشائعة', ru: 'Часто задаваемые вопросы', zh: '常见问题', es: 'Preguntas Frecuentes' },
  contact_title: { en: 'Ready to Start?', ar: 'هل أنت مستعد للبدء؟', ru: 'Готовы начать?', zh: '准备好开始了吗？', es: '¿Listo para Comenzar?' },
  contact_sub: { en: 'We reply within 5 minutes via WhatsApp. Same-day service available if you contact before 2 PM.', ar: 'نرد خلال 5 دقائق عبر واتساب. خدمة نفس اليوم متاحة إذا تواصلت قبل الساعة 2 ظهراً.', ru: 'Отвечаем за 5 минут через WhatsApp. Услуга в тот же день при обращении до 14:00.', zh: '5分钟内通过WhatsApp回复。下午2点前联系可提供当日服务。', es: 'Respondemos en 5 minutos por WhatsApp. Servicio en el mismo día si contacta antes de las 2 PM.' },
  same_day: { en: '⚡ Same-Day Service — Contact Before 2 PM', ar: '⚡ خدمة نفس اليوم — تواصل قبل الساعة 2 ظهراً', ru: '⚡ Услуга в тот же день — до 14:00', zh: '⚡ 当日服务 — 下午2点前联系', es: '⚡ Servicio en el Mismo Día — Antes de las 2 PM' },
}

export default function ServicePageLayout({
  lang, h1, h1Ar, tagline, authority, waMessage,
  breadcrumbs, children, faqItems, badge, showTableegh
}: Props) {
  const waUrl = `https://wa.me/${site.phone.replace(/\D/g,'')}?text=${encodeURIComponent(waMessage)}`
  const isRtl = lang === 'ar'

  // BreadcrumbList JSON-LD — built from the same `breadcrumbs` prop that
  // drives the visible UI nav. Items with an href become linked entries;
  // the final item (usually without href) still gets a canonical URL
  // derived from the current language so crawlers see a complete chain.
  const breadcrumbSchemaItems = (breadcrumbs || []).map((crumb) => {
    const origin = 'https://www.enotarydubai.ae'
    const path = crumb.href ?? `/${lang}/`
    const url = path.startsWith('http')
      ? path
      : `${origin}${path.startsWith('/') ? path : `/${path}`}`
    return { name: crumb.label, url }
  })

  return (
    <>
      {breadcrumbSchemaItems.length > 0 && <BreadcrumbSchema items={breadcrumbSchemaItems}/>}
      {/* Hero */}
      <section className="bg-navy-900 py-10 sm:py-14">
        <div className="mx-auto max-w-5xl px-4 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-navy-400 mb-6 flex-wrap">
            {breadcrumbs.map((crumb, i) => (
              <span key={i} className="flex items-center gap-2">
                {i > 0 && (
                  <svg className="w-3 h-3 text-navy-600 flip" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                )}
                {crumb.href ? (
                  <Link href={crumb.href} className="hover:text-gold-400 transition-colors">{crumb.label}</Link>
                ) : (
                  <span className="text-navy-300">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>

          {/* Title */}
          <div className="flex flex-wrap items-start gap-3 mb-4">
            {badge && (
              <span className="inline-flex items-center gap-1.5 bg-[#25D366]/10 text-[#25D366] text-xs font-bold px-3 py-1.5 rounded-full border border-[#25D366]/20 mt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
                {badge}
              </span>
            )}
          </div>

          <h1 className="font-serif font-bold text-white text-3xl sm:text-4xl leading-tight mb-3">
            {h1}
          </h1>
          {isRtl && h1Ar && (
            <p className="font-arab text-gold-400/70 text-xl mb-4 font-medium">{h1Ar}</p>
          )}
          {tagline && (
            <p className="text-navy-300 text-base leading-relaxed mb-6 max-w-2xl">{tagline}</p>
          )}

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-4 mb-8">
            
            {authority && (
              <div className="flex items-center gap-2 bg-navy-800 rounded-full px-3 py-1.5 border border-navy-700">
                <svg className="w-3.5 h-3.5 text-gold-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-xs text-navy-300">{t(LABELS.accepted_by, lang)}: <strong className="text-white">{authority}</strong></span>
              </div>
            )}
            {showTableegh && (
              <div className="flex items-center gap-2 bg-amber-500/10 rounded-full px-3 py-1.5 border border-amber-500/20">
                <span className="text-xs text-amber-400 font-medium">{t(LABELS.tableegh, lang)}</span>
              </div>
            )}
          </div>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-3">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] text-white font-bold px-6 py-3 rounded-xl hover:bg-[#20b958] transition-colors text-sm"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884"/>
              </svg>
              {t(cta.start, lang)}
            </a>
            <a
              href={`tel:${site.phone}`}
              className="inline-flex items-center gap-2 bg-navy-800 border border-navy-700 text-white font-semibold px-5 py-3 rounded-xl hover:bg-navy-700 transition-colors text-sm"
            >
              {site.phone_display}
            </a>
          </div>
        </div>
      </section>

      {/* Same-day banner */}
      <div className="bg-gold-400/10 border-b border-gold-400/20 py-2.5">
        <div className="mx-auto max-w-5xl px-4 lg:px-8 text-center">
          <p className="text-xs font-semibold text-gold-600">{t(LABELS.same_day, lang)}</p>
        </div>
      </div>

      {/* Main content */}
      {children && (
        <section className="py-12 bg-white">
          <div className="mx-auto max-w-5xl px-4 lg:px-8">
            {children}
          </div>
        </section>
      )}

      {/* FAQ */}
      {faqItems && faqItems.length > 0 && (
        <section className="bg-navy-50 py-12 border-t border-navy-100">
          <div className="mx-auto max-w-4xl px-4 lg:px-8">
            <h2 id="faq-heading" className="gold-line font-serif text-2xl font-bold text-navy-900 mb-8 inline-block">
              {t(LABELS.faq_title, lang)}
            </h2>
            <FAQSection items={faqItems} lang={lang} />
          </div>
        </section>
      )}

      {/* Contact CTA */}
      <section className="bg-navy-900 py-12 border-t border-navy-800">
        <div className="mx-auto max-w-3xl px-4 lg:px-8 text-center">
          <h2 className="font-serif text-2xl font-bold text-white mb-3">
            {t(LABELS.contact_title, lang)}
          </h2>
          <p className="text-navy-300 text-sm mb-8 max-w-md mx-auto">
            {t(LABELS.contact_sub, lang)}
          </p>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] text-white font-bold px-8 py-3.5 rounded-xl hover:bg-[#20b958] transition-colors text-sm"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884"/>
            </svg>
            {t(cta.start, lang)}
          </a>
        </div>
      </section>
    </>
  )
}
