'use client';

import PageHeader from '../../components/layout/PageHeader';
import Container from '../../components/layout/Container';
import { useTranslations, useLocale } from 'next-intl';
import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { usePolicies } from '@/hooks/usePolicies';
import Link from 'next/link';
export default function Policies() {
  const t = useTranslations('policies');
  const locale = useLocale() as 'en' | 'np';

  const { data, isLoading, isError } = usePolicies();

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [search, setSearch] = useState('');

  // Policies array
  const policies = data?.results ?? [];

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = policies.map((p: any) => p.category).filter(Boolean);
    const uniqueCats = Array.from(new Map(cats.map((c: any) => [c.id, c])).values());
    return [{ id: 'all', name_en: 'All', name_ne: 'सबै' }, ...uniqueCats];
  }, [policies]);

  // Filter policies by category and search
  const filteredPolicies = useMemo(() => {
    return policies.filter((policy: any) => {
      const matchCategory =
        activeCategory === 'all' || policy.category?.id === activeCategory;

      const title = locale === 'np' ? policy.title_ne : policy.title;
      const description = locale === 'np' ? policy.description_ne : policy.description;

      const matchSearch =
        title?.toLowerCase().includes(search.toLowerCase()) ||
        description?.toLowerCase().includes(search.toLowerCase());

      return matchCategory && matchSearch;
    });
  }, [policies, activeCategory, search, locale]);

  if (isLoading) {
    return <p className="text-center py-20">Loading...</p>;
  }

  if (isError) {
    return <p className="text-center py-20 text-red-500">Error loading policies</p>;
  }

  if (!policies || policies.length === 0) {
    return <p className="text-center py-20 text-gray-500">No policies found</p>;
  }

  return (
    <section className="bg-[#fafafa]">
          <PageHeader slug="policies" />

      <Container className="py-14">
        {/* Category buttons + search */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-12 justify-between">
          <div className="flex items-center gap-4 overflow-x-auto scrollbar-hide">
            {categories.map((cat: any) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(String(cat.id))}
                className={`
                  px-6 py-2 rounded-full text-white transition-all
                  ${
                    activeCategory === cat.id
                      ? 'bg-[#2772b0] scale-105'
                      : 'bg-gray-400 hover:bg-[#2772b0]'
                  }
                `}
              >
                {locale === 'np' ? cat.name_ne : cat.name_en}
              </button>
            ))}
          </div>

          <div className="relative w-32 sm:w-56 mt-4 sm:mt-0">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-white"
            />
            <input
              type="text"
              placeholder={t('search')}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
                w-full pl-10 pr-4 py-2 rounded-full
                bg-[#2772b0] text-white
                placeholder:text-white/70
                focus:outline-none
              "
            />
          </div>
        </div>

        {/* Policies grid */}
        {filteredPolicies.length === 0 ? (
          <p className="text-center text-gray-500 py-10">No policies found</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPolicies.map((policy: any) => (
              <div
                key={policy.id}
                className="rounded-2xl border border-gray-300 hover:border-blue-200 p-6 bg-white flex flex-col gap-4 justify-between"
              >
                <div>
                  <span className="inline-block px-4 py-1 mb-4 text-sm text-white rounded-md bg-[#2772b0]">
                    {policy.category
                      ? locale === 'np'
                        ? policy.category.name_ne
                        : policy.category.name_en
                      : ''}
                  </span>

                  <h3 className="text-lg font-medium text-gray-800 mb-2">
                    {locale === 'np' ? policy.title_ne : policy.title}
                  </h3>

                  <p className="text-gray-600 text-sm">
                    {locale === 'np' ? policy.description_ne : policy.description}
                  </p>
                </div>

                <Link
                href={`/policies/${policy.slug}`}
                className="px-6 py-2 rounded-full border max-w-max hover:bg-[#f2f2f2] border-gray-200 text-gray-500 transition-all ease-in-out duration-500 inline-block mt-4"
              >
                {t('readMore')} →
              </Link>
              </div>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
