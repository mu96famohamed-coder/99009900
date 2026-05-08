import type { Metadata } from 'next'
import { LANGS, type Lang, t, getPageFaq, getServiceFaq, HREFLANG_MAP } from '@/lib/i18n'
import FAQSection from '@/components/FAQSection'

import { LegalServiceSchema } from '@/components/SchemaMarkup'
interface Props { params: Promise<{ lang: Lang }> }
export async function generateStaticParams() { return LANGS.map((lang) => ({ lang })) }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  const titles: Record<string, string> = {
    en: 'FAQ — POA, Attestation & Notary Dubai 2026 | E-Notary Dubai',
    ar: 'الأسئلة الشائعة — التوثيق والوكالات في دبي | E-Notary Dubai',
    ru: 'Вопросы и ответы | E-Notary Dubai Дубай',
    zh: '常见问题 | E-Notary Dubai迪拜',
    es: 'Preguntas Frecuentes | E-Notary Dubai Dubái',
  }
  return {
    title: titles[lang] || titles.en,
    description: ({
      en: 'Answers to everything about POA, attestation, eviction notices, and notarization in Dubai.',
      ar: 'إجابات على الوكالات والتصديق وإشعارات الإخلاء والتوثيق في دبي.',
      ru: 'Ответы о доверенностях, легализации, выселении и нотариате в Дубае.',
      zh: '关于迪拜授权书、认证、驱逐通知和公证的所有问题解答。',
      es: 'Respuestas sobre POA, autenticación, desalojo y notarización en Dubái.',
    } as Record<string,string>)[lang] || 'FAQ about notary support in Dubai.',
    alternates: { canonical: `https://www.enotarydubai.ae/${lang}/faq/`,
      'x-default': `https://www.enotarydubai.ae/en/faq/`,
      languages: Object.fromEntries(LANGS.map((l) => [HREFLANG_MAP[l], `https://www.enotarydubai.ae/${l}/faq/`]))
    },
  }
}

const SECTIONS = [
  { key: 'faq_page', label: { en: 'General Questions', ar: 'أسئلة عامة', ru: 'Общие вопросы', zh: '常见问题', es: 'Preguntas Generales' } },
  { key: 'poa_general', label: { en: 'Power of Attorney', ar: 'الوكالات الرسمية', ru: 'Доверенности', zh: '授权委托书', es: 'Poder Notarial' } },
  { key: 'attestation_mofa', label: { en: 'MOFA Attestation & Apostille', ar: 'تصديق MOFA والأبوستيل', ru: 'Легализация MOFA и апостиль', zh: 'MOFA认证与海牙认证', es: 'Autenticación MOFA y Apostilla' } },
  { key: 'eviction_notice', label: { en: 'Eviction Notices', ar: 'إشعارات الإخلاء', ru: 'Уведомления о выселении', zh: '驱逐通知', es: 'Avisos de Desalojo' } },
  { key: 'legal_notice', label: { en: 'Legal Notices', ar: 'الإنذارات القانونية', ru: 'Юридические уведомления', zh: '法律通知', es: 'Notificaciones Legales' } },
  { key: 'overseas_poa', label: { en: 'POA from Outside UAE', ar: 'وكالة من خارج الإمارات', ru: 'Доверенность из-за рубежа', zh: '海外授权书', es: 'POA desde el Exterior' } },
  { key: 'e_notary', label: { en: 'E-Notary & Remote Services', ar: 'التوثيق الإلكتروني والخدمات عن بُعد', ru: 'Электронный нотариус', zh: '电子公证与远程服务', es: 'Notario Electrónico' } },
  { key: 'pricing_page', label: { en: 'Pricing & Fees', ar: 'الأسعار والرسوم', ru: 'Цены и сборы', zh: '价格与费用', es: 'Precios y Tarifas' } },
]

export default async function FAQPage({ params }: Props) {
  const { lang } = await params

  return (
    <div className="bg-navy-50 min-h-[80vh]">
      <LegalServiceSchema lang={lang} path="/faq" />
      <div className="hero-bg py-12">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <h1 id="faq-heading" className="font-serif text-3xl font-bold text-white sm:text-4xl mb-3">
            {t({ en: 'Frequently Asked Questions', ar: 'الأسئلة الشائعة', ru: 'Часто задаваемые вопросы', zh: '常见问题', es: 'Preguntas Frecuentes' }, lang)}
          </h1>
          <p className="text-navy-300 text-sm">
            {t({ en: 'Everything about POA, attestation, eviction notices and notarization in Dubai.', ar: 'كل شيء عن الوكالات والتصديق وإشعارات الإخلاء والتوثيق في دبي.', ru: 'Всё о доверенностях, легализации и нотариусе в Дубае.', zh: '关于迪拜授权书、认证、驱逐通知和公证的一切。', es: 'Todo sobre POA, autenticación, avisos de desalojo y notarización en Dubái.' }, lang)}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 lg:px-8 py-12 space-y-12">
        {SECTIONS.map(({ key, label }) => {
          const items = getServiceFaq(key)
          if (!items.length) return null
          return (
            <div key={key}>
              <h2 className="gold-line font-serif text-xl font-bold text-navy-900 mb-6 inline-block">
                {t(label, lang)}
              </h2>
              <FAQSection items={items} lang={lang} />
            </div>
          )
        })}
      </div>
    </div>
  )
}
