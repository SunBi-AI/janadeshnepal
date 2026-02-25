'use client';

import { useParams } from 'next/navigation';
import PageHeader from '@/app/components/layout/PageHeader';
import Container from '@/app/components/layout/Container';
import { useTranslations, useLocale } from 'next-intl';
import { useEffect, useState } from 'react';
import { fetchPolicyBySlug } from '@/hooks/usePolicies';
import { getLocalizedField } from '@/lib/utils/locale';

type Policy = {
  id: string;
  title: string;
  title_ne: string;
  description: string;
  description_ne: string;
  content: string;
  content_ne: string;
  category: { name_en: string; name_ne: string };
};

export default function PolicyDetail() {

  
  const t = useTranslations('policies');
  const locale = useLocale() as 'en' | 'np';
  const { slug } = useParams();

  const [policy, setPolicy] = useState<Policy | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    const slugString = Array.isArray(slug) ? slug[0] : slug;
    fetchPolicyBySlug(slugString)
      .then((res) => setPolicy(res))
      .catch(() => setError('Policy not found'))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <p className="text-center py-20 bg-[#f2f5f6]">Loading...</p>;
  if (error || !policy)
    return <p className="text-center py-20 text-red-500 bg-[#f2f5f6]">{error}</p>;

  return (
    <>
      
    <section className="bg-[#f2f5f6] py-14">
   
      <Container className='mt-[123px] '>
        <div className="bg-white border hover:border-blue-200 transation duration-500 rounded-2xl p-8">
          <span className="inline-block px-4 py-1 mb-4 text-sm text-white rounded-md bg-[#2772b0]">
            {locale === 'np'
              ? policy.category.name_ne
              : policy.category.name_en}
          </span>

          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            {getLocalizedField(policy, 'title', locale === 'np' ? 'np' : 'en').replace('_ne', '')}
          </h1>

          <p className="text-gray-700 mb-6">
            {locale === 'np' ? policy.description_ne : policy.description}
          </p>

          <div className="text-gray-700 leading-relaxed">
            {locale === 'np' ? policy.content_ne : policy.content}
          </div>
        </div>
      </Container>
    </section>
        </>

  );
}
