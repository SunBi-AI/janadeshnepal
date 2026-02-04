// hooks/useSEO.ts
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export interface SEOData {
  id: number;
  object_id: number | null;
  slug: string;
  meta_title_en: string;
  meta_description_en: string;
  keywords: string;
  og_title_en: string;
  og_description_en: string;
  og_image?: string | null;
  canonical_url?: string | null;
  robots?: string;
}

const LOCAL_STORAGE_KEY = 'seoData';
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24h

const API_BASE = process.env.NEXT_PUBLIC_API_BASE!;

export const useSEO = (slug: string) => {
  return useQuery<SEOData | null>({
    queryKey: ['seo', slug],
    queryFn: async () => {
      const cached = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached) as { value: SEOData[]; timestamp: number };
        if (Date.now() - parsed.timestamp < CACHE_TTL) {
          const seo = parsed.value.find(item => item.slug === slug);
          if (seo) return seo;
        }
      }

      // ✅ Correct API base
      const res = await axios.get(`${API_BASE}/seo/`);
      const seoList: SEOData[] = res.data.results;

      const seoListUpdated = seoList.map(item => ({
        ...item,
        og_image: (item.og_image),
        meta_description_en: (item.meta_description_en),
        keywords: (item.keywords),
        og_description_en: (item.og_description_en),
      }));

      localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify({ value: seoListUpdated, timestamp: Date.now() })
      );

      return seoListUpdated.find(item => item.slug === slug) ?? null;
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};
