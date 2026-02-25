// hooks/useBanner.ts
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { buildApiUrl } from '@/lib/config';

export interface Banner {
  id: number;
  title_en: string;
  title_np: string;
  subtitle_en: string;
  subtitle_np: string;
  slug: string;
}

const LOCAL_STORAGE_KEY = 'banners';
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24h

export const useBanner = (slug: string) => {
  return useQuery<Banner | null>({
    queryKey: ['banner', slug],
    queryFn: async () => {
      // Check localStorage
      const cached = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached) as { value: Banner[]; timestamp: number };
        if (Date.now() - parsed.timestamp < CACHE_TTL) {
          const banner = parsed.value.find(item => item.slug === slug);
          if (banner) return banner;
        }
      }

      // Fetch from API
      const res = await axios.get(buildApiUrl('/banner/'));
      const banners: Banner[] = res.data.results;

      // Store in localStorage
      localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify({ value: banners, timestamp: Date.now() })
      );

      const banner = banners.find(item => item.slug === slug);
      return banner ?? null;
    },
  });
};
