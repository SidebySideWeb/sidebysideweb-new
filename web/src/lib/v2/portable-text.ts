/**
 * Renders `richTextV2` to the HTML the prototype expects. The decorators carry
 * brand meaning, so they map to classes rather than semantic tags:
 * `strike` is the struck word in the manifesto, `thin` is weight 200 inside
 * big headlines and `highlight` is the accent colour for the current ground.
 */
import {escapeHtml, ph} from './placeholder'
import {resolveHref} from './links'
import type {PortableTextBlock, PortableTextMarkDef, PortableTextSpan, RichText} from './types'

const DECORATOR_TAGS: Record<string, string> = {
  strong: 'strong',
  em: 'em',
}

const DECORATOR_CLASSES: Record<string, string> = {
  highlight: 'hl',
  strike: 'x',
  thin: 'thin',
}

function renderSpan(span: PortableTextSpan, markDefs: PortableTextMarkDef[]): string {
  let html = ph(span.text)

  for (const mark of span.marks ?? []) {
    const tag = DECORATOR_TAGS[mark]
    if (tag) {
      html = `<${tag}>${html}</${tag}>`
      continue
    }

    const className = DECORATOR_CLASSES[mark]
    if (className) {
      html = `<span class="${className}">${html}</span>`
      continue
    }

    const def = markDefs.find((candidate) => candidate._key === mark)
    if (def?._type === 'link' && def.href) {
      const target = def.blank ? ' target="_blank" rel="noopener"' : ''
      html = `<a href="${escapeHtml(resolveHref(def.href))}"${target}>${html}</a>`
    }
  }

  return html
}

function renderBlock(block: PortableTextBlock): string {
  const markDefs = block.markDefs ?? []
  return (block.children ?? []).map((child) => renderSpan(child, markDefs)).join('')
}

/** Block-level HTML: paragraphs and bullet lists. */
export function renderRichText(value?: RichText | null): string {
  if (!value?.length) return ''

  const out: string[] = []
  let list: string[] = []

  const flush = () => {
    if (!list.length) return
    out.push(`<ul>${list.join('')}</ul>`)
    list = []
  }

  for (const block of value) {
    if (block._type !== 'block') continue

    if (block.listItem === 'bullet') {
      list.push(`<li>${renderBlock(block)}</li>`)
      continue
    }

    flush()
    const inner = renderBlock(block)
    if (inner) out.push(`<p>${inner}</p>`)
  }

  flush()
  return out.join('')
}

/**
 * Inline HTML with no paragraph wrappers. The manifesto is a single styled
 * `<p>` in the prototype, so its blocks join with a space instead.
 */
export function renderInlineRichText(value?: RichText | null): string {
  if (!value?.length) return ''
  return value
    .filter((block) => block._type === 'block')
    .map(renderBlock)
    .filter(Boolean)
    .join(' ')
}

/** Plain text, for meta descriptions and attributes. */
export function richTextToPlainText(value?: RichText | null): string {
  if (!value?.length) return ''
  return value
    .filter((block) => block._type === 'block')
    .map((block) => (block.children ?? []).map((child) => child.text).join(''))
    .join(' ')
    .trim()
}
