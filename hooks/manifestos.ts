import { useCachedApi } from './useCachedApi';


const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

if (!API_BASE) {
  throw new Error('NEXT_PUBLIC_API_BASE is not defined');
}

export async function fetchManifesto() {
  const url = `${API_BASE}/manifesto/`;

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