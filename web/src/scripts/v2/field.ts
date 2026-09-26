/** Hero canvas: a field of bar pairs that lean towards the pointer. */
type Cleanup = () => void

interface Cell {
  x: number
  y: number
  a: number
}

let cleanup: Cleanup | null = null

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function initField() {
  cleanup?.()

  const canvas = document.getElementById('field') as HTMLCanvasElement | null
  const hero = document.querySelector<HTMLElement>('.hero')
  const ctx = canvas?.getContext('2d')
  if (!canvas || !hero || !ctx) return

  const reduced = prefersReducedMotion()

  let width = 0
  let height = 0
  let cells: Cell[] = []
  let mx = -999
  let my = -999
  let tmx = -999
  let tmy = -999
  let visible = true
  let raf = 0

  const draw = (t: number) => {
    ctx.clearRect(0, 0, width, height)
    mx += (tmx - mx) * 0.08
    my += (tmy - my) * 0.08

    for (const cell of cells) {
      const dx = mx - cell.x
      const dy = my - cell.y
      const d = Math.hypot(dx, dy)
      const inf = Math.max(0, 1 - d / 260)
      const wave = reduced ? 0 : Math.sin(t * 0.0008 + cell.x * 0.012 + cell.y * 0.01) * 0.25
      const target = inf > 0 ? Math.atan2(dy, dx) + Math.PI / 2 : wave
      cell.a += (target - cell.a) * 0.12

      const s = 1 + inf * 0.9
      ctx.save()
      ctx.translate(cell.x, cell.y)
      ctx.rotate(inf > 0 ? cell.a * inf : cell.a)
      ctx.globalAlpha = 0.07 + inf * 0.55
      ctx.fillStyle = '#F4F6F3'
      ctx.fillRect(-4 * s, -7 * s, 3 * s, 11 * s)
      ctx.globalAlpha = 0.1 + inf * 0.9
      ctx.fillStyle = '#F0B429'
      ctx.fillRect(1 * s, -5 * s, 3 * s, 11 * s)
      ctx.restore()
    }
  }

  const size = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const rect = canvas.getBoundingClientRect()
    width = rect.width
    height = rect.height
    canvas.width = width * dpr
    canvas.height = height * dpr
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

    const gap = width < 700 ? 34 : 42
    cells = []
    for (let y = gap / 2; y < height; y += gap) {
      for (let x = gap / 2; x < width; x += gap) cells.push({x, y, a: 0})
    }
    if (reduced) draw(0)
  }

  const loop = (t: number) => {
    if (visible && !document.hidden) draw(t)
    raf = requestAnimationFrame(loop)
  }

  const onMove = (e: PointerEvent) => {
    const rect = canvas.getBoundingClientRect()
    tmx = e.clientX - rect.left
    tmy = e.clientY - rect.top
  }

  const onLeave = () => {
    tmx = -999
    tmy = -999
  }

  const observer = new IntersectionObserver((entries) => {
    visible = entries[0]?.isIntersecting ?? false
  })

  size()
  hero.addEventListener('pointermove', onMove)
  hero.addEventListener('pointerleave', onLeave)
  window.addEventListener('resize', size)
  observer.observe(hero)
  if (!reduced) raf = requestAnimationFrame(loop)

  cleanup = () => {
    hero.removeEventListener('pointermove', onMove)
    hero.removeEventListener('pointerleave', onLeave)
    window.removeEventListener('resize', size)
    observer.disconnect()
    if (raf) cancelAnimationFrame(raf)
    raf = 0
    cleanup = null
  }
}

document.addEventListener('astro:page-load', initField)
document.addEventListener('astro:before-swap', () => cleanup?.())

export {}
