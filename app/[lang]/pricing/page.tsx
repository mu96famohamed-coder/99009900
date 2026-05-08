import type { Metadata } from 'next'
import Link from 'next/link'
import { LANGS, type Lang, t, site, HREFLANG_MAP } from '@/lib/i18n'

import { LegalServiceSchema } from '@/components/SchemaMarkup'
interface Props { params: Promise<{ lang: Lang }> }
export async function generateStaticParams() { return LANGS.map((lang) => ({ lang })) }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  const titles: Record<string, string> = {
    en: 'Our Services — Dubai Private Notary | E-Notary Dubai',
    ar: 'خدماتنا — كاتب العدل الخاص دبي | E-Notary Dubai',
    ru: 'Наши услуги — частный нотариус Дубай | E-Notary Dubai',
    zh: '我们的服务 — 迪拜私人公证 | E-Notary Dubai',
    es: 'Nuestros Servicios — Notario Privado Dubái | E-Notary Dubai',
  }
  const descs: Record<string, string> = {
    en: 'POA, MOFA attestation, corporate documents, legal notices and more — same-day service. Request an exact quote in 5 minutes via WhatsApp.',
    ar: 'وكالات وتصديق الخارجية ومستندات شركات وإنذارات قانونية — خدمة نفس اليوم. اطلب عرض سعر دقيق في 5 دقائق عبر واتساب.',
    ru: 'Доверенности, легализация, корпоративные документы, уведомления — в тот же день. Запросите точный расчёт за 5 минут в WhatsApp.',
    zh: '授权书、MOFA认证、企业文件、法律通知等——当日服务。5分钟内通过WhatsApp获取准确报价。',
    es: 'Poderes, autenticación MOFA, documentos corporativos, notificaciones legales y más — el mismo día. Cotización exacta en 5 minutos por WhatsApp.',
  }
  return {
    title: titles[lang] || titles.en,
    description: descs[lang] || descs.en,
    alternates: {
      canonical: `https://www.enotarydubai.ae/${lang}/pricing/`,
      languages: Object.fromEntries(LANGS.map(l => [HREFLANG_MAP[l], `https://www.enotarydubai.ae/${l}/pricing/`])),
        'x-default': `https://www.enotarydubai.ae/en/pricing/`,
    },
  }
}

const L = {
  h1:      { en: 'Our Services', ar: 'خدماتنا', ru: 'Наши услуги', zh: '我们的服务', es: 'Nuestros Servicios' },
  sub:     { en: 'Every service is quoted individually. WhatsApp us — we confirm the exact scope, timeline, and next steps within 5 minutes.', ar: 'كل خدمة يُقدَّم لها عرض سعر فردي. راسلنا على واتساب — نؤكد النطاق الدقيق والجدول الزمني والخطوات التالية خلال 5 دقائق.', ru: 'Каждая услуга рассчитывается индивидуально. Напишите в WhatsApp — мы подтвердим точный объём, сроки и шаги за 5 минут.', zh: '每项服务单独报价。通过WhatsApp联系我们——5分钟内确认确切范围、时间表和后续步骤。', es: 'Cada servicio se cotiza individualmente. Escríbanos por WhatsApp — confirmamos el alcance exacto, el plazo y los pasos en 5 minutos.' },
  promise: { en: 'No hidden costs. No surprises. Exact scope confirmed before we begin.', ar: 'بدون تكاليف خفية. بدون مفاجآت. النطاق الدقيق يُؤكَّد قبل البدء.', ru: 'Никаких скрытых расходов. Никаких сюрпризов. Точный объём подтверждается до начала.', zh: '无隐藏费用。无意外。开始前确认确切范围。', es: 'Sin costos ocultos. Sin sorpresas. Alcance exacto confirmado antes de comenzar.' },
  wa_cta:  { en: 'Request a Quote — 5 Minutes', ar: 'اطلب عرض سعر — 5 دقائق', ru: 'Запросить расчёт — 5 минут', zh: '申请报价 — 5分钟', es: 'Solicitar Cotización — 5 Minutos' },
  poa_h:   { en: 'Power of Attorney', ar: 'الوكالات الرسمية', ru: 'Доверенности', zh: '授权委托书', es: 'Poderes Notariales' },
  corp_h:  { en: 'Corporate & Commercial', ar: 'الشركات والتجارة', ru: 'Корпоративные услуги', zh: '企业与商业', es: 'Corporativo y Comercial' },
  notary_h:{ en: 'Notarization & Attestation', ar: 'التوثيق والتصديق', ru: 'Нотариальное заверение и легализация', zh: '公证与认证', es: 'Notarización y Autenticación' },
  tenancy_h:{ en: 'Tenancy & Legal Notices', ar: 'الإيجار والإنذارات', ru: 'Аренда и уведомления', zh: '租赁与法律通知', es: 'Arrendamiento y Notificaciones' },
  remote_h:{ en: 'Remote & International', ar: 'عن بُعد ودولي', ru: 'Удалённые и международные', zh: '远程与国际', es: 'Remoto e Internacional' },
}

