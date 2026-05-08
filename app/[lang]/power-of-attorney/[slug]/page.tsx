import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { LANGS, type Lang, t, services, getPageContent, getPageBlocks, getPageFaq, getServiceFaq, getRequiredDocs, HREFLANG_MAP } from '@/lib/i18n'
import ServicePage from '@/components/ServicePage'
import { LegalServiceSchema } from '@/components/SchemaMarkup'

interface Props {
  params: Promise<{ lang: Lang; slug: string }>
}

export async function generateStaticParams() {
  const params: Record<string, string>[] = []
  for (const lang of LANGS) {
    for (const type of (services.poa as any).types) {
      params.push({ lang, slug: type.slug })
    }
  }
  return params
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params
  const type = (services.poa as any).types.find((tp: any) => tp.slug === slug)
  if (!type) return {}
  const seo = (getPageContent(`/power-of-attorney/${slug}`) as any)?.seo
  return {
    title:       seo?.meta_title?.[lang]       ?? seo?.meta_title?.en       ?? `${t(type.title, lang)} Dubai | E-Notary Dubai`,
    description: seo?.meta_description?.[lang] ?? seo?.meta_description?.en ?? t(type.desc, lang),
    alternates: {
      canonical: `https://www.enotarydubai.ae/${lang}/power-of-attorney/${slug}/`,
      'x-default': `https://www.enotarydubai.ae/en/power-of-attorney/${slug}/`,
        languages: Object.fromEntries(LANGS.map((l) => [HREFLANG_MAP[l], `https://www.enotarydubai.ae/${l}/power-of-attorney/${slug}/`])),
    },
  }
}

const FAQ_KEY: Record<string, string> = {
  general:            'poa_general',
  special:            'poa_special',
  'real-estate':      'poa_real_estate',
  vehicle:            'poa_vehicle',
  bank:               'poa_bank',
  'child-travel':     'poa_child_travel',
  court:              'poa_court',
  inheritance:        'poa_inheritance',
  mohre:              'poa_mohre',
  'company-formation':'poa_company_formation',
  'property-gifting': 'poa_property_gifting',
}

const DOCS_KEY: Record<string, string> = {
  general:       'poa_general',
  'real-estate': 'poa_real_estate',
}

const SUBTITLE = {
  en: 'Power of Attorney · Dubai',
  ar: 'وكالة رسمية · دبي',
  ru: 'Доверенность · Дубай',
  zh: '授权委托书 · 迪拜',
  es: 'Poder Notarial · Dubái',
}

export default async function POATypePage({ params }: Props) {
  const { lang, slug } = await params
  const type = (services.poa as any).types.find((tp: any) => tp.slug === slug)
  if (!type) notFound()

  const pageSlug = `/power-of-attorney/${slug}`
  const seo      = (getPageContent(pageSlug) as any)?.seo

  // Title: seo.h1 first, fallback to services type.title
  const pageTitle = seo?.h1 ?? type.title

  // WA message: seo.wa_message first, fallback to type.wa_message
  const waMessage = seo?.wa_message?.[lang] ?? seo?.wa_message?.en ?? type.wa_message

  // FAQ: page-level first, then service-level fallback
  let faqItems = getPageFaq(pageSlug)
  if (faqItems.length === 0 && FAQ_KEY[slug]) {
    faqItems = getServiceFaq(FAQ_KEY[slug]).slice(0, 3)
  }

  return (
    <>
      <LegalServiceSchema lang={lang} path={`/power-of-attorney/${slug}`} />
      <ServicePage
        lang={lang}
        title={pageTitle}
        subtitle={SUBTITLE}
        description={seo?.meta_description ?? type.desc}
        authority={type.authority}
        waMessage={waMessage}
        requiredDocs={getRequiredDocs(DOCS_KEY[slug] ?? '')}
        faqItems={faqItems.length > 0 ? faqItems : undefined}
        richBlocks={getPageBlocks(pageSlug)}
      />
    </>
  )
}
