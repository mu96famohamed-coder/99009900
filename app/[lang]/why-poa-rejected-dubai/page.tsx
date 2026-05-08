import type { Metadata } from 'next'
import { LANGS, type Lang, getPageContent, getPageBlocks, getPageFaq, getServiceFaq, HREFLANG_MAP } from '@/lib/i18n'
import ServicePage from '@/components/ServicePage'
import { LegalServiceSchema } from '@/components/SchemaMarkup'

interface Props { params: Promise<{ lang: Lang }> }

export async function generateStaticParams() {
  return LANGS.map((l) => ({ lang: l }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  const seo = (getPageContent('/why-poa-rejected-dubai') as any)?.seo
  return {
    title:       seo?.meta_title?.[lang]       ?? seo?.meta_title?.en,
    description: seo?.meta_description?.[lang] ?? seo?.meta_description?.en,
    alternates: {
      canonical: `https://www.enotarydubai.ae/${lang}/why-poa-rejected-dubai/`,
      'x-default': `https://www.enotarydubai.ae/en/why-poa-rejected-dubai/`,
        languages: Object.fromEntries(
        LANGS.map((l) => [HREFLANG_MAP[l], `https://www.enotarydubai.ae/${l}/why-poa-rejected-dubai/`])
      ),
    },
  }
}

export default async function Page({ params }: Props) {
  const { lang } = await params
  const seo = (getPageContent('/why-poa-rejected-dubai') as any)?.seo
  let faqItems = getPageFaq('/why-poa-rejected-dubai')
  if (faqItems.length === 0) {
    faqItems = getServiceFaq('poa_rejection')
  }
  return (
    <>
      <LegalServiceSchema lang={lang} path="/why-poa-rejected-dubai" />
      <ServicePage
        lang={lang}
        title={seo?.h1}
        description={seo?.meta_description}
        authority={seo?.authority}
        waMessage={(seo?.wa_message?.[lang] ?? seo?.wa_message?.en) as string}
        faqItems={faqItems}
        richBlocks={getPageBlocks('/why-poa-rejected-dubai')}
      />
    </>
  )
}
