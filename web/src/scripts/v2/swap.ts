/** Cycles the marigold word in the hero line with a glyph scramble. */
type Cleanup = () => void

const GLYPHS = 'ΑΒΓΔΕΖΘΛΞΠΣΦΨΩ#%&/∥01'
const INTERVAL = 2600
const TICK = 40

let cleanup: Cleanup | null = null

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function readWords(el: HTMLElement): string[] {
  try {
    const parsed = JSON.parse(el.dataset.words ?? '[]')
    return Array.isArray(parsed) ? parsed.filter((word) => typeof word === 'string') : []
  } catch {
    return []
  }
}

function initSwap() {
  cleanup?.()

  const el = document.getElementById('swap')
  if (!el) return

  const words = readWords(el)
  if (words.length < 2) return

  const reduced = prefersReducedMotion()
  let index = 0
  let scrambleTimer = 0

  const scramble = (to: string) => {
    if (reduced) {
      el.textContent = to
      return
    }

    const from = el.textContent ?? ''
    const len = Math.max(from.length, to.length)
    let frame = 0

    window.clearInterval(scrambleTimer)
    scrambleTimer = window.setInterval(() => {
      let out = ''
      for (let i = 0; i < len; i++) {
        if (i < frame / 2) out += to[i] ?? ''
        else if (i < to.length) out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
      }
      el.textContent = out
      if (++frame > len * 2 + 2) {
        window.clearInterval(scrambleTimer)
        scrambleTimer = 0
        el.textContent = to
      }
    }, TICK)
  }

  const cycle = window.setInterval(() => {
    index = (index + 1) % words.length
    scramble(words[index])
  }, INTERVAL)

  cleanup = () => {
    window.clearInterval(cycle)
    window.clearInterval(scrambleTimer)
    scrambleTimer = 0
    cleanup = null
  }
}

document.addEventListener('astro:page-load', initSwap)
document.addEventListener('astro:before-swap', () => cleanup?.())

export {}
