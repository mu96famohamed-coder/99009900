import { NextResponse, type NextRequest } from 'next/server'

// ─────────────────────────────────────────────────────────────────────────────
// E-Notary Dubai — Edge Middleware
//
// Responsibilities:
//   1. Rate limiting — block aggressive scrapers / content-harvesters
//   2. Bot user-agent filtering — block known scraping tools at the door
//   3. Defense-in-depth path blocking for /data/* and config-like paths
//   4. Pass-through for legitimate traffic (SEO bots explicitly allowed)
//
// Runs on Vercel's Edge runtime (very fast, very cheap, global).
// ─────────────────────────────────────────────────────────────────────────────

// ── Rate limiter (in-memory, per edge instance) ─────────────────────────────
// Note: Vercel's edge is distributed, so this is a per-POP limiter. It's
// intentionally generous — enough to let real users browse freely but to
// catch scrapers hammering one POP. For global strict limits, upgrade to
// Upstash Redis later; this is a strong baseline with zero infra cost.

interface RateRecord {
  count: number
  resetAt: number
}

const RATE_WINDOW_MS = 60_000 // 1 minute
const RATE_MAX_REQUESTS = 120 // 120 req/min per IP = 2 req/sec sustained
const rateStore = new Map<string, RateRecord>()

// Cleanup old records every ~500 requests to prevent memory bloat
let cleanupCounter = 0
function maybeCleanup(now: number) {
  cleanupCounter++
  if (cleanupCounter < 500) return
  cleanupCounter = 0
  for (const [key, rec] of rateStore.entries()) {
    if (rec.resetAt < now) rateStore.delete(key)
  }
}

function getClientIp(req: NextRequest): string {
  // Vercel sets x-forwarded-for; first IP is the real client
  const fwd = req.headers.get('x-forwarded-for')
  if (fwd) return fwd.split(',')[0].trim()
  const real = req.headers.get('x-real-ip')
  if (real) return real
  return 'unknown'
}

function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now()
  maybeCleanup(now)
  const rec = rateStore.get(ip)
  if (!rec || rec.resetAt < now) {
    rateStore.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS })
    return { allowed: true, remaining: RATE_MAX_REQUESTS - 1 }
  }
  rec.count++
  if (rec.count > RATE_MAX_REQUESTS) {
    return { allowed: false, remaining: 0 }
  }
  return { allowed: true, remaining: RATE_MAX_REQUESTS - rec.count }
}

// ── Bot filter ───────────────────────────────────────────────────────────────
// Deny-list of known scraping/harvesting tools. We allow legitimate SEO bots
// (Googlebot, Bingbot, etc) because they're essential for ranking.

const BLOCKED_UA_PATTERNS = [
  /scrapy/i,
  /httrack/i,
  /wget/i,
  /curl/i,
  /python-requests/i,
  /python-urllib/i,
  /go-http-client/i,
  /java\//i,
  /okhttp/i,
  /libwww-perl/i,
  /phantomjs/i,
  /headlesschrome/i,
  /puppeteer/i,
  /playwright/i,
  /selenium/i,
  /ahrefsbot/i,
  /semrushbot/i,
  /mj12bot/i,
  /dotbot/i,
  /petalbot/i,
  /blexbot/i,
  /seznambot/i,
  /serpstatbot/i,
]

// Explicitly allowed bots (whitelist wins over any match above)
const ALLOWED_UA_PATTERNS = [
  /googlebot/i,
  /bingbot/i,
  /slurp/i, // Yahoo
  /duckduckbot/i,
  /baiduspider/i,
  /yandex/i,
  /facebookexternalhit/i,
  /twitterbot/i,
  /linkedinbot/i,
  /whatsapp/i,
  /telegrambot/i,
  /applebot/i,
]

function isBlockedBot(userAgent: string): boolean {
  if (!userAgent) return false
  if (ALLOWED_UA_PATTERNS.some((re) => re.test(userAgent))) return false
  return BLOCKED_UA_PATTERNS.some((re) => re.test(userAgent))
}

// ── Path firewall ────────────────────────────────────────────────────────────
// Explicitly reject any request that tries to reach source data or config.
// These paths don't exist on the server, but rejecting them at the edge
// gives a cleaner signal and prevents reconnaissance.

const BLOCKED_PATH_PATTERNS = [
  /^\/data(\/|$)/i,
  /^\/lib(\/|$)/i,
  /^\/\.env/i,
  /^\/\.git/i,
  /^\/package\.json$/i,
  /^\/next\.config/i,
  /^\/tsconfig/i,
  /\.map$/i, // block any .map file access attempt
]

function isBlockedPath(pathname: string): boolean {
  return BLOCKED_PATH_PATTERNS.some((re) => re.test(pathname))
}

// ── Main middleware ──────────────────────────────────────────────────────────

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // 1. Path firewall — immediate 404 for sensitive paths
  if (isBlockedPath(pathname)) {
    return new NextResponse('Not Found', { status: 404 })
  }

  // 2. Bot filter — block known scrapers
  const ua = req.headers.get('user-agent') || ''
  if (isBlockedBot(ua)) {
    return new NextResponse('Forbidden', { status: 403 })
  }

  // 3. Rate limiting
  const ip = getClientIp(req)
  const { allowed, remaining } = checkRateLimit(ip)
  if (!allowed) {
    return new NextResponse('Too Many Requests', {
      status: 429,
      headers: {
        'Retry-After': '60',
        'X-RateLimit-Limit': String(RATE_MAX_REQUESTS),
        'X-RateLimit-Remaining': '0',
      },
    })
  }

  // Pass through with rate-limit info
  const res = NextResponse.next()
  res.headers.set('X-RateLimit-Limit', String(RATE_MAX_REQUESTS))
  res.headers.set('X-RateLimit-Remaining', String(remaining))
  return res
}

// Matcher: run middleware on everything EXCEPT:
//   - Next.js internals (_next/*)
//   - static assets folder
//   - favicon, robots, sitemap
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|assets|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
}
