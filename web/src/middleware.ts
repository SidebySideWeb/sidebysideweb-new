import {defineMiddleware} from 'astro:middleware'
import {EN_LOCALE_ENABLED, stripLocaleFromPath} from './lib/i18n'
import {buildSecurityHeaders} from './lib/security-headers'

const securityHeaders = buildSecurityHeaders()

export const onRequest = defineMiddleware(async (context, next) => {
  if (!EN_LOCALE_ENABLED && context.url.pathname.match(/^\/en(\/|$)/)) {
    const redirect = context.redirect(stripLocaleFromPath(context.url.pathname), 302)
    for (const [name, value] of Object.entries(securityHeaders)) {
      redirect.headers.set(name, value)
    }
    return redirect
  }

  const response = await next()
  for (const [name, value] of Object.entries(securityHeaders)) {
    response.headers.set(name, value)
  }
  return response
})
