/** Product / client filter on the work page. */
type Cleanup = () => void

let cleanup: Cleanup | null = null

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function initWorkFilter() {
  cleanup?.()

  const grid = document.getElementById('workCases')
  const buttons = [...document.querySelectorAll<HTMLButtonElement>('.filters button')]
  if (!grid || !buttons.length) return

  const cards = [...grid.querySelectorAll<HTMLElement>('.case')]

  const onClick = (e: Event) => {
    const btn = e.currentTarget as HTMLButtonElement
    const filter = btn.dataset.f
    if (!filter) return

    const apply = () => {
      buttons.forEach((other) => other.setAttribute('aria-pressed', String(other === btn)))
      cards.forEach((card) => {
        card.hidden = filter !== 'all' && card.dataset.kind !== filter
      })
    }

    if (!document.startViewTransition || prefersReducedMotion()) {
      apply()
      return
    }

    cards.forEach((card, index) => {
      card.style.viewTransitionName = `wc${index}`
    })
    document
      .startViewTransition(apply)
      .finished.finally(() => cards.forEach((card) => (card.style.viewTransitionName = '')))
  }

  buttons.forEach((btn) => btn.addEventListener('click', onClick))

  cleanup = () => {
    buttons.forEach((btn) => btn.removeEventListener('click', onClick))
    cleanup = null
  }
}

document.addEventListener('astro:page-load', initWorkFilter)
document.addEventListener('astro:before-swap', () => cleanup?.())

export {}
