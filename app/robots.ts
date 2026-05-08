import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
      { userAgent: 'Googlebot', allow: '/' },
      { userAgent: 'Bingbot',   allow: '/' },
      // Block AI training scrapers from using our unique UAE legal content
      { userAgent: 'GPTBot',        disallow: ['/'] },
      { userAgent: 'Google-Extended', disallow: ['/'] },
      { userAgent: 'CCBot',         disallow: ['/'] },
      { userAgent: 'anthropic-ai',  disallow: ['/'] },
      { userAgent: 'Claude-Web',    disallow: ['/'] },
    ],
    sitemap: 'https://www.enotarydubai.ae/sitemap.xml',
    host: 'https://www.enotarydubai.ae',
  }
}
