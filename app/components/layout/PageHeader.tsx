'use client';

import React from 'react';
import { useBanner } from '@/hooks/useBanner';
import Container from './Container';
import { useLocale } from 'next-intl';

interface PageHeaderProps {
  slug: string;
  action?: React.ReactNode;
}

export default function PageHeader({ slug, action }: PageHeaderProps) {
  const { data, isLoading, isError } = useBanner(slug);
  const locale = useLocale();
  const isNepali = locale.startsWith('ne') || locale.startsWith('np');

  if (isLoading) {
    return (
      <section className="bg-[#2673b0] py-16 text-center text-white pt-[220px]">
        <Container>
          <p>Loading...</p>
        </Container>
      </section>
    );
  }

  if (isError || !data) return null;

  return (
    <section className="bg-[#2673b0] py-16 text-center text-white pt-[220px]">
      <Container>
        <h1 className="text-2xl md:text-3xl font-semibold mb-2">
          {isNepali ? data.title_np?.trim() || data.title_en : data.title_en}
        </h1>

        <p className="text-lg font-normal opacity-90 mb-6">
          {isNepali ? data.subtitle_np?.trim() || data.subtitle_en : data.subtitle_en}
        </p>

        {action && <div className="flex justify-center">{action}</div>}
      </Container>
    </section>
  );
}
