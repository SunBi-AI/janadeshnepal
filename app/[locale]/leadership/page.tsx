'use client';
import PageHeader from '../../components/layout/PageHeader';
import { useTranslations } from 'next-intl';
import Leadership from '../../components/leadership/Leadership';
import MetaTags from '@/app/components/layout/MetaTags';

export default function LeadershipPage() {
  const t = useTranslations('leadership');
  

  return (
    <>
    <MetaTags slug="leadership" />
    <div className="bg-[#fafafa]">
      <PageHeader slug="leadership" />
      <Leadership/>
    </div>
    </>
  );
}
