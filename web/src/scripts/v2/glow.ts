/** Pointer-following glow inside `.svc-card`, via the `--mx` / `--my` vars. */
type Cleanup = () => void

let cleanup: Cleanup | null = null

function initGlow() {
  cleanup?.()

  if (!window.matchMedia('(pointer: fine)').matches) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const handlers: Array<{el: HTMLElement; move: (e: PointerEvent) => void}> = []

  document.querySelectorAll<HTMLElement>('.svc-card').forEach((el) => {
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      el.style.setProperty('--mx', `${e.clientX - r.left}px`)
      el.style.setProperty('--my', `${e.clientY - r.top}px`)
    }

    el.addEventListener('pointermove', move)
    handlers.push({el, move})
  })

  cleanup = () => {
    handlers.forEach(({el, move}) => {
      el.removeEventListener('pointermove', move)
      el.style.removeProperty('--mx')
      el.style.removeProperty('--my')
    })
    cleanup = null
  }
}

document.addEventListener('astro:page-load', initGlow)
document.addEventListener('astro:before-swap', () => cleanup?.())

export {}
