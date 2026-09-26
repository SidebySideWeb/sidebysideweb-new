type Cleanup = () => void

let cleanup: Cleanup | null = null

function setMenuOpen(open: boolean) {
  document.body.classList.toggle('menu-open', open)
  const btn = document.getElementById('menuBtn')
  btn?.setAttribute('aria-expanded', String(open))
  btn?.setAttribute('aria-label', open ? 'Κλείσιμο μενού' : 'Άνοιγμα μενού')
}

function closeMenu() {
  setMenuOpen(false)
}

function initHeader() {
  cleanup?.()

  const hdr = document.getElementById('hdr')
  const prog = document.getElementById('progress')
  const menuBtn = document.getElementById('menuBtn')
  const mobile = document.getElementById('mobile')
  if (!hdr || !prog) return

  let lastY = window.scrollY
  let lastFocus: HTMLElement | null = null

  const focusables = () =>
    mobile
      ? [...mobile.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')].filter(
          (el) => !el.hasAttribute('disabled') && el.getAttribute('aria-hidden') !== 'true',
        )
      : []

  const onScroll = () => {
    const y = window.scrollY
    const max = document.documentElement.scrollHeight - window.innerHeight
    prog.style.transform = `scaleX(${max > 0 ? y / max : 0})`
    hdr.classList.toggle('solid', y > 40)
    hdr.classList.toggle(
      'hide',
      y > 400 && y > lastY && !document.body.classList.contains('menu-open'),
    )
    lastY = y
  }

  const onMenuClick = () => {
    const open = !document.body.classList.contains('menu-open')
    setMenuOpen(open)
    if (open) {
      lastFocus = document.activeElement as HTMLElement | null
      const first = focusables()[0]
      first?.focus()
    } else {
      lastFocus?.focus()
      lastFocus = null
    }
  }

  const onNavClick = (e: Event) => {
    const target = e.target as HTMLElement | null
    if (target?.closest('.mobile a')) closeMenu()
  }

  const onKeyDown = (e: KeyboardEvent) => {
    if (!document.body.classList.contains('menu-open')) return

    if (e.key === 'Escape') {
      e.preventDefault()
      closeMenu()
      menuBtn?.focus()
      return
    }

    if (e.key !== 'Tab' || !mobile) return
    const items = focusables()
    if (!items.length) return
    const first = items[0]
    const last = items[items.length - 1]
    const active = document.activeElement as HTMLElement | null

    if (e.shiftKey && (active === first || active === menuBtn)) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && active === last) {
      e.preventDefault()
      first.focus()
    }
  }

  onScroll()
  window.addEventListener('scroll', onScroll, {passive: true})
  menuBtn?.addEventListener('click', onMenuClick)
  mobile?.addEventListener('click', onNavClick)
  document.addEventListener('keydown', onKeyDown)

  cleanup = () => {
    window.removeEventListener('scroll', onScroll)
    menuBtn?.removeEventListener('click', onMenuClick)
    mobile?.removeEventListener('click', onNavClick)
    document.removeEventListener('keydown', onKeyDown)
    closeMenu()
    cleanup = null
  }
}

document.addEventListener('astro:page-load', initHeader)
document.addEventListener('astro:before-swap', () => cleanup?.())

export {}
