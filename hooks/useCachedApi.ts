'use client';

import { useEffect, useState } from 'react';

type CacheItem<T> = {
  data: T;
  expiry: number;
};

const memoryCache = new Map<string, CacheItem<any>>();

export function useCachedApi<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttl = 1000 * 60 * 5 // default 5 min
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        // check cache
        const cached = memoryCache.get(key);
        if (cached && cached.expiry > Date.now()) {
          setData(cached.data);
          setLoading(false);
          return;
        }

        // fetch
        const res = await fetcher();
        memoryCache.set(key, {
          data: res,
          expiry: Date.now() + ttl,
        });

        if (mounted) setData(res);
      } catch (err) {
        if (mounted) setError(err as Error);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, [key]);

  return {
    data,
    loading,
    error,
    isError: !!error,   // <-- optional alias
  };
}
