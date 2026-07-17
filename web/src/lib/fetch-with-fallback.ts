export async function fetchWithFallback<T>(
  fetcher: () => Promise<T>,
  fallback: T,
  label?: string,
): Promise<T> {
  try {
    return await fetcher()
  } catch (error) {
    if (import.meta.env.DEV && label) {
      console.warn(`[sanity] ${label} fetch failed, using fallback.`, error)
    }
    return fallback
  }
}
