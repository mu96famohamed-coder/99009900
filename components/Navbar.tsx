'use client'

import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { type Lang, t, cta, site, languages, LANGS } from '@/lib/i18n'

interface Props { lang: Lang }

const WA_ICON = (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884"/>
  </svg>
)

function buildNav(lang: Lang) {
  const l = lang
  return [
    // ── 1. POWER OF ATTORNEY — Mega Menu (3 columns) ──────────────────────────
    {
      key: 'poa',
      label: { en: 'Power of Attorney', ar: 'الوكالات الرسمية', ru: 'Доверенности', zh: '授权委托书', es: 'Poderes Notariales' },
      mega: true,
      cols: [
        {
          heading: { en: 'Personal', ar: 'شخصية', ru: 'Личные', zh: '个人', es: 'Personales' },
          items: [
            { href: `/${l}/power-of-attorney/general`,           label: { en: 'General POA',         ar: 'وكالة عامة',      ru: 'Генеральная',     zh: '一般授权书',   es: 'POA General' } },
            { href: `/${l}/power-of-attorney/special`,           label: { en: 'Special POA',         ar: 'وكالة خاصة',      ru: 'Специальная',     zh: '特别授权书',   es: 'POA Especial' } },
            { href: `/${l}/power-of-attorney/child-travel`,      label: { en: 'Child Travel Auth.',  ar: 'إذن سفر طفل',     ru: 'Выезд ребёнка',   zh: '儿童旅行授权', es: 'Viaje Menor' } },
            { href: `/${l}/power-of-attorney/inheritance`,       label: { en: 'Inheritance POA',     ar: 'وكالة ميراث',     ru: 'На наследство',   zh: '继承授权书',   es: 'Herencia' } },
            { href: `/${l}/power-of-attorney/court`,             label: { en: 'Court Case POA',      ar: 'وكالة قضائية',    ru: 'Судебная',        zh: '法院授权书',   es: 'Judicial' } },
          ],
        },
        {
          heading: { en: 'Property & Finance', ar: 'العقارات والمال', ru: 'Имущество', zh: '房产与金融', es: 'Propiedad' },
          items: [
            { href: `/${l}/power-of-attorney/real-estate`,       label: { en: 'Real Estate POA',     ar: 'وكالة عقارية',    ru: 'На недвижимость', zh: '房地产授权书', es: 'Inmobiliario' } },
            { href: `/${l}/power-of-attorney/real-estate/sale`,  label: { en: '↳ Sale',              ar: '↳ بيع عقار',      ru: '↳ Продажа',       zh: '↳ 出售',       es: '↳ Venta' } },
            { href: `/${l}/power-of-attorney/real-estate/purchase`, label: { en: '↳ Purchase',       ar: '↳ شراء عقار',     ru: '↳ Покупка',       zh: '↳ 购买',       es: '↳ Compra' } },
            { href: `/${l}/power-of-attorney/real-estate/management`, label: { en: '↳ Management',  ar: '↳ إدارة عقار',    ru: '↳ Управление',    zh: '↳ 管理',       es: '↳ Gestión' } },
            { href: `/${l}/power-of-attorney/bank`,              label: { en: 'Bank POA',            ar: 'وكالة بنكية',     ru: 'Банковская',      zh: '银行授权书',   es: 'Bancario' } },
            { href: `/${l}/power-of-attorney/property-gifting`,  label: { en: 'Property Gifting',    ar: 'هبة عقار',        ru: 'Дарение',         zh: '房产赠与',     es: 'Donación' } },
            { href: `/${l}/power-of-attorney/mohre`,             label: { en: 'MOHRE / Labour',      ar: 'وكالة MOHRE',     ru: 'MOHRE / Труд',    zh: 'MOHRE劳工',    es: 'MOHRE' } },
            { href: `/${l}/power-of-attorney/company-formation`, label: { en: 'Company Formation',   ar: 'تأسيس شركة',      ru: 'Компания',        zh: '公司注册',     es: 'Empresa' } },
          ],
        },
        {
          heading: { en: 'Vehicle', ar: 'المركبات', ru: 'Транспорт', zh: '车辆', es: 'Vehículo' },
          items: [
            { href: `/${l}/power-of-attorney/vehicle`,           label: { en: 'Vehicle POA',         ar: 'وكالة مركبة',     ru: 'На авто',         zh: '车辆授权书',   es: 'Vehículo' } },
            { href: `/${l}/power-of-attorney/vehicle/sale`,      label: { en: '↳ Sale',              ar: '↳ بيع مركبة',     ru: '↳ Продажа авто',  zh: '↳ 出售',       es: '↳ Venta' } },
            { href: `/${l}/power-of-attorney/vehicle/export`,    label: { en: '↳ Export',            ar: '↳ تصدير مركبة',   ru: '↳ Экспорт',       zh: '↳ 出口',       es: '↳ Exportación' } },
            { href: `/${l}/power-of-attorney/vehicle/management`,label: { en: '↳ Management',        ar: '↳ إدارة مركبة',   ru: '↳ Управление',    zh: '↳ 管理',       es: '↳ Gestión' } },
          ],
        },
      ],
      cta: { href: `/${l}/power-of-attorney`, label: { en: 'All 13 POA Types →', ar: '← جميع أنواع الوكالات (13)', ru: 'Все 13 типов →', zh: '全部13种 →', es: 'Los 13 Tipos →' } },
    },

    // ── 2. CORPORATE ─────────────────────────────────────────────────────────
    {
      key: 'corporate',
      label: { en: 'Corporate', ar: 'الشركات', ru: 'Корпоративные', zh: '企业', es: 'Corporativo' },
      items: [
        { href: `/${l}/corporate/moa`,                   label: { en: 'MOA Notarization',     ar: 'توثيق عقد التأسيس',  ru: 'Заверение MOA',       zh: '章程公证',    es: 'MOA' } },
        { href: `/${l}/corporate/board-resolution`,      label: { en: 'Board Resolution',     ar: 'قرار مجلس الإدارة',  ru: 'Решение директоров',  zh: '董事会决议',  es: 'Resolución' } },
        { href: `/${l}/corporate/moa-amendment`,         label: { en: 'MOA Amendment',        ar: 'تعديل عقد التأسيس',  ru: 'Поправка MOA',        zh: '章程修正',    es: 'Enmienda MOA' } },
        { href: `/${l}/corporate/share-transfer`,        label: { en: 'Share Transfer',       ar: 'نقل الحصص',          ru: 'Передача акций',       zh: '股权转让',    es: 'Acciones' } },
        { href: `/${l}/corporate/shareholder-agreement`, label: { en: 'Shareholder Agree.',   ar: 'اتفاقية المساهمين',  ru: 'Акционер. соглашение',zh: '股东协议',    es: 'Acuerdo Acc.' } },
        { href: `/${l}/corporate/liquidation`,           label: { en: 'Company Liquidation',  ar: 'تصفية الشركة',       ru: 'Ликвидация',           zh: '公司清算',    es: 'Liquidación' } },
        { href: `/${l}/corporate/contract`,              label: { en: 'Commercial Contract',  ar: 'عقد تجاري',           ru: 'Коммерч. договор',     zh: '商业合同',    es: 'Contrato' } },
      ],
    },

    // ── 3. NOTARIZATION & ATTESTATION ────────────────────────────────────────
    {
      key: 'notarization',
      label: { en: 'Notarization', ar: 'التوثيق والتصديق', ru: 'Нотариат', zh: '公证与认证', es: 'Notarización' },
      items: [
        { href: `/${l}/attestation/mofa`,          label: { en: 'MOFA Attestation',     ar: 'تصديق الخارجية',     ru: 'Легализация MOFA',      zh: '外交部认证',   es: 'MOFA' } },
        { href: `/${l}/attestation/apostille`,     label: { en: 'Apostille',            ar: 'أبوستيل',            ru: 'Апостиль',              zh: '附加证明书',   es: 'Apostilla' } },
        { href: `/${l}/attestation/embassy`,       label: { en: 'Embassy Attestation',  ar: 'تصديق السفارة',      ru: 'Легализация посольства', zh: '使馆认证',     es: 'Embajada' } },
        { href: `/${l}/attestation/degree`,        label: { en: 'Degree Attestation',   ar: 'تصديق الشهادات',     ru: 'Легализация диплома',   zh: '学历证书认证', es: 'Título Educativo' } },
        { href: `/${l}/attestation/marriage`,      label: { en: 'Marriage Certificate', ar: 'تصديق عقد الزواج',   ru: 'Свидетельство о браке', zh: '结婚证认证',   es: 'Acta Matrimonio' } },
        { href: `/${l}/e-notary`,                  label: { en: 'E-Notary (Remote)',    ar: 'الكاتب الإلكتروني',  ru: 'Электр. нотариус',      zh: '电子公证',     es: 'E-Notario' } },
        { href: `/${l}/mobile-notary`,             label: { en: 'Mobile Notary',        ar: 'كاتب عدل متنقل',     ru: 'Выездной нотариус',     zh: '上门公证',     es: 'Notario Móvil' } },
        { href: `/${l}/emergency-notary`,          label: { en: 'Same-Day Urgent',      ar: 'توثيق عاجل نفس اليوم', ru: 'Срочно в тот же день', zh: '当日紧急公证', es: 'Urgente Mismo Día' } },
        { href: `/${l}/affidavit`,                 label: { en: 'Affidavit',            ar: 'إقرارات',             ru: 'Аффидевиты',            zh: '宣誓书',       es: 'Declaraciones' } },
        { href: `/${l}/certified-true-copy`,       label: { en: 'Certified Copy',       ar: 'نسخة مصدقة',         ru: 'Заверенная копия',      zh: '经认证副本',   es: 'Copia Certif.' } },
        { href: `/${l}/legal-translation`,         label: { en: 'Legal Translation',    ar: 'ترجمة قانونية',      ru: 'Юрид. перевод',         zh: '法律翻译',     es: 'Traducción Legal' } },
        { href: `/${l}/legal-translation/court`,   label: { en: '↳ Court Translation',  ar: '↳ ترجمة للمحاكم',    ru: '↳ Судебный перевод',    zh: '↳ 法院翻译',   es: '↳ Trad. Judicial' } },
      ],
    },

    // ── 4. TENANCY & LEGAL ───────────────────────────────────────────────────
    {
      key: 'tenancy',
      label: { en: 'Tenancy & Legal', ar: 'الإيجار والقانون', ru: 'Аренда и право', zh: '租赁与法律', es: 'Arrendamiento' },
      items: [
        { href: `/${l}/legal-notice/eviction`,         label: { en: 'Eviction Notice',         ar: 'إشعار الإخلاء',       ru: 'Уведомление о выселении',  zh: '驱逐通知',      es: 'Desalojo' } },
        { href: `/${l}/rdc-support`,                   label: { en: 'RDC Support',             ar: 'دعم مركز النزاعات',    ru: 'Поддержка RDC',            zh: 'RDC支持',        es: 'RDC' } },
        { href: `/${l}/legal-notice`,                  label: { en: 'Legal Notice',            ar: 'إنذار قانوني',         ru: 'Юридическое уведомление',  zh: '法律通知',      es: 'Aviso Legal' } },
        { href: `/${l}/legal-notice/poa-cancellation`, label: { en: '↳ POA Cancellation Notice', ar: '↳ إنذار إلغاء وكالة', ru: '↳ Отмена доверенности',   zh: '↳ 撤销授权通知', es: '↳ Aviso Cancelación' } },
        { href: `/${l}/poa-cancellation`,              label: { en: 'POA Cancellation',        ar: 'إلغاء الوكالة',        ru: 'Отмена доверенности',      zh: '撤销授权委托书', es: 'Cancelación POA' } },
        { href: `/${l}/last-will-testament-dubai`,     label: { en: 'Last Will & Testament',   ar: 'الوصية الأخيرة',       ru: 'Завещание',                zh: '遗嘱',          es: 'Testamento' } },
        { href: `/${l}/what-is-tableegh`,              label: { en: 'What is Tableegh?',       ar: 'ما هو التبليغ؟',        ru: 'Что такое Tableegh?',      zh: '什么是Tableegh?', es: '¿Qué es Tableegh?' } },
      ],
    },

    // ── 5. RESOURCES ─────────────────────────────────────────────────────────
    {
      key: 'resources',
      label: { en: 'Resources', ar: 'المصادر', ru: 'Ресурсы', zh: '资源', es: 'Recursos' },
      items: [
        { href: `/${l}/blog`,                    label: { en: 'Blog & Guides',       ar: 'المدونة والأدلة',      ru: 'Блог и руководства',     zh: '博客与指南',  es: 'Blog' } },
        { href: `/${l}/faq`,                     label: { en: 'FAQ',                 ar: 'الأسئلة الشائعة',      ru: 'FAQ',                    zh: '常见问题',    es: 'FAQ' } },
        { href: `/${l}/pricing`,                 label: { en: 'All Services',        ar: 'جميع الخدمات',         ru: 'Все услуги',             zh: '全部服务',    es: 'Servicios' } },
        { href: `/${l}/document-rejection`,      label: { en: 'Document Rejected?',  ar: 'وثيقة مرفوضة؟',        ru: 'Документ отклонён?',     zh: '文件被拒？',  es: '¿Doc. Rechazado?' } },
        { href: `/${l}/why-poa-rejected-dubai`,  label: { en: 'Why POA Rejected?',   ar: 'لماذا رُفضت الوكالة؟',   ru: 'Почему отказали в POA?', zh: '为何授权被拒？', es: '¿Por Qué Rechazan POA?' } },
        { href: `/${l}/about`,                   label: { en: 'About Us',            ar: 'عن الشركة',             ru: 'О нас',                  zh: '关于我们',    es: 'Nosotros' } },
        { href: `/${l}/contact`,                 label: { en: 'Contact',             ar: 'تواصل معنا',            ru: 'Контакты',               zh: '联系我们',    es: 'Contacto' } },
      ],
    },
  ]
}

