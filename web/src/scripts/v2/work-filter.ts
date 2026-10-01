/** Kind + category filters on the work page. */
type Cleanup = () => void

let cleanup: Cleanup | null = null

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function matchesFilter(card: HTMLElement, filter: string): boolean {
  if (filter === 'all') return true
  if (filter === 'pm') return card.dataset.pm === '1'
  if (filter.startsWith('cat:')) return card.dataset.category === filter.slice(4)
  return card.dataset.kind === filter
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
        card.hidden = !matchesFilter(card, filter)
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
