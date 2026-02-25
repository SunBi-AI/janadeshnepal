import { useCachedApi } from './useCachedApi';
import { buildApiUrl } from '@/lib/config';

export async function fetchManifesto() {
  const url = buildApiUrl('/manifesto/');

  console.log('Fetching:', url); // DEBUG

  const res = await fetch(url, {
    cache: 'no-store',
    headers: {
      Accept: 'application/json',
    },
  });

  if (!res.ok) {
    const text = await res.text();
    console.error('Manifesto API error:', res.status, text);
    throw new Error('Failed to fetch manifesto');
  }

  return res.json();
}
export const useManifesto = () => useCachedApi('manifesto', fetchManifesto);