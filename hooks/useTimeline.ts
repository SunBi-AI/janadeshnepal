// src/hooks/useTimeline.ts
import { useQuery } from '@tanstack/react-query';
import { buildApiUrl } from '@/lib/config';

export async function fetchTimeline() {
  const res = await fetch(buildApiUrl('/timeline/')); // API endpoint
  if (!res.ok) throw new Error('Failed to fetch timeline data');
  return res.json();
}

export function useTimeline() {
  return useQuery({
    queryKey: ['timeline'],
    queryFn: fetchTimeline,
    staleTime: 1000 * 60, // 1 minute cache
    refetchOnWindowFocus: true,
  });
}
