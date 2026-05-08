import { type Lang, getPageContent } from '@/lib/i18n'

interface BreadcrumbItem {
  name: string
  url: string
}

interface FAQItem {
  q: Record<string, string>
  a: Record<string, string>
}

export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function FAQSchema({ items, lang }: { items: FAQItem[]; lang: Lang }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q[lang] || item.q.en,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a[lang] || item.a.en,
      },
    })),
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function ServiceSchema({
  name, url, description,
}: {
  name: string; url: string; description: string
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name,
    url,
    description,
    provider: {
      '@type': 'Organization',
      name: 'E-Notary Dubai',
      url: 'https://enotarydubai.ae',
      telephone: '+971528997280',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Dubai',
        addressCountry: 'AE',
      },
    },
    areaServed: { '@type': 'City', name: 'Dubai' },
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// LegalServiceSchema — dynamic per-route JSON-LD, statically rendered.
//
// Pure server component, prop-driven (no headers(), no dynamic APIs). The
// page knows its own canonical path at build time, so each statically
// generated page emits its own LegalService schema with zero runtime cost.
// SSG is fully preserved.
//
// Usage from a route segment page:
//
//     <LegalServiceSchema lang={lang} path="/power-of-attorney/real-estate" />
//
// `path` must be the canonical SITE path (no language prefix, no trailing
// slash, '/' for the home page). It is used both to look up localized
// metadata in content.json and to build the canonical URL.
// ─────────────────────────────────────────────────────────────────────────────

const BRAND_NAME = 'E-Notary Dubai'
const BRAND_URL = 'https://www.enotarydubai.ae'

/** Pull the cleanest available service name for a path, with full lang
 *  fallback. Prefers H1 (user-facing heading) over title (SEO meta). */
function serviceNameFor(path: string, lang: Lang): string | null {
  const pc = getPageContent(path) as Record<string, unknown> | null
  if (!pc) return null
  const h1 =
    (pc[`h1_${lang}`] as string | undefined) ||
    (pc.h1_en as string | undefined)
  if (h1) return h1
  const title =
    (pc[`title_${lang}`] as string | undefined) ||
    (pc.title_en as string | undefined)
  return title || null
}

/** Pull the cleanest available description for a path, with lang fallback. */
function serviceDescriptionFor(path: string, lang: Lang): string | null {
  const pc = getPageContent(path) as Record<string, unknown> | null
  if (!pc) return null
  const desc =
    (pc[`meta_${lang}`] as string | undefined) ||
    (pc.meta_en as string | undefined)
  return desc || null
}

// ─────────────────────────────────────────────────────────────────────────────
// ArticleSchema — schema.org/Article JSON-LD for blog posts.
//
// Pure server component. Author is the brand organization; publisher is
// linked via @id to the LocalBusiness node, keeping the knowledge graph
// coherent across the site.
// ─────────────────────────────────────────────────────────────────────────────
export function ArticleSchema({
  headline,
  url,
  lang,
  datePublished,
  dateModified,
  description,
}: {
  headline: string
  url: string
  lang: Lang
  datePublished?: string
  dateModified?: string
  description?: string
}) {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${url}#article`,
    headline,
    mainEntityOfPage: url,
    url,
    inLanguage: lang,
    author: {
      '@type': 'Organization',
      name: BRAND_NAME,
      url: BRAND_URL,
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${BRAND_URL}/#business`,
      name: BRAND_NAME,
      url: BRAND_URL,
    },
  }
  if (description) schema.description = description
  if (datePublished) schema.datePublished = datePublished
  if (dateModified) schema.dateModified = dateModified
  else if (datePublished) schema.dateModified = datePublished

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function LegalServiceSchema({
  lang,
  path,
}: {
  lang: Lang
  /** Canonical SITE path, no language prefix, no trailing slash.
   *  Use '/' for the home page. */
  path: string
}) {
  const cleanPath = path === '/' ? '' : path
  const url = `${BRAND_URL}/${lang}${cleanPath}/`

  const name =
    serviceNameFor(path, lang) || `${BRAND_NAME} — Notary Support Services`
  const description =
    serviceDescriptionFor(path, lang) ||
    'Private notary support in Dubai — POA drafting, MOFA attestation, legal notices, eviction notices, and legal translation. Same-day service.'

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    '@id': `${url}#service`,
    name,
    description,
    url,
    inLanguage: lang,
    provider: {
      '@type': 'Organization',
      '@id': `${BRAND_URL}/#business`,
      name: BRAND_NAME,
      url: BRAND_URL,
      telephone: '+971528997280',
      email: 'info@enotarydubai.ae',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Business Bay',
        addressLocality: 'Dubai',
        addressRegion: 'Dubai',
        addressCountry: 'AE',
      },
    },
    areaServed: {
      '@type': 'City',
      name: 'Dubai',
      sameAs: 'https://www.wikidata.org/wiki/Q612',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function LocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    '@id': 'https://www.enotarydubai.ae/#business',
    name: 'E-Notary Dubai',
    alternateName: 'E-Notary Dubai',
    description: 'Private notary support service in Dubai — POA drafting, MOFA attestation, eviction notices, legal translation. Same-day service.',
    url: 'https://enotarydubai.ae',
    // image: 'https://www.enotarydubai.ae/logo.png',
    // TODO: uncomment when logo.png is added to public/
    telephone: '+971528997280',
    email: 'info@enotarydubai.ae',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Business Bay',
      addressLocality: 'Dubai',
      addressRegion: 'Dubai',
      addressCountry: 'AE',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 25.1850,
      longitude: 55.2590,
    },
    knowsAbout: [
      'Power of Attorney Drafting',
      'MOFA Attestation',
      'Eviction Notices',
      'Legal Translation',
      'Apostille Services',
      'Rental Dispute Center (RDC) Filings',
      'Dubai Land Department (DLD) Procedures',
      'Last Will and Testament for Expats',
      'Corporate Documentation (MOA, Board Resolutions)',
      'Affidavits and Statutory Declarations',
    ],
    openingHoursSpecification: [
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Sunday','Monday','Tuesday','Wednesday','Thursday'], opens: '09:00', closes: '18:00' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Saturday'], opens: '10:00', closes: '15:00' },
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+971528997280',
      contactType: 'customer service',
      availableLanguage: ['English', 'Arabic', 'Russian', 'Chinese', 'Spanish'],
    },
    areaServed: {
      '@type': 'City',
      name: 'Dubai',
      sameAs: 'https://www.wikidata.org/wiki/Q612',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Notary Support Services',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Power of Attorney Dubai' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'MOFA Attestation Dubai' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Eviction Notice Dubai' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Legal Translation Dubai' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'E-Notary Dubai' } },
      ],
    },
    sameAs: [
      'https://wa.me/971528997280',
    ],
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
