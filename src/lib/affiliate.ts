import type { Product } from '../types'

export const AMAZON_TAG = 'flaxx-21'

export function productUrl(product: Product): string {
  if (product.store !== 'amazon') return product.url
  const url = new URL(product.url)
  url.searchParams.set('tag', AMAZON_TAG)
  return url.toString()
}
