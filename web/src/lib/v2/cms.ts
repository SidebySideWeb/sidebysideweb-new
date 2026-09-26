import {client} from '../sanity'
import {HOME_PAGE_QUERY} from './queries'
import type {HomePage} from './types'

/** The `homePage` singleton with every reference it needs, or null if unseeded. */
export async function getHomePage(): Promise<HomePage | null> {
  const home = await client.fetch<HomePage | null>(HOME_PAGE_QUERY)
  return home ?? null
}
