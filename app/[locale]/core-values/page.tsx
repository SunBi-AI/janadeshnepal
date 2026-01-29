'use client';
import CoreValues from '../../components/core-values/CoreValues';
import PageHeader from '../../components/layout/PageHeader';
import { useTranslations } from 'next-intl';

export default function CoreValuesPage() {
  const t = useTranslations('core-values');
 

  return (
    <section className="">
          <PageHeader slug="core-values" />
        <CoreValues/>
    </section>
  );
}