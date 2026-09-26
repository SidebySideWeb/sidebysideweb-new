type Cleanup = () => void

let cleanup: Cleanup | null = null

function closeMenu() {
  document.body.classList.remove('menu-open')
  const btn = document.getElementById('menuBtn')
  btn?.setAttribute('aria-expanded', 'false')
}

function initHeader() {
  cleanup?.()

  const hdr = document.getElementById('hdr')
  const prog = document.getElementById('progress')
  const menuBtn = document.getElementById('menuBtn')
  if (!hdr || !prog) return

  let lastY = window.scrollY

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
    const open = document.body.classList.toggle('menu-open')
    menuBtn?.setAttribute('aria-expanded', String(open))
  }

  const onNavClick = (e: Event) => {
    const target = e.target as HTMLElement | null
    if (target?.closest('.mobile a')) closeMenu()
  }

  onScroll()
  window.addEventListener('scroll', onScroll, {passive: true})
  menuBtn?.addEventListener('click', onMenuClick)
  document.getElementById('mobile')?.addEventListener('click', onNavClick)

  cleanup = () => {
    window.removeEventListener('scroll', onScroll)
    menuBtn?.removeEventListener('click', onMenuClick)
    document.getElementById('mobile')?.removeEventListener('click', onNavClick)
    closeMenu()
    cleanup = null
  }
}

document.addEventListener('astro:page-load', initHeader)
document.addEventListener('astro:before-swap', () => cleanup?.())
