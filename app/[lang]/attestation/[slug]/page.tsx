import { redirect } from 'next/navigation'

export const metadata = {
  robots: { index: false, follow: false },
}
export default async function Page({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang } = await params
  redirect(`/${lang}/`)
}
export async function generateStaticParams() {
  return ['en','ar'].flatMap(lang =>
    ['mofa','embassy','degree','marriage'].map(slug => ({ lang, slug }))
  )
}
