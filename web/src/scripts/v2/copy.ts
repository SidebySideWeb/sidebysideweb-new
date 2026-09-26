/**
 * `[data-copy]` buttons copy their value to the clipboard. Where the
 * clipboard is unavailable, the sibling text is selected instead so the
 * visitor can copy it by hand.
 */
type Cleanup = () => void

const DONE_LABEL = 'Αντιγράφηκε'
const RESET_AFTER = 1600

let cleanup: Cleanup | null = null

function initCopy() {
  cleanup?.()

  const timers = new Set<number>()

  const onClick = (e: Event) => {
    const target = e.target as Element | null
    const btn = target?.closest<HTMLElement>('[data-copy]')
    if (!btn) return

    const value = btn.dataset.copy ?? ''

    const confirm = () => {
      const label = btn.textContent
      btn.textContent = DONE_LABEL
      const timer = window.setTimeout(() => {
        btn.textContent = label
        timers.delete(timer)
      }, RESET_AFTER)
      timers.add(timer)
    }

    const selectInstead = () => {
      const source = btn.previousElementSibling
      if (!source) return
      const range = document.createRange()
      range.selectNodeContents(source)
      const selection = window.getSelection()
      selection?.removeAllRanges()
      selection?.addRange(range)
    }

    try {
      navigator.clipboard.writeText(value).then(confirm, selectInstead)
    } catch {
      selectInstead()
    }
  }

  document.addEventListener('click', onClick)

  cleanup = () => {
    document.removeEventListener('click', onClick)
    timers.forEach((id) => window.clearTimeout(id))
    timers.clear()
    cleanup = null
  }
}

document.addEventListener('astro:page-load', initCopy)
document.addEventListener('astro:before-swap', () => cleanup?.())

export {}
