import {client} from '../sanity'
import {
  ABOUT_PAGE_QUERY,
  CASE_SLUGS_QUERY,
  CASE_STUDY_QUERY,
  CONTACT_PAGE_QUERY,
  HOME_PAGE_QUERY,
  PROCESS_PAGE_QUERY,
  SERVICES_PAGE_QUERY,
  WORK_PAGE_QUERY,
} from './queries'
import type {
  AboutPage,
  CaseStudyPage,
  ContactPage,
  HomePage,
  ProcessPage,
  ServicesPage,
  WorkPage,
} from './types'

/** The `homePage` singleton with every reference it needs, or null if unseeded. */
export async function getHomePage(): Promise<HomePage | null> {
  const home = await client.fetch<HomePage | null>(HOME_PAGE_QUERY)
  return home ?? null
}

export async function getServicesPage(): Promise<ServicesPage | null> {
  return (await client.fetch<ServicesPage | null>(SERVICES_PAGE_QUERY)) ?? null
}

export async function getProcessPage(): Promise<ProcessPage | null> {
  return (await client.fetch<ProcessPage | null>(PROCESS_PAGE_QUERY)) ?? null
}

export async function getWorkPage(): Promise<WorkPage | null> {
  return (await client.fetch<WorkPage | null>(WORK_PAGE_QUERY)) ?? null
}

/** One case study plus the neighbour its footer links on to, or null. */
export async function getCaseStudy(slug: string): Promise<CaseStudyPage | null> {
  if (!slug) return null
  return (await client.fetch<CaseStudyPage | null>(CASE_STUDY_QUERY, {slug})) ?? null
}

export async function getAllCaseSlugs(): Promise<string[]> {
  return (await client.fetch<string[] | null>(CASE_SLUGS_QUERY)) ?? []
}

export async function getAboutPage(): Promise<AboutPage | null> {
  return (await client.fetch<AboutPage | null>(ABOUT_PAGE_QUERY)) ?? null
}

export async function getContactPage(): Promise<ContactPage | null> {
  return (await client.fetch<ContactPage | null>(CONTACT_PAGE_QUERY)) ?? null
}