const WA_ICON = <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884"/></svg>
const CHK = <svg className="w-4 h-4 text-gold-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg>

const SERVICES = {
  poa: [
    { slug: 'power-of-attorney/general', en:'General Power of Attorney', ar:'وكالة عامة', ru:'Генеральная доверенность', zh:'一般授权书', es:'POA General' },
    { slug: 'power-of-attorney/real-estate', en:'Real Estate POA', ar:'وكالة عقارية', ru:'Доверенность на недвижимость', zh:'房地产授权书', es:'POA Inmobiliario' },
    { slug: 'power-of-attorney/bank', en:'Banking POA', ar:'وكالة مصرفية', ru:'Банковская доверенность', zh:'银行授权书', es:'POA Bancario' },
    { slug: 'power-of-attorney/vehicle', en:'Vehicle POA', ar:'وكالة مركبة', ru:'Доверенность на авто', zh:'车辆授权书', es:'POA de Vehículo' },
    { slug: 'power-of-attorney/special', en:'Special POA', ar:'وكالة خاصة', ru:'Специальная доверенность', zh:'特别授权书', es:'POA Especial' },
    { slug: 'power-of-attorney/court', en:'Court / Litigation POA', ar:'وكالة قضائية', ru:'Судебная доверенность', zh:'法院授权书', es:'POA Judicial' },
    { slug: 'power-of-attorney/child-travel', en:'Child Travel Authorisation', ar:'إذن سفر طفل', ru:'Разрешение на выезд ребёнка', zh:'儿童旅行授权', es:'Autorización Viaje Menor' },
    { slug: 'power-of-attorney/inheritance', en:'Inheritance POA', ar:'وكالة الميراث', ru:'Доверенность на наследство', zh:'继承授权书', es:'POA de Herencia' },
    { slug: 'power-of-attorney/company-formation', en:'Company Formation POA', ar:'وكالة تأسيس شركة', ru:'Доверенность на регистрацию', zh:'公司注册授权书', es:'POA Formación Empresa' },
    { slug: 'power-of-attorney/property-gifting', en:'Property Gifting POA', ar:'وكالة هبة عقارية', ru:'Доверенность на дарение', zh:'房产赠与授权书', es:'POA Donación Propiedad' },
    { slug: 'power-of-attorney/mohre', en:'MOHRE / Labour POA', ar:'وكالة وزارة الموارد البشرية', ru:'Доверенность MOHRE', zh:'MOHRE劳工授权书', es:'POA MOHRE / Laboral' },
  ],
  corporate: [
    { slug: 'corporate/moa', en:'MOA Notarization', ar:'توثيق عقد التأسيس', ru:'Нотариальное заверение MOA', zh:'公司章程公证', es:'Notarización de MOA' },
    { slug: 'corporate/moa-amendment', en:'MOA Amendment', ar:'تعديل عقد التأسيس', ru:'Поправка к MOA', zh:'章程修正', es:'Enmienda al MOA' },
    { slug: 'corporate/board-resolution', en:'Board Resolution', ar:'قرار مجلس الإدارة', ru:'Решение совета директоров', zh:'董事会决议', es:'Resolución del Directorio' },
    { slug: 'corporate/share-transfer', en:'Share Transfer', ar:'نقل الحصص', ru:'Передача акций', zh:'股权转让', es:'Transferencia de Acciones' },
    { slug: 'corporate/shareholder-agreement', en:'Shareholder Agreement', ar:'اتفاقية المساهمين', ru:'Акционерное соглашение', zh:'股东协议', es:'Acuerdo de Accionistas' },
    { slug: 'corporate/liquidation', en:'Company Liquidation', ar:'تصفية الشركة', ru:'Ликвидация компании', zh:'公司清算', es:'Liquidación de Empresa' },
    { slug: 'corporate/contract', en:'Commercial Contract', ar:'عقد تجاري', ru:'Коммерческий договор', zh:'商业合同', es:'Contrato Comercial' },
  ],
  notarization: [
    { slug: 'affidavit', en:'Affidavit / Sworn Statement', ar:'إقرار مشفوع باليمين', ru:'Аффидевит / Клятвенное заявление', zh:'宣誓书', es:'Affidávit / Declaración Jurada' },
    { slug: 'last-will-testament-dubai', en:'Last Will & Testament', ar:'الوصية الأخيرة', ru:'Завещание', zh:'遗嘱', es:'Testamento' },
    { slug: 'attestation/mofa', en:'MOFA Attestation', ar:'تصديق وزارة الخارجية', ru:'Легализация MOFA', zh:'MOFA认证', es:'Autenticación MOFA' },
    { slug: 'attestation/apostille', en:'Apostille Certification', ar:'تصديق الأبوستيل', ru:'Апостиль', zh:'海牙认证', es:'Apostilla' },
    { slug: 'attestation/embassy', en:'Embassy Attestation', ar:'تصديق السفارة', ru:'Легализация в посольстве', zh:'大使馆认证', es:'Autenticación de Embajada' },
    { slug: 'legal-translation', en:'Legal Translation', ar:'ترجمة قانونية', ru:'Юридический перевод', zh:'法律翻译', es:'Traducción Legal' },
  ],
  tenancy: [
    { slug: 'legal-notice/eviction', en:'Eviction Notice (Article 25)', ar:'إشعار إخلاء (المادة 25)', ru:'Уведомление о выселении', zh:'驱逐通知（第25条）', es:'Aviso de Desalojo (Art. 25)' },
    { slug: 'legal-notice', en:'Legal Notice (All Types)', ar:'إنذار قانوني (جميع الأنواع)', ru:'Юридическое уведомление', zh:'法律通知', es:'Notificación Legal' },
    { slug: 'rdc-support', en:'RDC Case Support', ar:'دعم مركز فض النزاعات', ru:'Поддержка RDC', zh:'RDC案件支持', es:'Apoyo RDC' },
    { slug: 'legal-notice/poa-cancellation', en:'POA Cancellation Notice', ar:'إشعار إلغاء الوكالة', ru:'Уведомление об отзыве доверенности', zh:'授权书取消通知', es:'Cancelación de POA' },
  ],
  remote: [
    { slug: 'e-notary', en:'Remote E-Notary', ar:'التوثيق الإلكتروني عن بُعد', ru:'Удалённый электронный нотариус', zh:'远程电子公证', es:'E-Notario Remoto' },
    { slug: 'mobile-notary', en:'Mobile Notary (Dubai)', ar:'كاتب عدل متنقل (دبي)', ru:'Выездной нотариус (Дубай)', zh:'移动公证（迪拜）', es:'Notario Móvil (Dubái)' },
    { slug: 'emergency-notary', en:'Emergency / After-Hours Notary', ar:'توثيق طارئ / خارج أوقات العمل', ru:'Срочный / внеурочный нотариус', zh:'紧急/下班后公证', es:'Notario de Emergencia' },
  ],
}

