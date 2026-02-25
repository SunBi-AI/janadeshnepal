import { buildApiUrl } from './config';

export async function fetchLeadership(locale: 'en' | 'np') {
  const res = await fetch(buildApiUrl(`/leadership?lang=${locale}`));

  if (!res.ok) {
    throw new Error('Failed to fetch leadership data');
  }

  return res.json();
}
