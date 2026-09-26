type MagEl = HTMLElement & {_mag?: 1}

type Cleanup = () => void

let cleanup: Cleanup | null = null

function prefersFinePointer() {
  return window.matchMedia('(pointer: fine)').matches
}

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function initMagnetic() {
  cleanup?.()

  if (!prefersFinePointer() || prefersReducedMotion()) return

  const handlers: Array<{el: MagEl; move: (e: PointerEvent) => void; leave: () => void}> = []

  document.querySelectorAll<MagEl>('.mag').forEach((el) => {
    if (el._mag) return
    el._mag = 1

    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.25}px,${(e.clientY - r.top - r.height / 2) * 0.35}px)`
    }

    const leave = () => {
      el.style.transition = 'transform .5s var(--ease)'
      el.style.transform = ''
      window.setTimeout(() => {
        el.style.transition = ''
      }, 500)
    }

    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', leave)
    handlers.push({el, move, leave})
  })

  cleanup = () => {
    handlers.forEach(({el, move, leave}) => {
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerleave', leave)
      delete el._mag
      el.style.transform = ''
      el.style.transition = ''
    })
    cleanup = null
  }
}

document.addEventListener('astro:page-load', initMagnetic)
document.addEventListener('astro:before-swap', () => cleanup?.())
