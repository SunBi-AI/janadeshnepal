'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import Container from '../layout/Container';
import { useValues } from '@/hooks/useValues';

interface Value {
  id: string | number;
  slug: string;
  title_en: string;
  description_en: string;
  image?: string;
}

export default function CoreValues() {
  const t = useTranslations('values');
  const { data, isLoading, isError } = useValues();

  if (isLoading) return <p className="text-center py-10 bg-[#fafafa] text-gray-600">Loading values...</p>;
  if (isError) return <p className="text-center py-10 bg-[#fafafa] text-gray-600" >Error loading values</p>;

  const valuesData = data?.results || [];

  return (
    <section className="bg-[#fafafa] py-20">
      <Container>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {valuesData.map((value: Value) => (
            <div
              key={value.id}
              className="group relative overflow-hidden rounded-3xl bg-white p-8 border hover:border-blue-200 transition-shadow duration-500"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />

              <div className="relative z-10">
                {value.image && (
                  <div className="mb-6 relative h-[65px] w-[65px]">
                    <Image
                      src={value.image}
                      alt={value.title_en}
                      fill
                      className="object-cover rounded-lg max-w-max"
                    />
                  </div>
                )}

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {t(`${value.slug}.title`) || value.title_en}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-base mb-6">
                  {t(`${value.slug}.description`) || value.description_en}
                </p>                
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
