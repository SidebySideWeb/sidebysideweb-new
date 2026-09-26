/**
 * Splits `[data-words]` text into `<span class="w">` words so the manifesto
 * can ink in one word at a time as it scrolls.
 */
function splitWords(node: Node) {
  for (const child of [...node.childNodes]) {
    if (child.nodeType === Node.TEXT_NODE) {
      const fragment = document.createDocumentFragment()
      for (const chunk of (child.textContent ?? '').split(/(\s+)/)) {
        if (!chunk) continue
        if (!chunk.trim()) {
          fragment.append(chunk)
          continue
        }
        const span = document.createElement('span')
        span.className = 'w'
        span.textContent = chunk
        fragment.append(span)
      }
      child.replaceWith(fragment)
    } else {
      splitWords(child)
    }
  }
}

function initManifesto() {
  document.querySelectorAll<HTMLElement>('[data-words]').forEach((el) => {
    if (el.dataset.wordsDone) return
    el.dataset.wordsDone = '1'
    splitWords(el)
  })
}

document.addEventListener('astro:page-load', initManifesto)

export {}
