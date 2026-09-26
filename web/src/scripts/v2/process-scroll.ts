/**
 * Turns the sticky process section into a horizontal scroller: the section is
 * made as tall as the track overflows, then the track translates with scroll.
 * Below 860px the CSS stacks the cards and this does nothing.
 */
type Cleanup = () => void

const MOBILE_BREAKPOINT = 860

let cleanup: Cleanup | null = null

function initProcessScroll() {
  cleanup?.()

  const section = document.getElementById('hs')
  const track = document.getElementById('hsTrack')
  const bar = document.getElementById('hsBar')
  if (!section || !track || !bar) return

  let distance = 0

  const measure = () => {
    if (window.innerWidth <= MOBILE_BREAKPOINT) {
      section.style.height = ''
      track.style.transform = ''
      bar.style.transform = ''
      distance = 0
      return
    }
    distance = Math.max(0, track.scrollWidth - window.innerWidth)
    section.style.height = `${window.innerHeight + distance}px`
  }

  const update = () => {
    if (!distance) return
    const rect = section.getBoundingClientRect()
    const p = Math.min(1, Math.max(0, -rect.top / distance))
    track.style.transform = `translate3d(${-p * distance}px,0,0)`
    bar.style.transform = `scaleX(${p})`
  }

  const onScroll = () => update()
  const onResize = () => {
    measure()
    update()
  }

  measure()
  update()
  window.addEventListener('scroll', onScroll, {passive: true})
  window.addEventListener('resize', onResize)
  document.fonts?.ready.then(onResize)

  cleanup = () => {
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('resize', onResize)
    section.style.height = ''
    track.style.transform = ''
    bar.style.transform = ''
    cleanup = null
  }
}

document.addEventListener('astro:page-load', initProcessScroll)
document.addEventListener('astro:before-swap', () => cleanup?.())

export {}
