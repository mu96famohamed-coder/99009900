import type { Metadata } from 'next'
import { LANGS, type Lang, getPageContent, getPageBlocks, getServiceFaq, HREFLANG_MAP } from '@/lib/i18n'
import ServicePage from '@/components/ServicePage'
import { LegalServiceSchema } from '@/components/SchemaMarkup'

interface Props { params: Promise<{ lang: Lang }> }

export async function generateStaticParams() {
  return LANGS.map((l) => ({ lang: l }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  const pc = getPageContent('/power-of-attorney') as any
  const seo = pc?.seo

  return {
    title:       seo?.meta_title?.[lang]       ?? seo?.meta_title?.en,
    description: seo?.meta_description?.[lang] ?? seo?.meta_description?.en,
    alternates: {
      canonical: `https://www.enotarydubai.ae/${lang}/power-of-attorney/`,
      'x-default': `https://www.enotarydubai.ae/en/power-of-attorney/`,
        languages: Object.fromEntries(
        LANGS.map((l) => [HREFLANG_MAP[l], `https://www.enotarydubai.ae/${l}/power-of-attorney/`])
      ),
    },
  }
}

export default async function Page({ params }: Props) {
  const { lang } = await params
  const pc = getPageContent('/power-of-attorney') as any
  const seo = pc?.seo

  return (
    <>
      <LegalServiceSchema lang={lang} path="/power-of-attorney" />
      <ServicePage
        lang={lang}
        title={seo?.h1}
        subtitle={{ en: 'E-Notary Dubai · Dubai', ar: 'E-Notary Dubai · دبي', ru: 'E-Notary Dubai · Дубай', zh: 'E-Notary Dubai · 迪拜', es: 'E-Notary Dubai · Dubái' }}
        description={seo?.meta_description}
        authority="All UAE Authorities"
        waMessage={(seo?.wa_message?.[lang] ?? seo?.wa_message?.en) as string}
        faqItems={getServiceFaq('poa_general')}
        richBlocks={getPageBlocks('/power-of-attorney')}
      />
    </>
  )
}
