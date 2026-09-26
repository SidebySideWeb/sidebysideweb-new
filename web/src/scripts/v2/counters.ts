/** Counts `[data-count]` elements up from zero the first time they scroll in. */
type Cleanup = () => void

const DURATION = 1400

let cleanup: Cleanup | null = null

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function initCounters() {
  cleanup?.()

  const targets = document.querySelectorAll<HTMLElement>('[data-count]')
  if (!targets.length) return
  if (prefersReducedMotion()) return

  const frames = new Set<number>()

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        observer.unobserve(entry.target)

        const el = entry.target as HTMLElement
        const end = Number(el.dataset.count)
        if (!Number.isFinite(end) || end === 0) continue

        const start = performance.now()
        const step = (now: number) => {
          const p = Math.min(1, (now - start) / DURATION)
          el.textContent = String(Math.round(end * (1 - Math.pow(1 - p, 3))))
          if (p < 1) frames.add(requestAnimationFrame(step))
        }
        frames.add(requestAnimationFrame(step))
      }
    },
    {threshold: 0.6},
  )

  targets.forEach((el) => observer.observe(el))

  cleanup = () => {
    observer.disconnect()
    frames.forEach((id) => cancelAnimationFrame(id))
    frames.clear()
    cleanup = null
  }
}

document.addEventListener('astro:page-load', initCounters)
document.addEventListener('astro:before-swap', () => cleanup?.())

export {}
