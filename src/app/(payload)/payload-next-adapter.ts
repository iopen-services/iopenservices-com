import type { Metadata } from 'next'
import { generatePageMetadata as originalGeneratePageMetadata, RootPage as OriginalRootPage } from '@payloadcms/next/views'

export async function generatePageMetadata({
  config,
  params,
  searchParams,
}: {
  config: any,
  params: Promise<any>,
  searchParams: Promise<any>
}): Promise<Metadata> {
  const [resolvedParams, resolvedSearchParams] = await Promise.all([params, searchParams]);
  
  // Use any to bypass Payload's internal type checks
  return originalGeneratePageMetadata({
    config,
    params: resolvedParams,
    searchParams: resolvedSearchParams
  } as any)
}

export async function RootPage({
  config,
  params,
  searchParams,
  importMap,
}: {
  config: any,
  params: Promise<any>,
  searchParams: Promise<any>,
  importMap?: any
}) {
  const [resolvedParams, resolvedSearchParams] = await Promise.all([params, searchParams]);
  
  // Use any to bypass Payload's internal type checks
  return OriginalRootPage({
    config,
    params: resolvedParams,
    searchParams: resolvedSearchParams,
    importMap
  } as any)
}