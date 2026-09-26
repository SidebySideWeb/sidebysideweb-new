/** 3D tilt on `.tilt` surfaces, used by the case card art. */
type TiltEl = HTMLElement & {_tilt?: 1}

type Cleanup = () => void

let cleanup: Cleanup | null = null

function prefersFinePointer() {
  return window.matchMedia('(pointer: fine)').matches
}

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function initTilt() {
  cleanup?.()

  if (!prefersFinePointer() || prefersReducedMotion()) return

  const handlers: Array<{el: TiltEl; move: (e: PointerEvent) => void; leave: () => void}> = []

  document.querySelectorAll<TiltEl>('.tilt').forEach((el) => {
    if (el._tilt) return
    el._tilt = 1

    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      const x = (e.clientX - r.left) / r.width - 0.5
      const y = (e.clientY - r.top) / r.height - 0.5
      el.style.transform = `rotateY(${x * 10}deg) rotateX(${-y * 10}deg) scale(1.02)`
    }

    const leave = () => {
      el.style.transform = ''
    }

    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', leave)
    handlers.push({el, move, leave})
  })

  cleanup = () => {
    handlers.forEach(({el, move, leave}) => {
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerleave', leave)
      delete el._tilt
      el.style.transform = ''
    })
    cleanup = null
  }
}

document.addEventListener('astro:page-load', initTilt)
document.addEventListener('astro:before-swap', () => cleanup?.())

export {}
