import Link from 'next/link'
import type { Metadata } from 'next'
import { type Lang, t, services, steps, faq, cta, site, trust_badges, LANGS } from '@/lib/i18n'
import FAQSection from '@/components/FAQSection'
import { FAQSchema, LegalServiceSchema } from '@/components/SchemaMarkup'
import AcceptedByMarquee from '@/components/AcceptedByMarquee'


export async function generateMetadata({ params }: { params: Promise<{ lang: Lang }> }): Promise<Metadata> {
  const { lang } = await params
  const titles: Record<string, string> = {
    en: 'POA & Attestation Dubai 2026 | E-Notary Dubai',
    ar: 'دعم كاتب العدل دبي 2026 | وكالات وتصديق وإنذارات قانونية | E-Notary Dubai',
    ru: 'Нотариальная поддержка Дубай 2026 | Доверенности, легализация | E-Notary Dubai',
    zh: '迪拜公证支持 2026 | 授权委托书及认证 | E-Notary Dubai',
    es: 'Soporte Notarial Dubái 2026 | Poderes, Autenticación | E-Notary Dubai',
  }
  const descs: Record<string, string> = {
    en: 'Dubai private notary support — POA, MOFA attestation, legal notices & corporate documents. Same-day. Remote e-notary. Accepted by all UAE authorities.',
    ar: 'دعم كاتب العدل الخاص في دبي — وكالات، تصديق الخارجية، إنذارات قانونية ومستندات شركات. خدمة في نفس اليوم. مقبول من جميع الجهات الإماراتية.',
    ru: 'Частная нотариальная поддержка в Дубае — доверенности, легализация MOFA, юридические уведомления. В тот же день. Принимается всеми органами ОАЭ.',
    zh: '迪拜私人公证支持 — 授权委托书，外交部认证，法律通知及企业文件。当日服务。阿联酋所有机构接受。',
    es: 'Soporte notarial privado en Dubái — Poderes, autenticación MOFA, avisos legales y documentos corporativos. Mismo día. Aceptado por todas las autoridades de los EAU.',
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
  }
}

export async function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }))
}

interface Props { params: Promise<{ lang: Lang }> }

const WA_ICON = <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884"/></svg>

