#!/usr/bin/env node
/**
 * Curl every legacy URL and assert it returns 301/302/308 (or 200 if kept).
 * Usage:
 *   node scripts/check-redirects.mjs
 *   node scripts/check-redirects.mjs https://your-preview.vercel.app
 */
const BASE = (process.argv[2] ?? 'http://localhost:4321').replace(/\/$/, '')

/** Phase 0 / Phase 5 map: old path → expected final path (or null = keep 200). */
const CHECKS = [
  {from: '/about', expect: '/poios-eimai/'},
  {from: '/about/', expect: '/poios-eimai/'},
  {from: '/case-studies', expect: '/erga/'},
  {from: '/case-studies/', expect: '/erga/'},
  {from: '/case-studies/anything', expect: '/erga/'},
  {from: '/automation-nea-attiki-odos-twitter', expect: '/erga/'},
  {from: '/automation-nea-attiki-odos-twitter/', expect: '/erga/'},
  {from: '/case-study-metaixmio', expect: '/erga/'},
  {from: '/case-study-metaixmio/', expect: '/erga/'},
  {from: '/en/about', expect: '/poios-eimai/'},
  {from: '/en/case-studies/x', expect: '/erga/'},
  // Live redesign routes should be 200
  {from: '/', expect: null},
  {from: '/ypiresies/', expect: null},
  {from: '/pos-doulevo/', expect: null},
  {from: '/erga/', expect: null},
  {from: '/poios-eimai/', expect: null},
  {from: '/epikoinonia/', expect: null},
]

let failed = 0

async function check({from, expect}) {
  const url = `${BASE}${from}`
  try {
    const res = await fetch(url, {redirect: 'manual'})
    const location = res.headers.get('location')
    const status = res.status

    if (expect === null) {
      if (status >= 200 && status < 400) {
        console.log(`OK  ${status} ${from}`)
        return
      }
      console.error(`FAIL ${status} ${from} (expected 2xx/3xx)`)
      failed++
      return
    }

    const okRedirect = status === 301 || status === 302 || status === 307 || status === 308
    const locPath = location ? new URL(location, BASE).pathname : ''
    const matches =
      okRedirect && (locPath === expect || locPath === expect.replace(/\/$/, '') || location?.endsWith(expect))

    if (matches) {
      console.log(`OK  ${status} ${from} → ${locPath}`)
      return
    }

    console.error(`FAIL ${status} ${from} → ${location ?? '(no location)'} (expected ${expect})`)
    failed++
  } catch (error) {
    console.error(`FAIL ${from}: ${error instanceof Error ? error.message : error}`)
    failed++
  }
}

console.log(`Checking redirects against ${BASE}\n`)
for (const row of CHECKS) await check(row)
console.log(failed ? `\n${failed} check(s) failed` : '\nAll checks passed')
process.exit(failed ? 1 : 0)
