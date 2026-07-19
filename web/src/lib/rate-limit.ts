type RateLimitEntry = {
  count: number
  resetAt: number
}

// Per-instance only — resets on cold start; acceptable for low-traffic sites.
const buckets = new Map<string, RateLimitEntry>()

/** Returns true if the request is within the limit, false if rate limited. */
export function checkRateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now()
  let entry = buckets.get(key)

  if (!entry || now >= entry.resetAt) {
    entry = {count: 0, resetAt: now + windowMs}
    buckets.set(key, entry)
  }

  entry.count += 1
  return entry.count <= limit
}
