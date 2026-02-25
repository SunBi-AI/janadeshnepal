import { useQuery } from '@tanstack/react-query';
import { buildApiUrl } from '@/lib/config';

export async function fetchValues() {
  const res = await fetch(buildApiUrl('/services/')); // <-- append /services/
  if (!res.ok) {
    throw new Error(`Failed to fetch core values: ${res.status}`);
  }
  return res.json();
}

export function useValues() {
  return useQuery({
    queryKey: ['values'],
    queryFn: fetchValues,
    staleTime: 1000 * 60 * 1, // 1 min cache
    refetchOnWindowFocus: true, // refresh when tab gets focus
  });
}
