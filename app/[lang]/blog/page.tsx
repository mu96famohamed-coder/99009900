import type { Metadata } from 'next'
import Link from 'next/link'
import { LANGS, type Lang, t , getPageMeta, HREFLANG_MAP } from '@/lib/i18n'
import { LegalServiceSchema } from '@/components/SchemaMarkup'
import content from '@/data/content.json'

interface Props { params: Promise<{ lang: Lang }> }

export async function generateStaticParams() { return LANGS.map((lang) => ({ lang })) }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  const titles: Record<string, string> = {
    en: 'Legal Blog & Resources Dubai | E-Notary Dubai',
    ar: 'المدونة والموارد القانونية دبي | E-Notary Dubai',
    ru: 'Юридический блог Дубай | E-Notary Dubai',
    zh: '迪拜法律博客 | E-Notary Dubai',
    es: 'Blog Legal Dubái | E-Notary Dubai',
  }
  const descs: Record<string, string> = {
    en: 'Legal guides and resources about POA, notary, MOFA attestation and more in Dubai, UAE.',
    ar: 'أدلة قانونية وموارد حول الوكالات والتوثيق وتصديق الخارجية وأكثر في دبي.',
    ru: 'Юридические руководства о доверенностях, нотариусе и легализации в Дубае.',
    zh: '关于迪拜授权委托书、公证、外交部认证等的法律指南。',
    es: 'Guías legales sobre POA, notario, autenticación MOFA y más en Dubái.',
  }
  return {
    title: titles[lang] || titles.en,
    description: descs[lang] || descs.en,
    alternates: {
      canonical: `https://www.enotarydubai.ae/${lang}/blog/`,
      'x-default': `https://www.enotarydubai.ae/en/blog/`,
        languages: Object.fromEntries(LANGS.map((l) => [HREFLANG_MAP[l], `https://www.enotarydubai.ae/${l}/blog/`])),
    },
  }
}

const LABELS = {
  h1: { en: 'Legal Insights & Resources', ar: 'رؤى وموارد قانونية', ru: 'Юридические статьи', zh: '法律见解与资源', es: 'Perspectivas Legales y Recursos' },
  sub: { en: 'Expert guides on POA, notarization, attestation and UAE legal services.', ar: 'أدلة متخصصة حول الوكالات والتوثيق والتصديق والخدمات القانونية في الإمارات.', ru: 'Экспертные руководства по доверенностям, нотариусу и легализации в ОАЭ.', zh: '关于授权书、公证、认证及阿联酋法律服务的专家指南。', es: 'Guías expertas sobre POA, notarización, autenticación y servicios legales en los EAU.' },
  read: { en: 'Read article →', ar: '← اقرأ المقال', ru: 'Читать →', zh: '阅读文章 →', es: 'Leer artículo →' },
}

function slugToTitle(slug: string): string {
  return slug.split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
    .replace('Poa', 'POA')
    .replace('Rdc', 'RDC')
    .replace('Uae', 'UAE')
    .replace('Mofa', 'MOFA')
    .replace('Dld', 'DLD')
}

const blogContent = content.blog_content as Record<string, {
  title_en?: string; title_ar?: string; title_ru?: string; title_zh?: string; title_es?: string;
  meta_en?: string; meta_ar?: string; meta_ru?: string; meta_zh?: string; meta_es?: string;
  date?: string;
}>

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

export default async function BlogPage({ params }: Props) {
  const { lang } = await params

  return (
    <div className="bg-navy-50 min-h-[80vh]">
      <LegalServiceSchema lang={lang} path="/blog" />
      {/* Hero */}
      <div className="hero-bg py-12">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="badge-gold">{t({en:'Legal Resources',ar:'موارد قانونية',ru:'Правовые ресурсы',zh:'法律资源',es:'Recursos Legales'}, lang)}</span>
            <span className="badge-navy">{BLOG_SLUGS.length} {t({en:'Articles',ar:'مقالة',ru:'статей',zh:'篇文章',es:'Artículos'}, lang)}</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-white sm:text-4xl mb-3">
            {t(LABELS.h1, lang)}
          </h1>
          <p className="text-navy-300 text-sm max-w-2xl">{t(LABELS.sub, lang)}</p>
        </div>
      </div>

      {/* Articles grid */}
      <div className="mx-auto max-w-4xl px-4 lg:px-8 py-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {BLOG_SLUGS.map((slug) => {
            const bc = blogContent[slug]
            const titleKey = `title_${lang}` as keyof typeof bc
            const metaKey = `meta_${lang}` as keyof typeof bc
            const title = (bc?.[titleKey] as string) || bc?.title_en || slugToTitle(slug)
            const desc = (bc?.[metaKey] as string) || bc?.meta_en || ''
            const date = bc?.date ? new Date(bc.date).toLocaleDateString(
              lang === 'ar' ? 'ar-AE' : lang === 'zh' ? 'zh-CN' : lang === 'ru' ? 'ru-RU' : lang === 'es' ? 'es-ES' : 'en-GB',
              { year: 'numeric', month: 'short', day: 'numeric' }
            ) : null
            return (
              <Link
                key={slug}
                href={`/${lang}/blog/${slug}`}
                className="blog-card group"
              >
                <div className="flex items-center justify-between mb-3">
                  {date && (
                    <time className="text-[11px] text-navy-400 font-medium">{date}</time>
                  )}
                  <span className="text-[10px] font-bold text-navy-400 uppercase tracking-wide">
                    {t({en:'Article',ar:'مقالة',ru:'Статья',zh:'文章',es:'Artículo'}, lang)}
                  </span>
                </div>
                <h2 className="font-serif font-bold text-navy-900 text-sm leading-snug mb-2 group-hover:text-gold-600 transition-colors line-clamp-2">
                  {title}
                </h2>
                {desc && (
                  <p className="text-xs text-navy-500 leading-relaxed mb-4 line-clamp-2">{desc}</p>
                )}
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-gold-600 group-hover:gap-2 transition-all duration-200">
                  {t(LABELS.read, lang)}
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