const H = {
  h1: { en:'Notary Support Dubai — POA, Attestation & Legal Notices', ar:'دعم كاتب العدل في دبي — وكالات، تصديق وإنذارات قانونية', ru:'Нотариальная поддержка в Дубае — доверенности, легализация и уведомления', zh:'迪拜公证支持 — 授权书、认证及法律通知', es:'Soporte Notarial en Dubái — Poderes, Autenticación y Notificaciones' },
  sub: { en:'Professional drafting, notarization, and attestation — same-day, fully online. Trusted by individuals and corporations across the UAE.', ar:'صياغة وتوثيق وتصديق احترافي — في نفس اليوم، أونلاين بالكامل. موثوق به من الأفراد والشركات في جميع أنحاء الإمارات.', ru:'Профессиональное составление, заверение и легализация — в тот же день, полностью онлайн. Доверяют физические и юридические лица по всем ОАЭ.', zh:'专业起草、公证和认证服务——当日完成，全程在线。深受阿联酋个人及企业信赖。', es:'Redacción, notarización y autenticación profesional — el mismo día, totalmente en línea. Con la confianza de particulares y empresas en todo los EAU.' },
  b1: { en:'Same-Day Service', ar:'خدمة نفس اليوم', ru:'В тот же день', zh:'当日服务', es:'Servicio el Mismo Día' },
  b2: { en:'Fully Online', ar:'أونلاين بالكامل', ru:'Полностью онлайн', zh:'全程在线', es:'Totalmente en Línea' },
  b3: { en:'Dubai Courts Approved', ar:'معتمد من محاكم دبي', ru:'Одобрено Dubai Courts', zh:'迪拜法院认可', es:'Aprobado por Dubai Courts' },
  start: { en:'Start on WhatsApp', ar:'ابدأ عبر واتساب', ru:'Начать в WhatsApp', zh:'通过WhatsApp开始', es:'Iniciar en WhatsApp' },
  all_svc: { en:'View All Services', ar:'جميع الخدمات', ru:'Все услуги', zh:'查看所有服务', es:'Ver Todos los Servicios' },
  accepted: { en:'Accepted by all UAE Authorities', ar:'مقبول من جميع الجهات الإماراتية', ru:'Принимается всеми органами ОАЭ', zh:'获所有阿联酋机构认可', es:'Aceptado por todas las Autoridades de los EAU' },
  poa_h: { en:'Power of Attorney', ar:'خدمات الوكالة الرسمية', ru:'Доверенность (POA)', zh:'授权委托书', es:'Poder Notarial (POA)' },
  poa_s: { en:'All types — drafted, notarized, delivered same day', ar:'جميع الأنواع — صياغة وتوثيق وتسليم في نفس اليوم', ru:'Все виды — составление, заверение и доставка в тот же день', zh:'所有类型——当日起草、公证并送达', es:'Todos los tipos — redactados, notarizados y entregados el mismo día' },
  all_poa: { en:'View all POA types →', ar:'← جميع أنواع الوكالات', ru:'Все виды доверенностей →', zh:'查看所有授权类型 →', es:'Ver todos los tipos de POA →' },
  corp_h: { en:'Corporate & Commercial Documents', ar:'مستندات الشركات والتجارة', ru:'Корпоративные и коммерческие документы', zh:'企业及商业文件', es:'Documentos Corporativos y Comerciales' },
  corp_s: { en:'Company formation, governance, and restructuring documents — notarized same day', ar:'مستندات تأسيس الشركات والحوكمة وإعادة الهيكلة — توثيق في نفس اليوم', ru:'Документы для регистрации, управления и реструктуризации компаний — заверение в тот же день', zh:'公司成立、治理及重组文件——当日公证', es:'Documentos de constitución, gobernanza y reestructuración empresarial — notarizados el mismo día' },
  all_corp: { en:'View all corporate services →', ar:'← جميع خدمات الشركات', ru:'Все корпоративные услуги →', zh:'查看所有企业服务 →', es:'Ver todos los servicios corporativos →' },
  attest_h: { en:'Attestation & Authentication', ar:'التصديق والمصادقة', ru:'Легализация и аутентификация', zh:'认证与鉴证', es:'Autenticación y Legalización' },
  tenancy_h: { en:'Tenancy & Legal Notices', ar:'الإيجار والإنذارات القانونية', ru:'Аренда и юридические уведомления', zh:'租赁及法律通知', es:'Arrendamiento y Notificaciones Legales' },
  remote_h: { en:'Remote & Online Services', ar:'الخدمات عن بُعد وأونلاين', ru:'Удалённые и онлайн услуги', zh:'远程及在线服务', es:'Servicios Remotos y en Línea' },
  mobile_t: { en:'Mobile Notary', ar:'كاتب عدل متنقل', ru:'Выездной нотариус', zh:'上门公证服务', es:'Notario Móvil' },
  mobile_d: { en:'We come to your home, office, or hotel in Dubai.', ar:'نأتي إلى منزلك أو مكتبك أو فندقك في دبي.', ru:'Мы приедем к вам домой, в офис или отель в Дубае.', zh:'我们上门前往您在迪拜的住所、办公室或酒店。', es:'Vamos a su hogar, oficina u hotel en Dubái.' },
  how_h: { en:'How It Works — 5 Steps, Fully Online', ar:'كيف تسير المعاملة — 5 خطوات أونلاين', ru:'Как это работает — 5 шагов, онлайн', zh:'服务流程 — 5个步骤，全程在线', es:'Cómo Funciona — 5 Pasos, en Línea' },
  how_s: { en:'From document submission to delivery — you approve the draft before we notarize anything.', ar:'من تقديم المستندات حتى التسليم — توافق على المسودة قبل أي توثيق.', ru:'От подачи до доставки — вы утверждаете черновик перед заверением.', zh:'从文件提交到交付——公证前须先确认草稿。', es:'Desde la presentación hasta la entrega — aprueba el borrador antes de que notaricemos.' },
  faq_h: { en:'Frequently Asked Questions', ar:'الأسئلة الشائعة', ru:'Часто задаваемые вопросы', zh:'常见问题', es:'Preguntas Frecuentes' },
  faq_all: { en:'View all FAQs', ar:'عرض كل الأسئلة', ru:'Все вопросы', zh:'查看所有常见问题', es:'Ver todas las preguntas' },
  now5: { en:'Start Now — Reply in 5 Minutes', ar:'ابدأ الآن — رد خلال 5 دقائق', ru:'Начать — ответ за 5 минут', zh:'立即开始 — 5分钟内回复', es:'Comenzar — Respuesta en 5 Minutos' },
  same_day: { en:'Same-Day', ar:'نفس اليوم', ru:'День в день', zh:'当日', es:'Mismo Día' },
}

