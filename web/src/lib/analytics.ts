/**
 * GTM / GA4 helpers. Push events into `dataLayer` so tags can fire
 * (e.g. GA4 `generate_lead`, Meta Lead) without hard-coding pixels here.
 */

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[]
  }
}

export type LeadFormType = 'contact' | 'audit'

export function trackGenerateLead(formType: LeadFormType = 'contact') {
  if (typeof window === 'undefined') return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({
    event: 'generate_lead',
    form_type: formType,
  })
}
