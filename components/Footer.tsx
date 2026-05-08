import Link from 'next/link'
import { type Lang, t, footer, site, cta } from '@/lib/i18n'
import AcceptedByMarquee from './AcceptedByMarquee'

interface Props { lang: Lang }

const FOOTER_LINKS = {
  poa: [
    { href: '/power-of-attorney/general',           en: 'General POA',          ar: 'وكالة عامة',             ru: 'Генеральная доверенность',       zh: '一般授权书',     es: 'POA General' },
    { href: '/power-of-attorney/real-estate',        en: 'Real Estate POA',      ar: 'وكالة عقارية',           ru: 'Доверенность на недвижимость',   zh: '房地产授权书',   es: 'POA Inmobiliario' },
    { href: '/power-of-attorney/vehicle',            en: 'Vehicle POA',          ar: 'وكالة مركبة',            ru: 'Доверенность на авто',           zh: '车辆授权书',     es: 'POA Vehículo' },
    { href: '/power-of-attorney/bank',               en: 'Bank POA',             ar: 'وكالة بنكية',            ru: 'Банковская доверенность',        zh: '银行授权书',     es: 'POA Bancario' },
    { href: '/power-of-attorney/company-formation',  en: 'Company Formation POA',ar: 'وكالة تأسيس شركة',       ru: 'Доверенность на регистрацию',    zh: '公司注册授权书', es: 'POA Empresa' },
    { href: '/power-of-attorney/child-travel',       en: 'Child Travel Auth.',   ar: 'إذن سفر طفل',            ru: 'Разрешение на выезд ребёнка',    zh: '儿童旅行授权',   es: 'Viaje Menor' },
    { href: '/poa-cancellation',                     en: 'POA Cancellation',     ar: 'إلغاء الوكالة',          ru: 'Отмена доверенности',            zh: '撤销授权',       es: 'Cancelación POA' },
  ],
  notary: [
    { href: '/attestation/mofa',      en: 'MOFA Attestation',      ar: 'تصديق الخارجية',     ru: 'Легализация MOFA',           zh: '外交部认证',   es: 'Autenticación MOFA' },
    { href: '/attestation/apostille', en: 'Apostille',             ar: 'أبوستيل',            ru: 'Апостиль',                   zh: '附加证明书',   es: 'Apostilla' },
    { href: '/attestation/embassy',   en: 'Embassy Attestation',   ar: 'تصديق السفارة',      ru: 'Легализация посольства',     zh: '使馆认证',     es: 'Atestación Embajada' },
    { href: '/attestation/degree',    en: 'Degree Attestation',    ar: 'تصديق الشهادات',     ru: 'Легализация диплома',        zh: '学历证书认证', es: 'Título Educativo' },
    { href: '/attestation/marriage',  en: 'Marriage Certificate',  ar: 'تصديق عقد الزواج',   ru: 'Свидетельство о браке',      zh: '结婚证认证',   es: 'Acta Matrimonio' },
    { href: '/e-notary',              en: 'E-Notary (Remote)',      ar: 'الكاتب الإلكتروني',  ru: 'Электронный нотариус',       zh: '电子公证',     es: 'E-Notario' },
    { href: '/mobile-notary',         en: 'Mobile Notary',         ar: 'كاتب عدل متنقل',     ru: 'Выездной нотариус',          zh: '上门公证',     es: 'Notario Móvil' },
    { href: '/emergency-notary',      en: 'Same-Day Urgent',       ar: 'توثيق عاجل نفس اليوم', ru: 'Срочно в тот же день',     zh: '当日紧急公证', es: 'Urgente Mismo Día' },
    { href: '/legal-translation',     en: 'Legal Translation',     ar: 'ترجمة قانونية',       ru: 'Юридический перевод',        zh: '法律翻译',     es: 'Traducción Legal' },
  ],
  tenancy: [
    { href: '/legal-notice/eviction',         en: 'Eviction Notice',         ar: 'إشعار الإخلاء',        ru: 'Уведомление о выселении',   zh: '驱逐通知',      es: 'Aviso de Desalojo' },
    { href: '/legal-notice',                  en: 'Legal Notice',            ar: 'إنذار قانوني',          ru: 'Юридическое уведомление',   zh: '法律通知',      es: 'Notificación Legal' },
    { href: '/legal-notice/poa-cancellation', en: 'POA Cancellation Notice', ar: 'إنذار إلغاء وكالة',    ru: 'Уведомление об отмене POA', zh: '撤销授权通知',  es: 'Aviso Cancelación' },
    { href: '/rdc-support',                   en: 'RDC Support',             ar: 'دعم مركز النزاعات',     ru: 'Поддержка RDC',             zh: 'RDC支持',        es: 'Soporte RDC' },
    { href: '/last-will-testament-dubai',     en: 'Last Will & Testament',   ar: 'الوصية الأخيرة',        ru: 'Завещание',                 zh: '遗嘱',          es: 'Testamento' },
    { href: '/affidavit',                     en: 'Affidavit',               ar: 'إقرارات',              ru: 'Аффидевиты',                zh: '宣誓书',         es: 'Declaraciones' },
    { href: '/certified-true-copy',           en: 'Certified Copy',          ar: 'نسخة مصدقة',           ru: 'Заверенная копия',          zh: '经认证副本',     es: 'Copia Compulsada' },
  ],
  resources: [
    { href: '/pricing',                  en: 'All Services',          ar: 'جميع الخدمات',          ru: 'Все услуги',                zh: '全部服务',    es: 'Todos los Servicios' },
    { href: '/faq',                      en: 'FAQ',                   ar: 'الأسئلة الشائعة',       ru: 'Вопросы и ответы',          zh: '常见问题',    es: 'Preguntas Frecuentes' },
    { href: '/blog',                     en: 'Blog & Guides',         ar: 'المدونة',               ru: 'Блог',                      zh: '博客',        es: 'Blog' },
    { href: '/document-rejection',       en: 'Document Rejected?',    ar: 'وثيقة مرفوضة؟',         ru: 'Документ отклонён?',        zh: '文件被拒？',  es: '¿Doc. Rechazado?' },
    { href: '/why-poa-rejected-dubai',   en: 'Why POA Rejected?',     ar: 'لماذا رُفضت الوكالة؟',   ru: 'Почему отказали в POA?',    zh: '为何授权被拒？', es: '¿Por Qué Rechazan?' },
    { href: '/what-is-tableegh',         en: 'What is Tableegh?',     ar: 'ما هو التبليغ؟',         ru: 'Что такое Tableegh?',       zh: '什么是Tableegh?', es: '¿Qué es Tableegh?' },
    { href: '/about',                    en: 'About',                 ar: 'عن الشركة',             ru: 'О нас',                     zh: '关于我们',    es: 'Acerca de' },
    { href: '/contact',                  en: 'Contact',               ar: 'تواصل معنا',             ru: 'Контакты',                  zh: '联系我们',    es: 'Contacto' },
  ],
}

