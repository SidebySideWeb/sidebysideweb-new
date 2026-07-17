const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)'

function animateCounter(el: HTMLElement) {
  if (el.dataset.animated === 'true') return
  el.dataset.animated = 'true'

  const target = parseFloat(el.dataset.target ?? '')
  if (Number.isNaN(target)) {
    el.textContent = el.dataset.fallback ?? el.textContent
    return
  }

  const prefix = el.dataset.prefix ?? ''
  const suffix = el.dataset.suffix ?? ''
  const duration = Number(el.dataset.duration ?? 2000)
  const start = performance.now()

  const tick = (now: number) => {
    const progress = Math.min((now - start) / duration, 1)
    const eased = 1 - Math.pow(1 - progress, 3)
    const value = target % 1 === 0 ? Math.floor(target * eased) : Math.round(target * eased * 10) / 10
    el.textContent = `${prefix}${value}${suffix}`
    if (progress < 1) requestAnimationFrame(tick)
    else el.textContent = `${prefix}${target}${suffix}`
  }

  requestAnimationFrame(tick)
}

function revealElement(el: Element) {
  el.classList.add('visible')
  el.querySelectorAll<HTMLElement>('.counter').forEach(animateCounter)
}

function initScrollAnimations() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document
      .querySelectorAll('.scroll-reveal, .step-badge, .step-content, .process-timeline-line, .counter')
      .forEach((el) => {
        el.classList.add('visible')
        if (el.classList.contains('counter')) animateCounter(el as HTMLElement)
      })
    return
  }

  const targets = document.querySelectorAll(
    '.scroll-reveal, .step-badge, .step-content, .process-timeline-line',
  )

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        revealElement(entry.target)
        observer.unobserve(entry.target)
      })
    },
    {threshold: 0.12, rootMargin: '0px 0px -40px 0px'},
  )

  targets.forEach((el) => observer.observe(el))
}

function initNavScrollState() {
  const nav = document.querySelector('nav')
  if (!nav) return

  const onScroll = () => {
    nav.classList.toggle('nav-scrolled', window.scrollY > 8)
  }

  onScroll()
  window.addEventListener('scroll', onScroll, {passive: true})
}

document.addEventListener('DOMContentLoaded', () => {
  initScrollAnimations()
  initNavScrollState()
})

export {animateCounter, EASE}
