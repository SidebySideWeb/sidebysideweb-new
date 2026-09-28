/**
 * Builds a seamless marquee loop and drives it with pixel distances.
 * Percentage translateX(-50%) is unreliable on some mobile WebKits when the
 * track uses width:max-content inside a transformed, overflow-hidden parent.
 */
function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function fillTrack(track: HTMLElement) {
  const shell = track.closest('.marquee-clip') ?? track.parentElement
  const minWidth = Math.max((shell?.clientWidth ?? window.innerWidth) * 2, 800)
  let guard = 0

  // Always at least one double so two identical halves exist.
  track.innerHTML += track.innerHTML
  while (track.scrollWidth < minWidth && guard < 4) {
    track.innerHTML += track.innerHTML
    guard++
  }
}

function startTrack(track: HTMLElement) {
  track.getAnimations().forEach((a) => a.cancel())

  if (prefersReducedMotion()) return

  const distance = track.scrollWidth / 2
  if (!distance) return

  const reverse = Boolean(track.closest('.marquee.alt'))
  // Slightly faster than the prototype so motion is obvious on small screens.
  const duration = reverse ? 28000 : 22000

  track.animate(
    [
      {transform: 'translate3d(0,0,0)'},
      {transform: `translate3d(${reverse ? distance : -distance}px,0,0)`},
    ],
    {
      duration,
      iterations: Infinity,
      easing: 'linear',
    },
  )
}

function runMarquee() {
  document.querySelectorAll<HTMLElement>('[data-dup]').forEach((track) => {
    if (!track.dataset.dupDone) {
      fillTrack(track)
      track.dataset.dupDone = '1'
    }
    startTrack(track)
  })
}

function initMarquee() {
  runMarquee()
  // Re-measure after webfonts so Greek glyphs don't leave the loop short.
  void document.fonts?.ready.then(() => {
    document.querySelectorAll<HTMLElement>('[data-dup]').forEach((track) => {
      startTrack(track)
    })
  })
}

document.addEventListener('astro:page-load', initMarquee)

export {}
