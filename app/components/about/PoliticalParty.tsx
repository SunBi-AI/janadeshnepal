'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useLocale } from 'next-intl';
import Container from '../layout/Container';
import { useTimeline } from '@/hooks/useTimeline';

export default function Timeline() {
  const locale = useLocale() as 'en' | 'np';
  const { data, isLoading, isError } = useTimeline();

  if (isLoading) return <p className="text-center py-10">Loading timeline...</p>;
  if (isError) return <p className="text-center py-10">Error loading timeline</p>;

  const timelineData = data?.results || [];

  return (
    <Container>
      <section className="relative py-12">
        {/* CENTER LINE */}
        <div className="absolute left-1/2 top-0 h-full w-[2px] bg-gray-200 hidden lg:block" />

        <div className="space-y-[78px]">
          {timelineData.map((item: any, index: number) => (
            <TimelineItem
              key={item.id}
              item={item}
              locale={locale}
              reverse={index % 2 !== 0}
            />
          ))}
        </div>
      </section>
    </Container>
  );
}

function TimelineItem({ item, reverse, locale }: any) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      viewport={{ once: true }}
      className={`relative flex flex-col gap-8 lg:flex-row items-center justify-between ${
        reverse ? 'lg:flex-row-reverse' : ''
      }`}
    >
      {/* DOT */}
      <span className="absolute left-1/2 -translate-x-1/2 w-5 h-5 bg-[#2772b0] rounded-full border-4 border-white shadow-md hidden lg:block" />

      {/* IMAGE */}
      {item.image && (
        <motion.div
          style={{ y }}
          className="relative w-full lg:w-[480px] h-[320px] rounded-3xl overflow-hidden "
        >
          <Image
            src={item.image}
            alt={locale === 'np' ? item.title_np : item.title_en}
            fill
            className="object-cover"
          />
        </motion.div>
      )}

      {/* TEXT */}
      <div className="rounded-3xl border-gray-100 bg-gray-50 transition duration-300 border hover:border-blue-200 p-8 w-full lg:max-w-[500px] mt-8 lg:mt-0">
        <span className="text-gray-400 text-sm">{item.year}</span>

        <h3 className="text-xl text-[#2772b0] font-semibold mt-2">
          {locale === 'np' ? item.title_np : item.title_en}
        </h3>

        <p className="text-gray-600 text-base font-normal mt-2 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: locale === 'np'
      ? item.description_np
      : item.description_en
  }}/>
      </div>
    </motion.div>
  );
}
