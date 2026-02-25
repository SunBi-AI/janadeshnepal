'use client';

import { usePathname, useRouter } from 'next/navigation';

export default function LanguageSwitcher({
  currentLocale
}: {
  currentLocale: 'en' | 'np';
}) {
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (locale: 'en' | 'np') => {
    if (locale === currentLocale) return;

    // Ensure pathname always has a locale
    const segments = pathname.split('/').filter(Boolean);

    // Replace locale safely
    if (segments[0] === 'en' || segments[0] === 'np') {
      segments[0] = locale;
    } else {
      segments.unshift(locale);
    }

    router.push('/' + segments.join('/'));
  };

  return (
    <div className="relative flex h-7 w-16 items-center rounded-full bg-gray-300 p-1">
      {/* Sliding indicator */}
      <span
        className={`absolute left-1 top-1 h-5 w-7 rounded-full bg-[#22C55E] transition-all duration-300 ease-in-out ${
          currentLocale === 'np' ? 'translate-x-7' : 'translate-x-0'
        }`}
      />

      {/* EN */}
      <button
        onClick={() => switchLocale('en')}
        aria-label="Switch to English"
        className={`relative z-10 w-7 text-xs font-medium transition-colors ${
          currentLocale === 'en' ? 'text-white' : 'text-gray-500'
        }`}
      >
        EN
      </button>

      {/* NP */}
      <button
        onClick={() => switchLocale('np')}
        aria-label="Switch to Nepali"
        className={`relative z-10 w-7 text-xs font-medium transition-colors ${
          currentLocale === 'np' ? 'text-white' : 'text-gray-500'
        }`}
      >
        ने
      </button>
    </div>
  );
}