const HEADERS = {
  poa:       { en: 'Power of Attorney',    ar: 'الوكالات الرسمية',        ru: 'Доверенности',          zh: '授权委托书',   es: 'Poderes Notariales' },
  notary:    { en: 'Notarization & Attestation', ar: 'التوثيق والتصديق', ru: 'Нотариат и легализация', zh: '公证与认证',   es: 'Notarización' },
  tenancy:   { en: 'Tenancy & Legal',      ar: 'الإيجار والقانون',        ru: 'Аренда и право',         zh: '租赁与法律',   es: 'Arrendamiento' },
  resources: { en: 'Resources',            ar: 'الموارد',                 ru: 'Ресурсы',               zh: '资源',         es: 'Recursos' },
  contact:   { en: 'Contact',              ar: 'تواصل معنا',              ru: 'Контакты',               zh: '联系我们',     es: 'Contacto' },
}

export default function Footer({ lang }: Props) {
  return (
    <footer className="bg-navy-900 border-t border-navy-800">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">

        {/* ── Main grid: Brand + 4 link columns ── */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-6">

          {/* Brand column — spans 2 cols on lg */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-navy-700 flex items-center justify-center">
                <span className="font-serif font-bold text-gold-400 text-lg">P</span>
              </div>
              <div>
                <div className="font-serif font-bold text-white text-base leading-none">E-Notary Dubai</div>
                <div className="text-[10px] text-navy-400 uppercase tracking-widest leading-none mt-0.5">LICENSED NOTARY SUPPORT · DUBAI</div>
              </div>
            </div>
            <p className="text-sm text-navy-300 leading-relaxed mb-4">
              {t(footer.tagline, lang)}
            </p>
            <a
              href={`https://wa.me/${site.phone.replace(/\D/g, '')}`}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] text-white text-sm font-bold px-4 py-2 rounded-xl hover:bg-[#20b958] transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884"/>
              </svg>
              {t(cta.whatsapp, lang)}
            </a>
          </div>

          {/* POA column */}
          <div>
            <h3 className="text-xs font-bold text-navy-400 uppercase tracking-wide mb-4">{t(HEADERS.poa, lang)}</h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.poa.map((link) => (
                <li key={link.href}>
                  <Link href={`/${lang}${link.href}`} className="text-sm text-navy-300 hover:text-gold-400 transition-colors">
                    {t(link, lang)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Notary column */}
          <div>
            <h3 className="text-xs font-bold text-navy-400 uppercase tracking-wide mb-4">{t(HEADERS.notary, lang)}</h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.notary.map((link) => (
                <li key={link.href}>
                  <Link href={`/${lang}${link.href}`} className="text-sm text-navy-300 hover:text-gold-400 transition-colors">
                    {t(link, lang)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tenancy column */}
          <div>
            <h3 className="text-xs font-bold text-navy-400 uppercase tracking-wide mb-4">{t(HEADERS.tenancy, lang)}</h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.tenancy.map((link) => (
                <li key={link.href}>
                  <Link href={`/${lang}${link.href}`} className="text-sm text-navy-300 hover:text-gold-400 transition-colors">
                    {t(link, lang)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources + Contact column */}
          <div>
            <h3 className="text-xs font-bold text-navy-400 uppercase tracking-wide mb-4">{t(HEADERS.resources, lang)}</h3>
            <ul className="space-y-2 mb-8">
              {FOOTER_LINKS.resources.map((link) => (
                <li key={link.href}>
                  <Link href={`/${lang}${link.href}`} className="text-sm text-navy-300 hover:text-gold-400 transition-colors">
                    {t(link, lang)}
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="text-xs font-bold text-navy-400 uppercase tracking-wide mb-3">{t(HEADERS.contact, lang)}</h3>
            <ul className="space-y-2">
              <li>
                <a href={`tel:${site.phone}`} className="flex items-center gap-2 text-sm text-navy-300 hover:text-gold-400 transition-colors">
                  <svg className="w-3.5 h-3.5 text-navy-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 7V5z" />
                  </svg>
                  {site.phone_display}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="flex items-center gap-2 text-sm text-navy-300 hover:text-gold-400 transition-colors">
                  <svg className="w-3.5 h-3.5 text-navy-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {site.email}
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-navy-300">
                <svg className="w-3.5 h-3.5 text-navy-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {site.address}
              </li>
              <li className="text-xs text-navy-500 space-y-0.5 pt-1">
                <p>{site.hours?.weekday}</p>
                <p>{site.hours?.saturday}</p>
                <p>{t({ en: 'WhatsApp: 7 days', ar: 'واتساب: 7 أيام', ru: 'WhatsApp: 7 дней', zh: 'WhatsApp: 每天', es: 'WhatsApp: 7 días' }, lang)}</p>
              </li>
            </ul>
          </div>
        </div>

        {/* ── Authority logos marquee ── */}
        <div className="mt-10 pt-8 border-t border-navy-800" dir="ltr">
          <AcceptedByMarquee
            variant="light"
            logoHeight={48}
            gap={14}
            speed={40}
            title={t({ en: 'Accepted by All UAE Government Entities', ar: 'مقبول لدى جميع الجهات الحكومية الإماراتية', ru: 'Принимается всеми органами ОАЭ', zh: '所有阿联酋政府机构接受', es: 'Aceptado por todas las autoridades de los EAU' }, lang)}
            showTitle={true}
          />
        </div>

        {/* ── Bottom bar ── */}
        <div className="mt-6 pt-6 border-t border-navy-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-navy-500">{t(footer.copyright, lang)}</p>
          <p className="text-xs text-navy-600">{t(footer.disclaimer, lang)}</p>
        </div>
      </div>
    </footer>
  )
}
