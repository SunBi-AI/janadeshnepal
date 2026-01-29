import { useCachedApi } from './useCachedApi';

export type Hero = {
  title_en: string;
  subtitle_en: string;
  description_en: string;
  button_text_en: string;
  title_np: string;
  subtitle_np: string;
  description_np: string;
  button_text_np: string;
  button_url: string;
  profile_image: string;
  hero_news: string[];
  background_image: string;
};

export const fetchHero = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/hero-section/`);
  if (!res.ok) throw new Error('Failed to fetch hero section');
  return res.json();
};

export const useHero = () => useCachedApi('hero', fetchHero);