import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'edge'

export async function POST(req: NextRequest) {
  try {
    const { texts, targetLang } = await req.json()

    if (!texts || !targetLang || !Array.isArray(texts)) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
    }

    const langNames: Record<string, string> = {
      ru: 'Russian',
      zh: 'Simplified Chinese',
      es: 'Spanish (Latin American)',
    }

    const langName = langNames[targetLang]
    if (!langName) return NextResponse.json({ translations: texts })

    const prompt = `You are a professional legal translator for UAE notary services in Dubai.
Translate these texts to ${langName}. Keep legal terms accurate. Keep short phrases short.

Texts (JSON array):
${JSON.stringify(texts)}

Respond ONLY with a JSON array of translations in the same order. No explanation, no markdown.`

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'anthropic-version': '2023-06-01',
        'x-api-key': process.env.ANTHROPIC_API_KEY || '',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 2000,
        messages: [{ role: 'user', content: prompt }],
      }),
    })

    const data = await response.json()
    let text = data.content?.[0]?.text?.trim() || '[]'
    if (text.startsWith('```')) {
      text = text.split('\n').slice(1).join('\n').split('```')[0]
    }

    const translations = JSON.parse(text)
    return NextResponse.json({ translations })
  } catch (e) {
    return NextResponse.json({ error: 'Translation failed' }, { status: 500 })
  }
}
