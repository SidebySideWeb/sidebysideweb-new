type Cleanup = () => void

let cleanup: Cleanup | null = null
let raf = 0

function prefersFinePointer() {
  return window.matchMedia('(pointer: fine)').matches
}

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function initCursor() {
  cleanup?.()

  const ring = document.querySelector<HTMLElement>('.cur-ring')
  const dot = document.querySelector<HTMLElement>('.cur')
  if (!ring || !dot) return
  if (!prefersFinePointer() || prefersReducedMotion()) return

  let cx = -100
  let cy = -100
  let rx = -100
  let ry = -100

  const onMove = (e: PointerEvent) => {
    cx = e.clientX
    cy = e.clientY
    dot.style.transform = `translate(${cx}px,${cy}px)`
  }

  const onOver = (e: PointerEvent) => {
    const t = e.target as Element | null
    ring.classList.toggle('big', !!t?.closest('a,button,label,summary'))
  }

  const tick = () => {
    rx += (cx - rx) * 0.18
    ry += (cy - ry) * 0.18
    ring.style.transform = `translate(${rx}px,${ry}px)`
    raf = requestAnimationFrame(tick)
  }

  window.addEventListener('pointermove', onMove)
  document.addEventListener('pointerover', onOver)
  raf = requestAnimationFrame(tick)

  cleanup = () => {
    window.removeEventListener('pointermove', onMove)
    document.removeEventListener('pointerover', onOver)
    cancelAnimationFrame(raf)
    raf = 0
    ring.classList.remove('big')
    cleanup = null
  }
}

document.addEventListener('astro:page-load', initCursor)
document.addEventListener('astro:before-swap', () => cleanup?.())

export {}
