import content from '@/data/content.json'

export type Lang = 'en' | 'ar' | 'ru' | 'zh' | 'es'
export const LANGS: Lang[] = ['en', 'ar', 'ru', 'zh', 'es']
export const DEFAULT_LANG: Lang = 'en'

export function isValidLang(lang: string): lang is Lang {
  return LANGS.includes(lang as Lang)
}

export function getDir(lang: Lang): 'ltr' | 'rtl' {
  return lang === 'ar' ? 'rtl' : 'ltr'
}

export function getFontClass(lang: Lang): string {
  if (lang === 'ar') return 'font-arab'
  if (lang === 'zh') return 'font-zh'
  return 'font-sans'
}

/** Get text in the current language, fall back to EN, then AR */
export function t(obj: Record<string, string> | undefined, lang: Lang): string {
  if (!obj) return ''
  return obj[lang] || obj['en'] || obj['ar'] || ''
}

export function getWaUrl(message: string): string {
  return `https://wa.me/${content.site.phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`
}

export function generateLangParams() {
  return LANGS.map((lang) => ({ lang }))
}

// ─────────────────────────────────────────────────────────────────────────────
// Hreflang helpers — Chinese requires script subtag (zh-Hans) for proper
// Google indexing of Simplified Chinese targeting Chinese investors in Dubai.
// ─────────────────────────────────────────────────────────────────────────────
export const HREFLANG_MAP: Record<Lang, string> = {
  en: 'en-AE',
  ar: 'ar-AE',
  ru: 'ru-AE',
  zh: 'zh-Hans-AE',
  es: 'es-AE',
}

/** Get the hreflang code for a given language (e.g. 'zh' -> 'zh-Hans-AE') */
export function getHreflang(lang: Lang): string {
  return HREFLANG_MAP[lang]
}

/** Build the alternates.languages object for a given URL path.
 *  Path should start with '/' and end with '/' (e.g. '/about/'). */
