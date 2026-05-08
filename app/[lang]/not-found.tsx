import Link from 'next/link'

const LABELS: Record<string, { title: string; desc: string; btn: string }> = {
  en: { title: 'Page Not Found', desc: 'The page you are looking for does not exist.', btn: 'Back to Home' },
  ar: { title: 'الصفحة غير موجودة', desc: 'الصفحة التي تبحث عنها غير موجودة.', btn: 'العودة للرئيسية' },
  ru: { title: 'Страница не найдена', desc: 'Запрашиваемая страница не существует.', btn: 'На главную' },
  zh: { title: '页面未找到', desc: '您要找的页面不存在。', btn: '返回首页' },
  es: { title: 'Página No Encontrada', desc: 'La página que busca no existe.', btn: 'Volver al Inicio' },
}

export default function NotFound() {
  // We can't get lang params in not-found, default to English
  const label = LABELS.en

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-navy-50 text-center px-4">
      <div>
        <div className="text-6xl font-serif font-bold text-gold-500 mb-4">404</div>
        <h1 className="text-2xl font-bold text-navy-900 mb-3">{label.title}</h1>
        <p className="text-navy-500 mb-8">{label.desc}</p>
        <Link
          href="/en"
          className="inline-flex items-center gap-2 bg-navy-900 text-gold-400 font-bold px-8 py-3 rounded-xl hover:bg-navy-800 transition-colors"
        >
          {label.btn}
        </Link>
      </div>
    </div>
  )
}
