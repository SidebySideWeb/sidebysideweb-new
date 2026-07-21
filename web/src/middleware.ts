import {defineMiddleware} from 'astro:middleware'
import {EN_LOCALE_ENABLED, stripLocaleFromPath} from './lib/i18n'

export const onRequest = defineMiddleware((context, next) => {
  if (!EN_LOCALE_ENABLED && context.url.pathname.match(/^\/en(\/|$)/)) {
    return context.redirect(stripLocaleFromPath(context.url.pathname), 302)
  }
  return next()
})
