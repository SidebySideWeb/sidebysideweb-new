/**
 * Security headers for sidebysideweb.gr.
 *
 * CSP allows GTM/GA4, Sanity CDN, Cal.com, reCAPTCHA, and Google Fonts (Material Symbols).
 * Trusted Types omitted — GTM/Silktide/reCAPTCHA need a default policy we do not ship yet.
 */
function buildContentSecurityPolicy(): string {
  const directives = [
    "default-src 'self'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "object-src 'none'",
    [
      'script-src',
      "'self'",
      "'unsafe-inline'",
      'https://www.googletagmanager.com',
      'https://www.google-analytics.com',
      'https://www.google.com',
      'https://www.gstatic.com',
      'https://app.cal.com',
      'https://cal.com',
      'https://embed.cal.com',
    ].join(' '),
    [
      'style-src',
      "'self'",
      "'unsafe-inline'",
      'https://www.gstatic.com',
      'https://fonts.googleapis.com',
    ].join(' '),
    ['font-src', "'self'", 'data:', 'https://fonts.gstatic.com'].join(' '),
    [
      'img-src',
      "'self'",
      'data:',
      'blob:',
      'https://cdn.sanity.io',
      'https://www.googletagmanager.com',
      'https://www.google-analytics.com',
      'https://region1.google-analytics.com',
      'https://www.google.com',
      'https://www.gstatic.com',
    ].join(' '),
    [
      'connect-src',
      "'self'",
      'https://*.sanity.io',
      'https://www.googletagmanager.com',
      'https://www.google-analytics.com',
      'https://region1.google-analytics.com',
      'https://analytics.google.com',
      'https://stats.g.doubleclick.net',
      'https://www.google.com',
      'https://www.gstatic.com',
      'https://api.cal.com',
    ].join(' '),
    [
      'frame-src',
      "'self'",
      'https://www.googletagmanager.com',
      'https://www.google.com',
      'https://recaptcha.google.com',
      'https://app.cal.com',
      'https://cal.com',
      'https://embed.cal.com',
    ].join(' '),
    "worker-src 'self' blob:",
    "manifest-src 'self'",
    'upgrade-insecure-requests',
  ]

  return directives.join('; ')
}

export function buildSecurityHeaders(): Record<string, string> {
  return {
    'Content-Security-Policy': buildContentSecurityPolicy(),
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=()',
  }
}