function Section({ title, items, lang }: { title: string; items: typeof SERVICES.poa; lang: Lang }) {
  return (
    <div className="mb-10">
      <h2 className="gold-line font-serif text-xl font-bold text-navy-900 mb-5">{title}</h2>
      <div className="grid gap-2 sm:grid-cols-2">
        {items.map((svc) => {
          const label = (svc as any)[lang] || svc.en
          return (
            <Link key={svc.slug} href={`/${lang}/${svc.slug}`}
              className="flex items-center gap-3 px-4 py-3 bg-white rounded-xl border border-navy-100 hover:border-gold-400/40 hover:bg-gold-400/[0.02] transition-all duration-150 group">
              {CHK}
              <span className="text-sm text-navy-800 group-hover:text-navy-900 flex-1 leading-snug">{label}</span>
              <svg className="w-3.5 h-3.5 text-navy-300 group-hover:text-gold-500 shrink-0 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
              </svg>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default async function ServicesPage({ params }: Props) {
  const { lang } = await params
  const waUrl = `https://wa.me/${site.phone.replace(/\D/g, '')}?text=${encodeURIComponent('I would like a quote for notary services in Dubai')}`

  return (
    <div className="bg-white min-h-screen">
      <LegalServiceSchema lang={lang} path="/pricing" />
      {/* Hero */}
      <div className="hero-bg py-14">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <p className="overline-label mb-3 text-gold-400/80">{t({en:'Dubai Private Notary Office',ar:'كاتب العدل الخاص دبي',ru:'Частный нотариус Дубай',zh:'迪拜私人公证办公室',es:'Oficina Notarial Privada Dubái'}, lang)}</p>
          <h1 className="font-serif text-3xl font-bold text-white sm:text-4xl mb-4">{t(L.h1, lang)}</h1>
          <p className="text-navy-300 text-sm leading-relaxed max-w-2xl mb-8">{t(L.sub, lang)}</p>
          <a href={waUrl} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] text-white font-bold px-7 py-3.5 rounded-xl hover:bg-[#20b958] transition-colors text-sm shadow-lg shadow-black/20">
            {WA_ICON} {t(L.wa_cta, lang)}
          </a>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 lg:px-8 py-12">
        {/* Promise */}
        <div className="mb-10 flex items-center gap-4 px-5 py-4 bg-navy-50 rounded-2xl border border-navy-100">
          <div className="w-10 h-10 rounded-full bg-navy-900 flex items-center justify-center shrink-0">
            <svg className="w-5 h-5 text-gold-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <p className="text-sm text-navy-700 leading-relaxed">{t(L.promise, lang)}</p>
        </div>

        <Section title={t(L.poa_h, lang)} items={SERVICES.poa} lang={lang} />
        <Section title={t(L.corp_h, lang)} items={SERVICES.corporate} lang={lang} />
        <Section title={t(L.notary_h, lang)} items={SERVICES.notarization} lang={lang} />
        <Section title={t(L.tenancy_h, lang)} items={SERVICES.tenancy} lang={lang} />
        <Section title={t(L.remote_h, lang)} items={SERVICES.remote} lang={lang} />

        {/* Final CTA */}
        <div className="cta-block text-center mt-6">
          <p className="overline-label text-gold-400/80 mb-3">{t({en:'Ready when you are',ar:'جاهزون متى كنت مستعداً',ru:'Готовы когда вы готовы',zh:'随时为您服务',es:'Listos cuando usted lo esté'}, lang)}</p>
          <h2 className="font-serif text-2xl font-bold text-white mb-2">{t(L.wa_cta, lang)}</h2>
          <p className="text-navy-400 text-sm mb-6 max-w-sm mx-auto">{t(L.promise, lang)}</p>
          <a href={waUrl} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] text-white font-bold px-8 py-3.5 rounded-xl hover:bg-[#20b958] transition-colors text-sm">
            {WA_ICON} {t({en:'Get Your Quote',ar:'احصل على عرضك',ru:'Получить расчёт',zh:'获取报价',es:'Obtener Cotización'}, lang)}
          </a>
        </div>
      </div>
    </div>
  )
}