export default function Navbar({ lang }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeKey, setActiveKey] = useState<string | null>(null)
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null)
  const pathname = usePathname()
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const navItems = buildNav(lang)
  const isRTL = lang === 'ar'

  function switchLangPath(targetLang: string): string {
    if (!pathname) return `/${targetLang}`
    const segments = pathname.split('/')
    if (segments.length >= 2 && LANGS.includes(segments[1] as Lang)) {
      segments[1] = targetLang
      return segments.join('/')
    }
    return `/${targetLang}`
  }

  function openDropdown(key: string) {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setActiveKey(key)
  }

  function scheduleClose() {
    timeoutRef.current = setTimeout(() => setActiveKey(null), 300)
  }

  useEffect(() => () => { if (timeoutRef.current) clearTimeout(timeoutRef.current) }, [])

  return (
    <header className="sticky top-0 z-50 shadow-xl shadow-navy-900/30" style={{ background: '#0a1628', borderBottom: '1px solid rgba(212,180,58,0.12)' }}>
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">

          {/* ── Logo ── */}
          <Link href={`/${lang}`} className="flex items-center gap-3 shrink-0 group">
            <div className="w-9 h-9 rounded-xl bg-gold-400 flex items-center justify-center shadow-md shadow-gold-400/20 group-hover:bg-gold-300 transition-colors">
              <span className="font-serif font-bold text-navy-900 text-lg leading-none">P</span>
            </div>
            <div className="hidden sm:block leading-none">
              <div className="font-serif font-bold text-white text-[15px] tracking-tight group-hover:text-gold-100 transition-colors">E-Notary Dubai</div>
              <div className="text-[9px] text-gold-500/60 uppercase tracking-[0.15em] mt-0.5">LICENSED NOTARY SUPPORT · DUBAI</div>
            </div>
          </Link>

          {/* ── Desktop Nav ── */}
          <nav className="hidden lg:flex items-center gap-0.5 flex-1 justify-center">
            {navItems.map((item) => {
              const label = t(item.label, lang)
              const isActive = activeKey === item.key
              return (
                <div
                  key={item.key}
                  className="relative"
                  onMouseEnter={() => openDropdown(item.key)}
                  onMouseLeave={scheduleClose}
                >
                  <button
                    className={`flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium rounded-lg transition-all duration-150 ${
                      isActive
                        ? 'text-gold-400 bg-white/[0.07]'
                        : 'text-navy-300 hover:text-white hover:bg-white/[0.05]'
                    }`}
                  >
                    {label}
                    <svg
                      className={`w-3 h-3 transition-transform duration-200 ${isActive ? 'rotate-180 text-gold-400' : 'opacity-40'}`}
                      fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* ── Mega Menu (POA — 3 cols) ── */}
                  {isActive && (item as any).mega && (
                    <>
                      <div className="absolute top-full left-0 right-0 h-3 z-40" onMouseEnter={() => openDropdown(item.key)} />
                      <div
                        className="absolute top-full mt-3 bg-white rounded-2xl shadow-2xl border border-navy-100/80 z-50 p-5"
                        style={{
                          width: 'min(720px, calc(100vw - 2rem))',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          maxWidth: 'calc(100vw - 2rem)',
                        }}
                        onMouseEnter={() => openDropdown(item.key)}
                        onMouseLeave={scheduleClose}
                      >
                        <div className="grid grid-cols-3 gap-x-6">
                          {(item as any).cols.map((col: any, ci: number) => (
                            <div key={ci}>
                              <div className="flex items-center gap-2 mb-3 px-2">
                                <div className="h-px flex-1 bg-navy-100" />
                                <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-navy-400 shrink-0">
                                  {t(col.heading, lang)}
                                </p>
                                <div className="h-px flex-1 bg-navy-100" />
                              </div>
                              <div className="space-y-0.5">
                                {col.items.map((sub: any) => (
                                  <Link
                                    key={sub.href}
                                    href={sub.href}
                                    className="flex items-center gap-2 px-2 py-1.5 text-sm text-navy-700 hover:text-navy-900 hover:bg-navy-50 rounded-lg transition-colors group"
                                    onClick={() => setActiveKey(null)}
                                  >
                                    <span className="w-1 h-1 rounded-full bg-gold-400 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    {t(sub.label, lang)}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                        {/* CTA bar */}
                        <div className="mt-4 pt-3 border-t border-navy-100">
                          <Link
                            href={(item as any).cta.href}
                            className="flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-bold transition-all group"
                            style={{ background: 'linear-gradient(135deg, #0a1628 0%, #1a3a5c 100%)' }}
                            onClick={() => setActiveKey(null)}
                          >
                            <span className="text-white group-hover:text-gold-300 transition-colors">{t((item as any).cta.label, lang)}</span>
                            <svg className="w-4 h-4 text-gold-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isRTL ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"} />
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </>
                  )}

                  {/* ── Regular Dropdown ── */}
                  {isActive && !(item as any).mega && (item as any).items && (
                    <>
                      <div className="absolute top-full left-0 right-0 h-3 z-40" onMouseEnter={() => openDropdown(item.key)} />
                      <div
                        className="absolute top-full mt-3 bg-white rounded-2xl shadow-2xl border border-navy-100/80 p-2 z-50"
                        style={{
                          minWidth: 260,
                          maxWidth: 'calc(100vw - 2rem)',
                          insetInlineStart: isRTL ? 'auto' : '-4px',
                          insetInlineEnd: isRTL ? '-4px' : 'auto',
                        }}
                        onMouseEnter={() => openDropdown(item.key)}
                        onMouseLeave={scheduleClose}
                      >
                        {(item as any).items.map((sub: any) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            className="flex items-center gap-2.5 px-3 py-2 text-sm text-navy-600 hover:text-navy-900 hover:bg-gold-400/5 rounded-lg transition-all group border border-transparent hover:border-gold-400/15"
                            onClick={() => setActiveKey(null)}
                          >
                            <svg className="w-3.5 h-3.5 text-gold-400 shrink-0 opacity-0 group-hover:opacity-100 transition-all -translate-x-1 group-hover:translate-x-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={isRTL ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"} />
                            </svg>
                            <span className="font-medium">{t(sub.label, lang)}</span>
                          </Link>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )
            })}
          </nav>

          {/* ── Right side ── */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Language switcher */}
            <div className="hidden sm:flex items-center">
              {languages.map((l, i) => (
                <span key={l.code} className="flex items-center">
                  {i > 0 && <span className="text-navy-600 text-xs mx-0.5">|</span>}
                  <Link
                    href={switchLangPath(l.code)}
                    className={`text-xs font-semibold px-1.5 py-1 rounded transition-colors ${
                      lang === l.code
                        ? 'text-gold-400'
                        : 'text-navy-400 hover:text-gold-400'
                    }`}
                    title={l.title}
                  >
                    {l.label}
                  </Link>
                </span>
              ))}
            </div>

            {/* Phone */}
            <a
              href={`tel:${site.phone}`}
              className="hidden md:flex items-center gap-1.5 text-sm font-semibold text-navy-300 hover:text-white px-3 py-1.5 rounded-lg border border-navy-700 hover:border-navy-500 transition-colors whitespace-nowrap"
            >
              <span dir="ltr" className="inline-block">{site.phone_display}</span>
            </a>

            {/* WhatsApp CTA */}
            <a
              href={`https://wa.me/${site.phone.replace(/\D/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm font-bold px-3.5 py-1.5 rounded-lg transition-colors text-white"
              style={{ background: '#25D366' }}
            >
              {WA_ICON}
              <span className="hidden sm:inline">{t(cta.whatsapp, lang)}</span>
            </a>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg text-navy-300 hover:text-white hover:bg-navy-800 transition-colors"
              aria-label="Menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                }
              </svg>
            </button>
          </div>
        </div>

        {/* ── Mobile menu ── */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-navy-700/50 py-3 max-h-[80vh] overflow-y-auto">
            {/* Language row */}
            <div className="flex items-center gap-1 px-4 pb-3 mb-2 border-b border-navy-700/50">
              {languages.map((l, i) => (
                <span key={l.code} className="flex items-center">
                  {i > 0 && <span className="text-navy-600 text-xs mx-0.5">|</span>}
                  <Link
                    href={switchLangPath(l.code)}
                    className={`text-xs font-semibold px-2 py-1 rounded transition-colors ${
                      lang === l.code ? 'text-gold-400' : 'text-navy-400 hover:text-gold-400'
                    }`}
                    onClick={() => setMobileOpen(false)}
                  >
                    {l.label}
                  </Link>
                </span>
              ))}
            </div>

            {navItems.map((item) => (
              <div key={item.key} className="mb-1">
                <button
                  onClick={() => setMobileExpanded(mobileExpanded === item.key ? null : item.key)}
                  className="w-full flex items-center justify-between px-4 py-2.5 text-sm font-semibold text-white hover:text-gold-400 transition-colors"
                >
                  <span>{t(item.label, lang)}</span>
                  <svg
                    className={`w-4 h-4 text-navy-400 transition-transform ${mobileExpanded === item.key ? 'rotate-180' : ''}`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {mobileExpanded === item.key && (
                  <div className="bg-navy-800/50 mx-3 rounded-xl mb-1 py-1">
                    {/* Mega menu — flatten all cols */}
                    {(item as any).mega && (item as any).cols.map((col: any) =>
                      col.items.map((sub: any) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          className="block px-4 py-2 text-sm text-navy-300 hover:text-gold-400 transition-colors"
                          onClick={() => setMobileOpen(false)}
                        >
                          {t(sub.label, lang)}
                        </Link>
                      ))
                    )}
                    {/* Regular items */}
                    {!(item as any).mega && (item as any).items?.map((sub: any) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        className="block px-4 py-2 text-sm text-navy-300 hover:text-gold-400 transition-colors"
                        onClick={() => setMobileOpen(false)}
                      >
                        {t(sub.label, lang)}
                      </Link>
                    ))}
                    {/* POA view all */}
                    {(item as any).cta && (
                      <Link
                        href={(item as any).cta.href}
                        className="block px-4 py-2 text-sm font-semibold text-gold-400 hover:text-gold-300 transition-colors border-t border-navy-700/50 mt-1 pt-2"
                        onClick={() => setMobileOpen(false)}
                      >
                        {t((item as any).cta.label, lang)}
                      </Link>
                    )}
                  </div>
                )}
              </div>
            ))}

            {/* Mobile phone + WA */}
            <div className="px-4 pt-3 mt-2 border-t border-navy-700/50 flex flex-col gap-2">
              <a href={`tel:${site.phone}`} className="flex items-center gap-2 text-sm font-semibold text-navy-300 hover:text-white transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 7V5z"/>
                </svg>
                <span dir="ltr" className="inline-block">{site.phone_display}</span>
              </a>
              <a
                href={`https://wa.me/${site.phone.replace(/\D/g, '')}`}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-bold text-white px-4 py-2.5 rounded-xl"
                style={{ background: '#25D366' }}
              >
                {WA_ICON}
                {t(cta.whatsapp, lang)}
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
