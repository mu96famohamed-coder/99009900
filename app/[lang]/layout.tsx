import type { Metadata } from 'next'
import Script from 'next/script'
import '../globals.css'
import { notFound } from 'next/navigation'
import { isValidLang, getDir, getFontClass, LANGS, type Lang, site } from '@/lib/i18n'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FloatingWA from '@/components/FloatingWA'
import { LocalBusinessSchema } from '@/components/SchemaMarkup'

interface Props {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}

export async function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  const titles: Record<string, string> = {
    en: 'Notary Support Dubai | POA & Attestation | E-Notary Dubai',
    ar: 'دعم كاتب العدل دبي 2026 | وكالات وتصديق | E-Notary Dubai',
    ru: 'Нотариальная поддержка Дубай 2026 | Доверенность | E-Notary Dubai',
    zh: '迪拜公证支持 2026 | 授权委托书及认证 | E-Notary Dubai',
    es: 'Soporte Notarial Dubái 2026 | Poder Notarial | E-Notary Dubai',
  }
  const descs: Record<string, string> = {
    en: 'Dubai private notary support — POA, MOFA attestation, legal notices & corporate documents. Same-day. Remote e-notary.',
    ar: 'دعم كاتب العدل الخاص في دبي — وكالات، تصديق الخارجية، إنذارات قانونية. خدمة في نفس اليوم.',
    ru: 'Частная нотариальная поддержка в Дубае — доверенности, легализация MOFA. В тот же день.',
    zh: '迪拜私人公证支持 — 授权委托书，外交部认证。当日服务。',
    es: 'Soporte notarial privado en Dubái — Poderes, autenticación MOFA. Mismo día.',
  }
  return {
    title: titles[lang] || titles.en,
    description: descs[lang] || descs.en,
    robots: 'index, follow',
    alternates: {
      canonical: `https://www.enotarydubai.ae/${lang}/`,
      languages: {
        'en-AE': 'https://www.enotarydubai.ae/en/',
        'ar-AE': 'https://www.enotarydubai.ae/ar/',
        'ru-AE': 'https://www.enotarydubai.ae/ru/',
        'zh-Hans-AE': 'https://www.enotarydubai.ae/zh/',
        'es-AE': 'https://www.enotarydubai.ae/es/',
        'x-default': 'https://www.enotarydubai.ae/en/',
      },
    },
    openGraph: {
      title: titles[lang] || titles.en,
      description: descs[lang] || descs.en,
      url: `https://www.enotarydubai.ae/${lang}/`,
      siteName: 'E-Notary Dubai',
      locale: lang,
      type: 'website',
    },
    twitter: { card: 'summary_large_image' },
  }
}

export default async function LangLayout({ children, params }: Props) {
  const { lang } = await params

  if (!isValidLang(lang)) notFound()

  const dir = getDir(lang)
  const fontClass = getFontClass(lang)

  return (
    <html lang={lang} dir={dir}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="geo.region" content="AE-DU" />
        <meta name="geo.placename" content="Dubai, UAE" />
        <meta name="geo.position" content="25.2048;55.2708" />
        <meta name="ICBM" content="25.2048, 55.2708" />
        <LocalBusinessSchema />
      </head>
      <body className={`${fontClass} antialiased bg-white text-navy-900`}>
        {/* Google Analytics — loaded via next/script for proper scheduling,
            hydration safety, and compatibility with static generation. */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${site.ga}`}
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${site.ga}');`}
        </Script>
        {/* Invisible HTML watermark (defense-in-depth content tracking) */}
        <div aria-hidden="true" style={{ display: 'none' }} data-owner="enotarydubai.ae" data-ref="ENDX-2026" />
        <a href="#main-content" className="skip-link">{
          lang === 'ar' ? 'انتقل إلى المحتوى' :
          lang === 'ru' ? 'Перейти к содержимому' :
          lang === 'zh' ? '跳到内容' :
          lang === 'es' ? 'Saltar al contenido' :
          'Skip to content'
        }</a>
        <Navbar lang={lang as Lang} />
        <main id="main-content">{children}</main>
        <Footer lang={lang as Lang} />
        {/* FloatingWA handles both WhatsApp button AND scroll-to-top in React */}
        <FloatingWA lang={lang as Lang} />
      </body>
    </html>
  )
}
