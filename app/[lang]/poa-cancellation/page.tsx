import type { Metadata } from 'next'
import { LANGS, type Lang, getPageContent, getPageBlocks, getPageFaq, HREFLANG_MAP } from '@/lib/i18n'
import ServicePage from '@/components/ServicePage'
import { LegalServiceSchema } from '@/components/SchemaMarkup'

interface Props { params: Promise<{ lang: Lang }> }

export async function generateStaticParams() {
  return LANGS.map((l) => ({ lang: l }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  const seo = (getPageContent('/poa-cancellation') as any)?.seo
  return {
    title:       seo?.meta_title?.[lang]       ?? seo?.meta_title?.en,
    description: seo?.meta_description?.[lang] ?? seo?.meta_description?.en,
    alternates: {
      canonical: `https://www.enotarydubai.ae/${lang}/poa-cancellation/`,
      'x-default': `https://www.enotarydubai.ae/en/poa-cancellation/`,
        languages: Object.fromEntries(
        LANGS.map((l) => [HREFLANG_MAP[l], `https://www.enotarydubai.ae/${l}/poa-cancellation/`])
      ),
    },
  }
}

export default async function Page({ params }: Props) {
  const { lang } = await params
  const seo = (getPageContent('/poa-cancellation') as any)?.seo
  return (
    <>
      <LegalServiceSchema lang={lang} path="/poa-cancellation" />
      <ServicePage
        lang={lang}
        title={seo?.h1}
        description={seo?.meta_description}
        authority={seo?.authority}
        waMessage={(seo?.wa_message?.[lang] ?? seo?.wa_message?.en) as string}
        faqItems={getPageFaq('/poa-cancellation')}
        richBlocks={getPageBlocks('/poa-cancellation')}
      />
    </>
  )
}
