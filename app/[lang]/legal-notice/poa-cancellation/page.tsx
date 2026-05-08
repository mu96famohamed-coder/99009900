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
  const seo = (getPageContent('/legal-notice/poa-cancellation') as any)?.seo
  return {
    title:       seo?.meta_title?.[lang]       ?? seo?.meta_title?.en,
    description: seo?.meta_description?.[lang] ?? seo?.meta_description?.en,
    alternates: {
      canonical: `https://www.enotarydubai.ae/${lang}/legal-notice/poa-cancellation/`,
      'x-default': `https://www.enotarydubai.ae/en/legal-notice/poa-cancellation/`,
        languages: Object.fromEntries(
        LANGS.map((l) => [HREFLANG_MAP[l], `https://www.enotarydubai.ae/${l}/legal-notice/poa-cancellation/`])
      ),
    },
  }
}

export default async function Page({ params }: Props) {
  const { lang } = await params
  const seo = (getPageContent('/legal-notice/poa-cancellation') as any)?.seo
  return (
    <>
      <LegalServiceSchema lang={lang} path="/legal-notice/poa-cancellation" />
      <ServicePage
        lang={lang}
        title={seo?.h1}
        description={seo?.meta_description}
        authority={seo?.authority}
        waMessage={(seo?.wa_message?.[lang] ?? seo?.wa_message?.en) as string}
        faqItems={getPageFaq('/legal-notice/poa-cancellation')}
        richBlocks={getPageBlocks('/legal-notice/poa-cancellation')}
      />
    </>
  )
}
