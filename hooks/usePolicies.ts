import { useQuery } from '@tanstack/react-query';
import { buildApiUrl } from '@/lib/config';

export async function fetchPolicies() {
  const res = await fetch(buildApiUrl('/policies/'));
  if (!res.ok) throw new Error('Failed to fetch policies');
  return res.json();
}

export function usePolicies() {
  return useQuery({
    queryKey: ['policies'],
    queryFn: fetchPolicies,
    staleTime: 1000 * 60, // 1 minute
    refetchOnWindowFocus: true,
  });
}


export async function fetchPolicyBySlug(slug: string) {
  const res = await fetch(buildApiUrl(`/policies/${slug}/`));
  if (!res.ok) throw new Error('Policy not found');
  return res.json();
}