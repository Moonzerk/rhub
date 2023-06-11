import superjson from 'superjson';

/**
 * A faire:
 *
 * useCustomFetch with base url to api
 * check Serialization in depth... https://nuxt.com/docs/getting-started/data-fetching#serialization
 */

import { defu } from 'defu';
import type { UseFetchOptions } from 'nuxt/app';

export function useCustomFetch<T>(url: string, options: UseFetchOptions<T> = {})
{
  const defaults: UseFetchOptions<T> = {
    baseURL: '/api/',
    key: url,
    transform: value => superjson.parse(value as unknown as string) as T,
  }

  return useFetch(url, defu(options, defaults))
}
