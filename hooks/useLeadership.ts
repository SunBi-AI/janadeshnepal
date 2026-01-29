import { useQuery } from '@tanstack/react-query';
import { fetchLeadership } from '@/lib/leadership';

const CACHE_TTL = 1000 * 60 * 5; // 5 minutes

export function useLeadership(locale: 'en' | 'np') {
  const cacheKey = `leadership_${locale}`;

  // Load cached data from localStorage
  const cached = typeof window !== 'undefined' ? localStorage.getItem(cacheKey) : null;
  const initialData = cached ? JSON.parse(cached)?.value : undefined;

  return useQuery({
    queryKey: ['leadership', locale],
    queryFn: async () => {
      const res = await fetchLeadership(locale);
      const data = res?.results?.length ? res.results : [];
      
      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem(cacheKey, JSON.stringify({ value: data, timestamp: Date.now() }));
      }

      return data;
    },
   
  });
}
