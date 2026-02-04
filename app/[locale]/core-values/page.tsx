'use client';
import MetaTags from '@/app/components/layout/MetaTags';
import CoreValues from '../../components/core-values/CoreValues';
import PageHeader from '../../components/layout/PageHeader';
import { useTranslations } from 'next-intl';

export default function CoreValuesPage() {
  const t = useTranslations('core-values');


  return (
    <>
      <MetaTags slug="core-values" />

      <section className="">
        <PageHeader slug="core-values" />
        <CoreValues />
      </section>
    </>
  );
}