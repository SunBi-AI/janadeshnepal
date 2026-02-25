// hooks/useSocialLinks.ts
'use client';

import { useQuery } from '@tanstack/react-query';
import { buildApiUrl } from '@/lib/config';

export type SocialLink = {
  id: number;
  platform: number;
  platform_display: string;
  url: string;
  icon: string;
  order: number;
  is_active: boolean;
};

export const fetchSocialLinks = async (): Promise<SocialLink[]> => {
  const res = await fetch(buildApiUrl('/social-links/'));
  if (!res.ok) throw new Error('Failed to fetch social links');
  const data = await res.json();
  return data.results;
};

export const useSocialLinks = () =>
  useQuery({ queryKey: ['socialLinks'], queryFn: fetchSocialLinks, staleTime: 1000 * 60 });
