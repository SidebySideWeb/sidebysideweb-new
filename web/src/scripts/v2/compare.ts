/** The two-state comparison table: swaps every answer when the pill moves. */
type Cleanup = () => void

let cleanup: Cleanup | null = null

function initCompare() {
  cleanup?.()

  const cmp = document.getElementById('cmp')
  const pill = document.getElementById('pill')
  if (!cmp || !pill) return

  const buttons = [...cmp.querySelectorAll<HTMLButtonElement>('.toggle button')]
  const answers = [...cmp.querySelectorAll<HTMLElement>('.cmp-row .a')]
  if (!buttons.length) return

  const timers = new Set<number>()

  const setPill = (btn: HTMLElement) => {
    pill.style.width = `${btn.offsetWidth}px`
    pill.style.transform = `translateX(${btn.offsetLeft - 5}px)`
  }

  const onClick = (e: Event) => {
    const btn = e.currentTarget as HTMLButtonElement
    const value = btn.dataset.v
    if (!value) return

    buttons.forEach((other) => other.setAttribute('aria-pressed', String(other === btn)))
    setPill(btn)
    cmp.classList.toggle('agency', value === 'agency')

    answers.forEach((answer, index) => {
      answer.classList.add('swap-out')
      const timer = window.setTimeout(
        () => {
          const next = answer.dataset[value]
          if (next) answer.textContent = next
          answer.classList.remove('swap-out')
          timers.delete(timer)
        },
        180 + index * 60,
      )
      timers.add(timer)
    })
  }

  const alignPill = () => {
    const active = buttons.find((btn) => btn.getAttribute('aria-pressed') === 'true') ?? buttons[0]
    if (active) setPill(active)
  }

  buttons.forEach((btn) => btn.addEventListener('click', onClick))
  const frame = requestAnimationFrame(alignPill)
  window.addEventListener('resize', alignPill)
  document.fonts?.ready.then(alignPill)

  cleanup = () => {
    buttons.forEach((btn) => btn.removeEventListener('click', onClick))
    window.removeEventListener('resize', alignPill)
    cancelAnimationFrame(frame)
    timers.forEach((id) => window.clearTimeout(id))
    timers.clear()
    cleanup = null
  }
}

document.addEventListener('astro:page-load', initCompare)
document.addEventListener('astro:before-swap', () => cleanup?.())

export {}
