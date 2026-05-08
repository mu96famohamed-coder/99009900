import type { Metadata } from 'next'
import { LANGS, type Lang, t, site, HREFLANG_MAP } from '@/lib/i18n'

import { LegalServiceSchema } from '@/components/SchemaMarkup'
interface Props { params: Promise<{ lang: Lang }> }
export async function generateStaticParams() { return LANGS.map((l) => ({ lang: l })) }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  const titles: Record<string, string> = {
    en: 'Contact E-Notary Dubai — WhatsApp, Email & Office',
    ar: 'تواصل مع E-Notary Dubai دبي — واتساب، بريد، مكتب',
    ru: 'Контакты E-Notary Dubai Дубай — WhatsApp, Email и офис',
    zh: '联系E-Notary Dubai迪拜——WhatsApp、电子邮件和办公室',
    es: 'Contactar E-Notary Dubai Dubái — WhatsApp, Email y Oficina',
  }
  return {
    title: titles[lang] || titles.en,
    description: ({
      en: 'Contact E-Notary Dubai for POA, MOFA attestation, eviction notices and notary support. Reply in 5 minutes via WhatsApp.',
      ar: 'تواصل مع E-Notary Dubai للوكالات وتصديق الخارجية وإشعارات الإخلاء. رد خلال 5 دقائق عبر واتساب.',
      ru: 'Свяжитесь с E-Notary Dubai по доверенностям, легализации, выселению. Ответ за 5 минут в WhatsApp.',
      zh: '联系E-Notary Dubai了解授权书、外交部认证和驱逐通知。5分钟内WhatsApp回复。',
      es: 'Contacte E-Notary Dubai para POA, MOFA, desalojo y soporte notarial. Respuesta en 5 min por WhatsApp.',
    } as Record<string,string>)[lang] || 'Contact E-Notary Dubai for notary support.',
    alternates: { canonical: `https://www.enotarydubai.ae/${lang}/contact/`,
      'x-default': `https://www.enotarydubai.ae/en/contact/`,
      languages: Object.fromEntries(LANGS.map((l) => [HREFLANG_MAP[l], `https://www.enotarydubai.ae/${l}/contact/`]))
    },
  }
}

const L = {
  h1:    { en: 'Contact Us', ar: 'تواصل معنا', ru: 'Свяжитесь с нами', zh: '联系我们', es: 'Contáctenos' },
  sub:   { en: 'We reply within 5 minutes via WhatsApp — 7 days a week.', ar: 'نرد خلال 5 دقائق عبر واتساب — 7 أيام في الأسبوع.', ru: 'Отвечаем в течение 5 минут через WhatsApp — 7 дней в неделю.', zh: '我们每周7天在5分钟内通过WhatsApp回复。', es: 'Respondemos en 5 minutos por WhatsApp — 7 días a la semana.' },
  wa_h:  { en: 'WhatsApp — Fastest', ar: 'واتساب — الأسرع', ru: 'WhatsApp — Быстрее всего', zh: 'WhatsApp——最快', es: 'WhatsApp — Lo más rápido' },
  wa_p:  { en: 'Send us your document type and we reply with exact cost and timeline within 5 minutes.', ar: 'أرسل لنا نوع وثيقتك وسنرد بالتكلفة الدقيقة والمدة الزمنية خلال 5 دقائق.', ru: 'Сообщите тип документа — ответим с точной стоимостью и сроками за 5 минут.', zh: '告诉我们您的文件类型，我们将在5分钟内回复确切费用和时间。', es: 'Envíenos el tipo de documento y le responderemos con el costo exacto y el plazo en 5 minutos.' },
  wa_btn:{ en: 'Open WhatsApp', ar: 'فتح واتساب', ru: 'Открыть WhatsApp', zh: '打开WhatsApp', es: 'Abrir WhatsApp' },
  ph_h:  { en: 'Phone', ar: 'الهاتف', ru: 'Телефон', zh: '电话', es: 'Teléfono' },
  em_h:  { en: 'Email', ar: 'البريد الإلكتروني', ru: 'Эл. почта', zh: '电子邮件', es: 'Correo Electrónico' },
  em_p:  { en: 'For documents and formal inquiries.', ar: 'للوثائق والاستفسارات الرسمية.', ru: 'Для документов и официальных запросов.', zh: '用于文件和正式查询。', es: 'Para documentos e consultas formales.' },
  of_h:  { en: 'Office', ar: 'المكتب', ru: 'Офис', zh: '办公室', es: 'Oficina' },
  of_p:  { en: 'Business Bay, Dubai, UAE', ar: 'الخليج التجاري، دبي، الإمارات', ru: 'Бизнес-Бей, Дубай, ОАЭ', zh: '迪拜商业湾，阿联酋', es: 'Business Bay, Dubái, EAU' },
  hrs_h: { en: 'Office Hours', ar: 'أوقات العمل', ru: 'Часы работы', zh: '办公时间', es: 'Horario de Oficina' },
  map_h: { en: 'Find Us', ar: 'موقعنا', ru: 'Наше расположение', zh: '找到我们', es: 'Encuéntrenos' },
  form_h:{ en: 'Send a Message', ar: 'أرسل رسالة', ru: 'Отправить сообщение', zh: '发送消息', es: 'Enviar un Mensaje' },
  form_name: { en: 'Your Name', ar: 'اسمك', ru: 'Ваше имя', zh: '您的姓名', es: 'Su Nombre' },
  form_service: { en: 'Service Needed', ar: 'الخدمة المطلوبة', ru: 'Нужная услуга', zh: '所需服务', es: 'Servicio Necesario' },
  form_msg: { en: 'Your Message', ar: 'رسالتك', ru: 'Ваше сообщение', zh: '您的消息', es: 'Su Mensaje' },
  form_send: { en: 'Send via WhatsApp', ar: 'أرسل عبر واتساب', ru: 'Отправить через WhatsApp', zh: '通过WhatsApp发送', es: 'Enviar por WhatsApp' },
  note:  { en: 'Note: WhatsApp is the fastest way to reach us. Your message will open WhatsApp directly.', ar: 'ملاحظة: واتساب هو أسرع طريقة للتواصل معنا. ستُفتح المحادثة مباشرة.', ru: 'Примечание: WhatsApp — самый быстрый способ связи. Сообщение откроет WhatsApp напрямую.', zh: '注意：WhatsApp是联系我们最快的方式。您的消息将直接打开WhatsApp。', es: 'Nota: WhatsApp es la forma más rápida de contactarnos. Su mensaje abrirá WhatsApp directamente.' },
}