const UNIFIED_CARD_STYLE = 'from-slate-500/10 to-slate-500/5 border-slate-200 hover:border-slate-300'
const POA_COLORS = [UNIFIED_CARD_STYLE]
const CORP_COLORS = [UNIFIED_CARD_STYLE]

const CORP_SERVICES = [
  { slug: 'moa', en: 'MOA Notarization', ar: 'توثيق عقد التأسيس', ru: 'Нотариальное заверение MOA', zh: 'MOA公证', es: 'Notarización de MOA', desc_en: 'Company formation & DED registration', desc_ar: 'تأسيس الشركة وتسجيل DED', desc_ru: 'Регистрация компании в DED', desc_es: 'Constitución y registro DED' },
  { slug: 'board-resolution', en: 'Board Resolution', ar: 'قرار مجلس الإدارة', ru: 'Решение совета директоров', zh: '董事会决议', es: 'Resolución del Directorio', desc_en: 'Bank account opening & signatory authority', desc_ar: 'فتح حساب بنكي وصلاحيات التوقيع', desc_ru: 'Открытие счёта и полномочия подписи', desc_es: 'Apertura de cuenta y autoridad de firma' },
  { slug: 'moa-amendment', en: 'MOA Amendment', ar: 'تعديل عقد التأسيس', ru: 'Поправка к MOA', zh: 'MOA修订', es: 'Enmienda al MOA', desc_en: 'Change name, activities, capital or shareholders', desc_ar: 'تغيير الاسم أو الأنشطة أو رأس المال أو المساهمين', desc_ru: 'Изменение названия, деятельности, капитала', desc_es: 'Cambio de nombre, actividades, capital' },
  { slug: 'share-transfer', en: 'Share Transfer', ar: 'نقل الحصص', ru: 'Передача акций', zh: '股权转让', es: 'Transferencia de Acciones', desc_en: 'Transfer of ownership between shareholders', desc_ar: 'نقل الملكية بين المساهمين', desc_ru: 'Переход прав собственности между акционерами', desc_es: 'Transferencia de propiedad entre accionistas' },
  { slug: 'shareholder-agreement', en: 'Shareholder Agreement', ar: 'اتفاقية المساهمين', ru: 'Акционерное соглашение', zh: '股东协议', es: 'Acuerdo de Accionistas', desc_en: 'Rights, dividends, exit clauses & disputes', desc_ar: 'الحقوق والأرباح وبنود الخروج والنزاعات', desc_ru: 'Права, дивиденды, выход и споры', desc_es: 'Derechos, dividendos, salida y disputas' },
  { slug: 'liquidation', en: 'Company Liquidation', ar: 'تصفية الشركة', ru: 'Ликвидация компании', zh: '公司清算', es: 'Liquidación de Empresa', desc_en: 'Closure, deregistration & final settlement', desc_ar: 'إغلاق الشركة وشطبها والتسوية النهائية', desc_ru: 'Закрытие, дерегистрация, расчёты', desc_es: 'Cierre, baja y liquidación final' },
  { slug: 'contract', en: 'Commercial Contract', ar: 'عقد تجاري', ru: 'Коммерческий договор', zh: '商业合同', es: 'Contrato Comercial', desc_en: 'Service agreements & business partnerships', desc_ar: 'اتفاقيات الخدمات والشراكات التجارية', desc_ru: 'Договоры услуг и деловые партнёрства', desc_es: 'Acuerdos de servicio y asociaciones comerciales' },
]

