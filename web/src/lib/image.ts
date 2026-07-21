import {createImageUrlBuilder} from '@sanity/image-url'
import type {ImageUrlBuilder} from '@sanity/image-url/lib/types/builder'
import {client} from './sanity'
import {getCaseStudyImage, STITCH_ABOUT_PORTRAIT, STITCH_HERO_IMAGE, STITCH_PLACEHOLDER_IMAGE} from './stitch-design'
import type {CaseStudy, SanityImage} from './types'

const builder = createImageUrlBuilder(client)

export interface ImageUrlOptions {
  width?: number
  height?: number
  quality?: number
  fit?: 'clip' | 'crop' | 'fill' | 'fillmax' | 'max' | 'scale' | 'min'
}

export function urlFor(source: SanityImage): ImageUrlBuilder {
  return builder.image(source)
}

export function getImageUrl(source: SanityImage | undefined, options?: ImageUrlOptions): string | undefined {
  if (!source?.asset) return undefined

  let imageBuilder = urlFor(source).auto('format').fit(options?.fit ?? 'max')

  if (options?.width) imageBuilder = imageBuilder.width(options.width)
  if (options?.height) imageBuilder = imageBuilder.height(options.height)
  if (options?.quality) imageBuilder = imageBuilder.quality(options.quality)

  return imageBuilder.url()
}

export function resolveCaseStudyImage(caseStudy: CaseStudy, width = 960): string {
  const uploaded = getImageUrl(caseStudy.featuredImage, {width, quality: 80})
  if (uploaded) return uploaded
  if (caseStudy.featuredImageUrl) return caseStudy.featuredImageUrl
  return getCaseStudyImage(caseStudy.slug?.current ?? '')
}

export function resolveHeroImage(
  heroImage: SanityImage | undefined,
  heroImageUrl?: string,
  width = 1280,
): string {
  const uploaded = getImageUrl(heroImage, {width, quality: 80})
  if (uploaded) return uploaded
  if (heroImageUrl) return heroImageUrl
  return STITCH_HERO_IMAGE
}

/** Responsive hero URLs for srcset (Sanity CDN only). */
export function resolveHeroImageSrcSet(
  heroImage: SanityImage | undefined,
  widths: number[] = [480, 800, 960],
): string | undefined {
  if (!heroImage?.asset) return undefined
  return widths
    .map((width) => {
      const url = getImageUrl(heroImage, {width, quality: 80})
      return url ? `${url} ${width}w` : ''
    })
    .filter(Boolean)
    .join(', ')
}

export function resolveAboutPhoto(
  photo: SanityImage | undefined,
  photoUrl?: string,
  width = 640,
): string {
  const uploaded = getImageUrl(photo, {width, quality: 85, fit: 'crop'})
  if (uploaded) return uploaded
  if (photoUrl) return photoUrl
  return STITCH_ABOUT_PORTRAIT
}
