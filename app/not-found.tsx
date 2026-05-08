'use client'
import { usePathname } from 'next/navigation'

const T = {
  en: { h: 'Page Not Found', p: 'The page you are looking for does not exist.', btn: 'Back to Home' },
  ar: { h: 'الصفحة غير موجودة', p: 'الصفحة التي تبحث عنها غير موجودة.', btn: 'العودة للرئيسية' },
  ru: { h: 'Страница не найдена', p: 'Запрашиваемая страница не существует.', btn: 'На главную' },
  zh: { h: '页面未找到', p: '您查找的页面不存在。', btn: '返回主页' },
  es: { h: 'Página no encontrada', p: 'La página que busca no existe.', btn: 'Volver al inicio' },
}

export default function NotFound() {
  const pathname = usePathname()
  const lang = (pathname?.split('/')[1] as keyof typeof T) || 'en'
  const tx = T[lang] || T.en
  const homeHref = `/${lang in T ? lang : 'en'}`
  const isRTL = lang === 'ar'

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} style={{ minHeight:'100vh', background:'#0a1628', color:'white', display:'flex', alignItems:'center', justifyContent:'center', textAlign:'center', fontFamily:'system-ui, sans-serif' }}>
      <div>
        <div style={{ fontSize:'4rem', fontWeight:700, color:'#d4b43a', marginBottom:'1rem' }}>404</div>
        <h1 style={{ fontSize:'1.5rem', marginBottom:'0.5rem' }}>{tx.h}</h1>
        <p style={{ color:'#6b93b5', marginBottom:'2rem' }}>{tx.p}</p>
        <a href={homeHref} style={{ background:'#d4b43a', color:'#0a1628', padding:'0.75rem 2rem', borderRadius:'0.75rem', fontWeight:700, textDecoration:'none' }}>
          {tx.btn}
        </a>
      </div>
    </div>
  )
}