export default async function HomePage({ params }: Props) {
  const { lang } = await params
  const waMsg = t({ en:'I need notary support in Dubai', ar:'أحتاج مساعدة في التوثيق بدبي', ru:'Мне нужна нотариальная поддержка', zh:'我需要迪拜公证支持', es:'Necesito soporte notarial en Dubái' }, lang)
  const waUrl = `https://wa.me/${site.phone.replace(/\D/g,'')}?text=${encodeURIComponent(waMsg)}`

  return (
    <>
      <LegalServiceSchema lang={lang} path="/" />
      <FAQSchema items={faq.general} lang={lang} />

      {/* HERO */}
      <section className="relative hero-bg overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{background:'radial-gradient(ellipse at 15% 50%, rgba(212,180,58,.06) 0%, transparent 60%), radial-gradient(ellipse at 85% 20%, rgba(74,106,138,.12) 0%, transparent 60%)'}} />
        <div className="relative mx-auto max-w-7xl px-4 lg:px-8 py-16 lg:py-24">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
            <div className="max-w-3xl">
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="badge-green">⚡ {t(H.b1,lang)}</span>
                <span className="badge-gold">{t(H.b2,lang)}</span>
                <span className="badge-navy">{t(H.b3,lang)}</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-5">
                {t(H.h1, lang)}
              </h1>
              <p className="text-navy-300 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl">{t(H.sub, lang)}</p>
              <div className="flex flex-wrap gap-3">
                <a href={waUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#25D366] text-white font-bold px-7 py-3.5 rounded-xl hover:bg-[#20b958] transition-colors text-sm">{WA_ICON}{t(H.start, lang)}</a>
                <Link href={`/${lang}/power-of-attorney`} className="inline-flex items-center gap-2 bg-navy-800 text-navy-200 font-bold px-7 py-3.5 rounded-xl hover:bg-navy-700 transition-colors text-sm border border-navy-700">{t(H.all_svc, lang)}</Link>
              </div>
              {/* Stats */}
              <div className="flex flex-wrap gap-4 mt-8 pt-6 border-t border-navy-800">
                {[
                  {num:'10,000+', a:{en:'Documents',ar:'وثيقة',ru:'Документов',zh:'文件',es:'Documentos'}, b:{en:'Notarized',ar:'موثقة',ru:'Заверено',zh:'公证完成',es:'Notarizados'}},
                  {num:'100%', a:{en:'First-Time',ar:'من الأولى',ru:'С первого раза',zh:'一次通过',es:'Primera Vez'}, b:{en:'Accepted',ar:'مقبولة',ru:'Принято',zh:'获批',es:'Aceptado'}},
                  {num:'7', a:{en:'Days/Week',ar:'أيام أسبوعياً',ru:'Дней/неделю',zh:'天/周',es:'Días/Semana'}, b:{en:'Support',ar:'دعم',ru:'Поддержка',zh:'支持',es:'Soporte'}},
                ].map((s,i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="font-serif text-2xl font-bold text-gold-400">{s.num}</span>
                    <div className="text-xs text-navy-400 leading-tight">
                      <div className="text-white font-semibold">{t(s.a,lang)}</div>
                      <div>{t(s.b,lang)}</div>
                    </div>
                    {i < 3 && <div className="w-px bg-navy-700 self-stretch ms-2" />}
                  </div>
                ))}
              </div>
            </div>
            {/* Hero image */}
            <div className="hidden lg:flex items-center justify-center">
              <div className="relative">
                <div className="absolute -inset-4 rounded-3xl" style={{background:'radial-gradient(ellipse at center, rgba(212,180,58,.07) 0%, transparent 70%)'}} />
                <img src="/assets/hero/poa-doc.png" alt="UAE Notary Document" className="relative w-[480px] xl:w-[500px] h-auto" style={{filter:'drop-shadow(0 0 40px rgba(212,180,58,.13))'}} />
              </div>
            </div>
          </div>
        </div>
        {/* Trust bar — infinite scrolling marquee */}
        <div className="relative border-t border-navy-800" dir="ltr">
          <AcceptedByMarquee
            variant="light"
            logoHeight={56}
            gap={14}
            speed={50}
            title={t(H.accepted, lang)}
            showTitle={true}
          />
        </div>
      </section>

      {/* POA */}
      <section className="bg-white py-16 border-t border-navy-100">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <p className="overline-label mb-2">{t({en:'Most Requested',ar:'الأكثر طلباً',ru:'Наиболее востребовано',zh:'最受欢迎',es:'Más solicitado'}, lang)}</p>
              <h2 className="gold-line font-serif text-2xl font-bold text-navy-900 sm:text-3xl">{t(H.poa_h, lang)}</h2>
              <p className="mt-2 text-navy-500 text-sm">{t(H.poa_s, lang)}</p>
            </div>
            <Link href={`/${lang}/power-of-attorney`} className="shrink-0 inline-flex items-center gap-1.5 text-sm font-semibold text-navy-600 hover:text-gold-600 transition-colors border border-navy-200 hover:border-gold-400/40 px-4 py-2 rounded-xl">
              {t(H.all_poa, lang)}
            </Link>
          </div>
          <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {services.poa.types.map((type, idx) => (
              <Link key={type.slug} href={`/${lang}/power-of-attorney/${type.slug}`}
                className={`group relative bg-gradient-to-br ${POA_COLORS[idx % POA_COLORS.length]} border rounded-2xl p-5 hover:-translate-y-0.5 transition-all duration-200 hover:shadow-lg`}>
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-bold text-navy-900 text-sm leading-snug group-hover:text-navy-700 flex-1 pe-2">{t(type.title, lang)}</h3>
                  <span className="shrink-0 text-xs font-semibold text-gold-600 bg-white/60 px-2 py-0.5 rounded-full border border-white/80">{t(H.same_day,lang)}</span>
                </div>
                <p className="text-xs text-navy-500 leading-relaxed mb-3 line-clamp-2">{t(type.desc, lang)}</p>
                <span className="text-xs text-gold-600 font-semibold group-hover:text-gold-500 transition-colors">{t(cta.learn_more, lang)} →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CORPORATE */}
      <section className="bg-navy-50 py-16 border-t border-navy-100">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <p className="overline-label mb-2">{t({en:'For Corporate & Business Clients',ar:'للشركات وعملاء الأعمال',ru:'Для корпоративных клиентов',zh:'企业及商业客户',es:'Para Clientes Corporativos y Empresariales'}, lang)}</p>
              <h2 className="gold-line font-serif text-2xl font-bold text-navy-900 sm:text-3xl">{t(H.corp_h, lang)}</h2>
              <p className="mt-2 text-navy-500 text-sm">{t(H.corp_s, lang)}</p>
            </div>
            <Link href={`/${lang}/corporate/board-resolution`} className="shrink-0 inline-flex items-center gap-1.5 text-sm font-semibold text-navy-600 hover:text-gold-600 transition-colors border border-navy-200 hover:border-gold-400/40 px-4 py-2 rounded-xl">
              {t(H.all_corp, lang)}
            </Link>
          </div>
          <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {CORP_SERVICES.map((svc, idx) => (
              <Link key={svc.slug} href={`/${lang}/corporate/${svc.slug}`}
                className={`group relative bg-gradient-to-br ${CORP_COLORS[idx % CORP_COLORS.length]} border rounded-2xl p-5 hover:-translate-y-0.5 transition-all duration-200 hover:shadow-lg`}>
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-bold text-navy-900 text-sm leading-snug group-hover:text-navy-700 flex-1 pe-2">
                    {(svc as any)[lang] || svc.en}
                  </h3>
                  <span className="shrink-0 text-xs font-semibold text-navy-500 bg-white/60 px-2 py-0.5 rounded-full border border-white/80">{t(H.same_day,lang)}</span>
                </div>
                <p className="text-xs text-navy-500 leading-relaxed mb-3">
                  {(svc as any)[`desc_${lang}`] || svc.desc_en}
                </p>
                <span className="text-xs text-gold-600 font-semibold group-hover:text-gold-500 transition-colors">{t(cta.learn_more, lang)} →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Attestation */}
      <section className="bg-white py-16 border-t border-navy-100">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <p className="overline-label mb-2">{t({en:'Government & Embassy',ar:'الحكومة والسفارة',ru:'Правительство и посольство',zh:'政府及大使馆',es:'Gobierno y Embajada'}, lang)}</p>
          <h2 className="gold-line font-serif text-2xl font-bold text-navy-900 sm:text-3xl mb-8">{t(H.attest_h, lang)}</h2>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
            {services.attestation.types.map((type) => (
              <Link key={type.slug} href={`/${lang}/attestation/${type.slug}`} className="service-card group">
                <h3 className="font-bold text-navy-900 text-sm mb-2 group-hover:text-navy-700">{t(type.title, lang)}</h3>
                <p className="text-xs text-navy-500 leading-relaxed mb-3">{t(type.desc, lang)}</p>
                <span className="text-xs font-semibold text-gold-600">{t(cta.learn_more, lang)} →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Tenancy */}
      <section className="bg-navy-50 py-16 border-t border-navy-100">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <p className="overline-label mb-2">{t({en:'Tenant & Landlord',ar:'مستأجر ومالك',ru:'Арендатор и арендодатель',zh:'租客及房东',es:'Inquilino y Propietario'}, lang)}</p>
          <h2 className="gold-line font-serif text-2xl font-bold text-navy-900 sm:text-3xl mb-8">{t(H.tenancy_h, lang)}</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link href={`/${lang}/legal-notice/eviction`} className="service-card group">
              <h3 className="font-bold text-navy-900 text-sm mb-2">{t(services.eviction_notice.title, lang)}</h3>
              <p className="text-xs text-navy-500 leading-relaxed mb-3">{t(services.eviction_notice.desc, lang)}</p>
              <span className="text-xs font-semibold text-gold-600">{t(cta.learn_more, lang)} →</span>
            </Link>
            <Link href={`/${lang}/legal-notice`} className="service-card group">
              <h3 className="font-bold text-navy-900 text-sm mb-2">{t(services.legal_notice.title, lang)}</h3>
              <p className="text-xs text-navy-500 leading-relaxed mb-3">{t(services.legal_notice.desc, lang)}</p>
              <span className="text-xs font-semibold text-gold-600">{t(cta.learn_more, lang)} →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Remote */}
      <section className="bg-navy-900 py-16 border-t border-navy-800">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <p className="overline-label mb-2 text-gold-500/70">{t({en:'No Office Visit Required',ar:'بدون زيارة مكتب',ru:'Без визита в офис',zh:'无需到访办公室',es:'Sin Visita Necesaria'}, lang)}</p>
          <h2 className="gold-line font-serif text-2xl font-bold text-white sm:text-3xl mb-8">{t(H.remote_h, lang)}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[services.e_notary, services.legal_translation].map((s) => (
              <Link key={s.slug} href={`/${lang}/${s.slug}`} className="service-card-dark group">
                <h3 className="font-bold text-white text-sm mb-2 group-hover:text-gold-400 transition-colors">{t(s.title, lang)}</h3>
                <p className="text-xs text-navy-400 leading-relaxed mb-3">{t(s.desc, lang)}</p>
                <span className="text-xs font-semibold text-gold-500">{t(cta.learn_more, lang)} →</span>
              </Link>
            ))}
            <Link href={`/${lang}/mobile-notary`} className="service-card-dark group">
              <h3 className="font-bold text-white text-sm mb-2 group-hover:text-gold-400 transition-colors">{t(H.mobile_t, lang)}</h3>
              <p className="text-xs text-navy-400 leading-relaxed">{t(H.mobile_d, lang)}</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="bg-navy-900 py-14 border-t border-navy-800">
        <div className="mx-auto max-w-5xl px-4 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-serif text-2xl font-bold text-white sm:text-3xl">{t(H.how_h, lang)}</h2>
            <p className="mt-2 text-navy-400 text-sm">{t(H.how_s, lang)}</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-5">
            {steps.map((step) => (
              <div key={step.n} className="text-center">
                <div className={`mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl text-lg font-serif font-bold ${step.n===5?'bg-gold-400 text-navy-900':'bg-navy-800 border border-navy-700 text-gold-400'}`}>{step.n}</div>
                <h3 className="font-bold text-white text-xs mb-1">{t(step.title, lang)}</h3>
                <p className="text-xs text-navy-400 leading-relaxed">{t(step.desc, lang)}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <a href={waUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#25D366] text-white font-bold px-8 py-3.5 rounded-xl hover:bg-[#20b958] transition-colors text-sm">{WA_ICON}{t(H.now5, lang)}</a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-navy-50 py-14 border-t border-navy-100">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <div className="text-center mb-10">
            <h2 id="faq-heading" className="gold-line font-serif text-2xl font-bold text-navy-900 sm:text-3xl inline-block">{t(H.faq_h, lang)}</h2>
          </div>
          <FAQSection items={faq.general} lang={lang} />
          <div className="text-center mt-8">
            <Link href={`/${lang}/faq`} className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold-600 hover:text-gold-500">
              {t(H.faq_all, lang)} <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
