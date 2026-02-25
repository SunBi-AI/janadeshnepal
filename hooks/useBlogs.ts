import { useCachedApi } from './useCachedApi';
import { buildApiUrl } from '@/lib/config';

async function fetchBlogs(locale: 'en' | 'np') {
  const res = await fetch(buildApiUrl(`/blogs?lang=${locale}`));
  if (!res.ok) throw new Error('Failed to fetch blogs');
  const data = await res.json();

  // normalize paginated response
  return Array.isArray(data.results) ? data.results : [];
}

export function useBlogs(locale: 'en' | 'np') {
  return useCachedApi(`blogs_${locale}`, () => fetchBlogs(locale), 1000 * 60 * 5); // 5 min TTL
}
