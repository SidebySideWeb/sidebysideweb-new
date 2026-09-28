/**
 * Doubles `[data-dup]` tracks so the CSS `translateX(-50%)` loop is seamless.
 * On narrow screens a single copy is often shorter than the viewport, so we
 * keep doubling (2 → 4 → 8…) until the track is wide enough.
 */
function initMarquee() {
  document.querySelectorAll<HTMLElement>('[data-dup]').forEach((track) => {
    if (track.dataset.dupDone) return

    const shell = track.parentElement
    const minWidth = Math.max((shell?.clientWidth ?? window.innerWidth) * 2, 800)
    let guard = 0

    // Always at least one double for the -50% keyframe.
    track.innerHTML += track.innerHTML
    while (track.scrollWidth < minWidth && guard < 4) {
      track.innerHTML += track.innerHTML
      guard++
    }

    track.dataset.dupDone = '1'
  })
}

document.addEventListener('astro:page-load', initMarquee)

export {}
