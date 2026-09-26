/** Doubles `[data-dup]` tracks so the CSS `translateX(-50%)` loop is seamless. */
function initMarquee() {
  document.querySelectorAll<HTMLElement>('[data-dup]').forEach((track) => {
    if (track.dataset.dupDone) return
    track.dataset.dupDone = '1'
    track.innerHTML += track.innerHTML
  })
}

document.addEventListener('astro:page-load', initMarquee)

export {}