const WA_ICON = <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884"/></svg>

const SERVICES = [
  'Power of Attorney (POA)', 'MOFA Attestation', 'Eviction Notice',
  'Legal Notice', 'Legal Translation', 'E-Notary', 'Apostille',
  'Affidavit', 'Corporate Documents', 'Other',
]

export default async function Page({ params }: Props) {
  const { lang } = await params
  const waBase = `https://wa.me/${site.phone.replace(/\D/g,'')}`
  const waUrl = `${waBase}?text=${encodeURIComponent('Hello E-Notary Dubai, I need assistance with: ')}`

  return (
    <div className="bg-white">
      <LegalServiceSchema lang={lang} path="/contact" />
      {/* Hero */}
      <div className="hero-bg py-14">
        <div className="mx-auto max-w-4xl px-4 lg:px-8 text-center">
          <h1 className="font-serif text-4xl font-bold text-white mb-3">{t(L.h1, lang)}</h1>
          <p className="text-navy-300 text-lg">{t(L.sub, lang)}</p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 lg:px-8 py-14">
        <div className="grid gap-8 lg:grid-cols-2">

          {/* Left: Contact cards + Form */}
          <div className="space-y-6">

            {/* WhatsApp - PRIMARY */}
            <div className="rounded-2xl bg-[#25D366]/10 border-2 border-[#25D366]/30 p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#25D366] flex items-center justify-center text-white">
                  {WA_ICON}
                </div>
                <div>
                  <h2 className="font-bold text-navy-900 text-base">{t(L.wa_h, lang)}</h2>
                  <p className="text-xs text-navy-500">{t({ en: 'Reply in 5 minutes · 7 days a week', ar: 'رد في 5 دقائق · 7 أيام في الأسبوع', ru: 'Ответ за 5 минут · 7 дней в неделю', zh: '5分钟内回复·每周7天', es: 'Respuesta en 5 min · 7 días a la semana' }, lang)}</p>
                </div>
              </div>
              <p className="text-sm text-navy-600 mb-4">{t(L.wa_p, lang)}</p>
              <a href={waUrl} target="_blank" rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 bg-[#25D366] text-white font-bold px-6 py-3 rounded-xl hover:bg-[#20b958] transition-colors text-sm">
                {WA_ICON} {t(L.wa_btn, lang)} — {site.phone_display}
              </a>
            </div>

            {/* Phone + Email */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-navy-100 bg-navy-50 p-5">
                <h3 className="font-bold text-navy-900 text-sm mb-2 flex items-center gap-2">
                  <svg className="w-4 h-4 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 7V5z" /></svg>
                  {t(L.ph_h, lang)}
                </h3>
                <a href={`tel:${site.phone}`} className="text-navy-800 font-semibold text-sm hover:text-gold-600 transition-colors block">{site.phone_display}</a>
                <p className="text-xs text-navy-400 mt-1">{t({ en: 'Call or WhatsApp', ar: 'اتصال أو واتساب', ru: 'Звонок или WhatsApp', zh: '致电或WhatsApp', es: 'Llamar o WhatsApp' }, lang)}</p>
              </div>

              <div className="rounded-2xl border border-navy-100 bg-navy-50 p-5">
                <h3 className="font-bold text-navy-900 text-sm mb-2 flex items-center gap-2">
                  <svg className="w-4 h-4 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  {t(L.em_h, lang)}
                </h3>
                <a href={`mailto:${site.email}`} className="text-navy-800 font-semibold text-sm hover:text-gold-600 transition-colors block break-all">{site.email}</a>
                <p className="text-xs text-navy-400 mt-1">{t(L.em_p, lang)}</p>
              </div>
            </div>

            {/* Office + Hours */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-navy-100 bg-navy-50 p-5">
                <h3 className="font-bold text-navy-900 text-sm mb-2 flex items-center gap-2">
                  <svg className="w-4 h-4 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  {t(L.of_h, lang)}
                </h3>
                <p className="text-sm text-navy-700 font-semibold">{t(L.of_p, lang)}</p>
                <p className="text-xs text-navy-400 mt-1">{t({ en: 'Visits by appointment only', ar: 'الزيارات بموعد مسبق فقط', ru: 'Визиты только по записи', zh: '仅限预约参观', es: 'Visitas solo con cita previa' }, lang)}</p>
              </div>

              <div className="rounded-2xl border border-navy-100 bg-navy-50 p-5">
                <h3 className="font-bold text-navy-900 text-sm mb-3 flex items-center gap-2">
                  <svg className="w-4 h-4 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  {t(L.hrs_h, lang)}
                </h3>
                <div className="space-y-1 text-xs text-navy-600">
                  <div className="flex justify-between"><span>{t({ en: 'Sun–Thu', ar: 'أح–خم', ru: 'Вс–Чт', zh: '周日–周四', es: 'Dom–Jue' }, lang)}</span><span className="font-semibold">9 AM – 6 PM</span></div>
                  <div className="flex justify-between"><span>{t({ en: 'Saturday', ar: 'السبت', ru: 'Суббота', zh: '周六', es: 'Sábado' }, lang)}</span><span className="font-semibold">10 AM – 3 PM</span></div>
                  <div className="flex justify-between text-[#25D366]"><span>WhatsApp</span><span className="font-semibold">{t({ en: '7 days / 24h', ar: '7 أيام / 24 ساعة', ru: '7 дней / 24ч', zh: '7天/24小时', es: '7 días / 24h' }, lang)}</span></div>
                </div>
              </div>
            </div>

            {/* WhatsApp message form */}
            <div className="rounded-2xl border border-navy-100 p-6">
              <h2 className="font-serif text-lg font-bold text-navy-900 mb-4">{t(L.form_h, lang)}</h2>
              <form
                onSubmit={undefined}
                action="#"
                className="space-y-4"
              >
                <div>
                  <label className="block text-xs font-semibold text-navy-600 mb-1.5">{t(L.form_name, lang)}</label>
                  <input
                    type="text"
                    name="name"
                    placeholder={t({ en: 'Enter your name', ar: 'أدخل اسمك', ru: 'Введите имя', zh: '输入您的姓名', es: 'Ingrese su nombre' }, lang)}
                    className="w-full rounded-xl border border-navy-200 px-4 py-2.5 text-sm focus:border-gold-400 focus:outline-none focus:ring-1 focus:ring-gold-400 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-navy-600 mb-1.5">{t(L.form_service, lang)}</label>
                  <select
                    name="service"
                    className="w-full rounded-xl border border-navy-200 px-4 py-2.5 text-sm focus:border-gold-400 focus:outline-none focus:ring-1 focus:ring-gold-400 bg-white"
                  >
                    <option value="">{t({ en: 'Select a service', ar: 'اختر خدمة', ru: 'Выберите услугу', zh: '选择服务', es: 'Seleccione un servicio' }, lang)}</option>
                    {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-navy-600 mb-1.5">{t(L.form_msg, lang)}</label>
                  <textarea
                    name="message"
                    rows={3}
                    placeholder={t({ en: 'Describe what you need...', ar: 'اشرح ما تحتاجه...', ru: 'Опишите, что вам нужно...', zh: '描述您的需求...', es: 'Describa lo que necesita...' }, lang)}
                    className="w-full rounded-xl border border-navy-200 px-4 py-2.5 text-sm focus:border-gold-400 focus:outline-none focus:ring-1 focus:ring-gold-400 bg-white resize-none"
                  />
                </div>
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 bg-[#25D366] text-white font-bold px-6 py-3 rounded-xl hover:bg-[#20b958] transition-colors text-sm"
                >
                  {WA_ICON} {t(L.form_send, lang)}
                </a>
                <p className="text-[11px] text-navy-400 text-center">{t(L.note, lang)}</p>
              </form>
            </div>

          </div>

          {/* Right: Google Map + Authority logos */}
          <div className="space-y-6">

            {/* Google Maps embed */}
            <div className="rounded-2xl overflow-hidden border border-navy-100 shadow-sm">
              <div className="bg-navy-50 px-4 py-3 border-b border-navy-100 flex items-center gap-2">
                <svg className="w-4 h-4 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                <span className="text-sm font-semibold text-navy-700">{t(L.map_h, lang)} — Business Bay, Dubai</span>
              </div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.1786773816!2d55.26560557600635!3d25.18551943105!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f682f75a18565%3A0x4d8f0c741d5a9a2!2sBusiness%20Bay%2C%20Dubai%20-%20Dubai!5e0!3m2!1sen!2sae!4v1710000000000!5m2!1sen!2sae"
                width="100%"
                height="320"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="E-Notary Dubai - Business Bay"
              />
              <div className="px-4 py-3 bg-white">
                <a
                  href="https://maps.google.com/?q=Business+Bay+Dubai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-gold-600 hover:text-gold-600 font-semibold flex items-center gap-1"
                >
                  {t({ en: 'Open in Google Maps →', ar: 'افتح في خرائط جوجل ←', ru: 'Открыть в Google Maps →', zh: '在谷歌地图中打开 →', es: 'Abrir en Google Maps →' }, lang)}
                </a>
              </div>
            </div>

            {/* Authority logos */}
            <div className="rounded-2xl border border-navy-100 bg-navy-50 p-6">
              <h3 className="text-xs font-bold text-navy-400 uppercase tracking-widest mb-4">
                {t({ en: 'Accepted by All UAE Government Entities', ar: 'مقبول لدى جميع الجهات الحكومية الإماراتية', ru: 'Принимается всеми органами ОАЭ', zh: '所有阿联酋政府机构接受', es: 'Aceptado por todas las autoridades de los EAU' }, lang)}
              </h3>
              <div className="grid grid-cols-4 gap-4">
                {[
                  { src: '/assets/logos/dubai_courts.png', name: 'Dubai Courts' },
                  { src: '/assets/logos/dld.png', name: 'DLD' },
                  { src: '/assets/logos/rta.png', name: 'RTA' },
                  { src: '/assets/logos/mofa.png', name: 'MOFA' },
                  { src: '/assets/logos/mohre.png', name: 'MOHRE' },
                  { src: '/assets/logos/moj.png', name: 'MOJ' },
                  { src: '/assets/logos/rdc.png', name: 'RDC' },
                ].map((logo) => (
                  <div key={logo.name} className="flex flex-col items-center gap-1.5 p-3 bg-white rounded-xl border border-navy-100">
                    <img src={logo.src} alt={logo.name} className="h-8 w-auto object-contain" />
                    <span className="text-[10px] text-navy-500 font-semibold text-center">{logo.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick stats */}
            <div className="rounded-2xl bg-navy-900 p-6">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { num: '500+', label: { en: 'Documents Notarized', ar: 'وثيقة موثقة', ru: 'Документов заверено', zh: '份文件已公证', es: 'Documentos Notarizados' } },
                  { num: '100%', label: { en: 'First-Time Accepted', ar: 'مقبولة من الأولى', ru: 'Принято с первого раза', zh: '一次性接受', es: 'Aceptados a la Primera' } },
                  { num: '5 min', label: { en: 'WhatsApp Reply', ar: 'رد واتساب', ru: 'Ответ WhatsApp', zh: 'WhatsApp回复', es: 'Respuesta WhatsApp' } },
                  { num: '7/7', label: { en: 'Days Available', ar: 'أيام في الأسبوع', ru: 'Дней в неделю', zh: '天可用', es: 'Días Disponible' } },
                ].map((stat) => (
                  <div key={stat.num} className="text-center p-3 rounded-xl bg-navy-800">
                    <div className="font-serif text-2xl font-bold text-gold-400">{stat.num}</div>
                    <div className="text-xs text-navy-400 mt-1">{t(stat.label, lang)}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
