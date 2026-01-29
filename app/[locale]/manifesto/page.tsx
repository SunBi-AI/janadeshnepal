'use client';

import PageHeader from '../../components/layout/PageHeader';
import { useTranslations, useLocale } from 'next-intl';
import ManifestoPage from '../../components/manifesto/Manifesto';

export default function Manifesto() {
  const t = useTranslations('manifesto');
  const locale = useLocale(); // ✅ detect current language


  return (
    <div className="bg-[#fafafa]">
      <PageHeader slug="manifesto" />
      <ManifestoPage />
    </div>
  );
}