export function buildHreflangAlternates(path: string): Record<string, string> {
  const base = 'https://www.enotarydubai.ae'
  return Object.fromEntries(
    LANGS.map((l) => [HREFLANG_MAP[l], `${base}/${l}${path}`])
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// RichBlock — Union type defined HERE as the single source of truth.
// All components that render rich content should import RichBlock from i18n,
// NOT from a sibling component, to avoid circular-import TypeScript errors.
// ─────────────────────────────────────────────────────────────────────────────
export type RichBlock =
  | { type: 'heading';   text: Record<string, string> }
  | { type: 'para';      text: Record<string, string>; accent?: boolean }
  | { type: 'warning';   text: Record<string, string>; title?: Record<string, string> }
  | { type: 'info';      text: Record<string, string>; title?: Record<string, string> }
  | { type: 'success';   text: Record<string, string>; title?: Record<string, string> }
  | { type: 'law';       ref: string; text: Record<string, string> }
  | { type: 'checklist'; title?: Record<string, string>; items: Array<Record<string, string>> }
  | { type: 'steps';     items: Array<{ title: Record<string, string>; body: Record<string, string> }> }
  | { type: 'process';   items: Array<{ icon: string; title: Record<string, string>; body: Record<string, string> }> }
  | { type: 'compare';   left: { title: Record<string, string>; items: Array<Record<string, string>> }; right: { title: Record<string, string>; items: Array<Record<string, string>> } }
  | { type: 'stats';     items: Array<{ value: string; label: Record<string, string>; sub?: Record<string, string> }> }
  | { type: 'table';     headers: Array<Record<string, string>>; rows: Array<Array<Record<string, string>>> }
  | { type: 'divider' }

// ─────────────────────────────────────────────────────────────────────────────
// FaqItem
// ─────────────────────────────────────────────────────────────────────────────

/** Normalized FAQ item with all 5 languages */
export interface FaqItem {
  q: { en: string; ar: string; ru: string; zh: string; es: string }
  a: { en: string; ar: string; ru: string; zh: string; es: string }
}

/** Normalize a raw FAQ entry (may have only en/ar) into a full FaqItem */
export function normalizeFaqItem(item: {
  q: Record<string, string>
  a: Record<string, string>
}): FaqItem {
  return {
    q: {
      en: item.q['en'] || '',
      ar: item.q['ar'] || '',
      ru: item.q['ru'] || item.q['en'] || '',
      zh: item.q['zh'] || item.q['en'] || '',
      es: item.q['es'] || item.q['en'] || '',
    },
    a: {
      en: item.a['en'] || '',
      ar: item.a['ar'] || '',
      ru: item.a['ru'] || item.a['en'] || '',
      zh: item.a['zh'] || item.a['en'] || '',
      es: item.a['es'] || item.a['en'] || '',
    },
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// PageContent type — matches the real shape in content.json exactly
// ─────────────────────────────────────────────────────────────────────────────
interface PageContent {
  h1_en?: string
  h1_ar?: string
  title_en?: string
  meta_en?: string
  /** Each item is a 5-lang map e.g. { en, ar, ru, zh, es } */
  sections?: Array<Record<string, string>>
  subsections?: Array<Record<string, string>>
  content?: Array<Record<string, string>>
  list_items?: Array<Record<string, string>>
  /** price rows — shape varies per page, keep loose */
  prices?: Array<Record<string, unknown>>
  rich_blocks?: RichBlock[]
  faq?: Array<{ q: Record<string, string>; a: Record<string, string> }>
  /** Catch-all for per-lang title/meta keys like title_ar, meta_ru, etc. */
  [key: string]: unknown
}

/** Get page-specific content from content.json */
export function getPageContent(url: string): PageContent | null {
  const pc = content.page_content as Record<string, PageContent>
  return pc[url] ?? pc[url + '/'] ?? null
}

/** Get page FAQ normalized to FaqItem[] */
export function getPageFaq(url: string): FaqItem[] {
  const pc = getPageContent(url)
  return (pc?.faq ?? []).map(normalizeFaqItem)
}

/** Get per-service FAQ normalized to FaqItem[] */
export function getServiceFaq(key: string): FaqItem[] {
  const map = content.faq_services as Record<
    string,
    Array<{ q: Record<string, string>; a: Record<string, string> }>
  >
  return (map[key] ?? []).map(normalizeFaqItem)
}

/** Get required docs for a service */
export function getRequiredDocs(key: string): Array<Record<string, string>> {
  const map = content.required_docs as Record<string, Array<Record<string, string>>>
  return map[key] ?? []
}

/** Get rich_blocks for a page — type-safe, no `any` */
export function getPageBlocks(url: string): RichBlock[] {
  const pc = getPageContent(url)
  return (pc?.rich_blocks ?? []) as RichBlock[]
}

/** Get multilingual page metadata (title + description) */
export function getPageMeta(
  slug: string,
  lang: string,
): { title: string; description: string } {
  const pc = getPageContent(slug)
  if (!pc) return { title: '', description: '' }
  const title = ((pc[`title_${lang}`] as string | undefined) || pc.title_en || '') as string
  const description = ((pc[`meta_${lang}`] as string | undefined) || pc.meta_en || '') as string
  return { title, description }
}

// ─────────────────────────────────────────────────────────────────────────────
// Typed top-level exports — import directly from i18n instead of content.json
// ─────────────────────────────────────────────────────────────────────────────
export const site         = content.site
export const languages    = content.languages
export const nav          = content.nav
export const footer       = content.footer
export const cta          = content.cta
export const steps        = content.steps
export const services     = content.services
export const trust_badges = content.trust_badges
export const faq          = content.faq

export const ui_buttons = content.ui_buttons as Record<string, Record<string, string>>

export const pricing = content.pricing as Record<
  string,
  Array<{ service: Record<string, string>; href: string }>
>
