'use client';

import Image from 'next/image';
import Container from '../layout/Container';
import { useBlogs } from '@/hooks/useBlogs';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { formatNepaliDate } from '@/utils/formatDate';
import { getLocalizedField } from '@/lib/utils/locale';
import { Blog } from '@/lib/types';

export default function NewsUpdates() {
  const locale = useLocale() as 'en' | 'np';
  const { data, loading, error } = useBlogs(locale);

  if (loading) return <p>Loading news...</p>;
  if (error || !data?.length) return null;

  // ✅ Take only latest 4 news
  const latestNews = data.slice(0, 6);

  const featured = latestNews[0];       // 1 big card
  const list = latestNews.slice(1);     // 3 side items

  return (
    <Container className="py-12">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-blue-600 font-bold text-4xl">{locale === 'np' ? 'समाचार र अपडेट' : 'News & Updates'}</h2>
        <Link  href={`/${locale}/news`} className="text-gray-400 text-sm hover:text-gray-600">
          View All
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative rounded-lg overflow-hidden h-[400px]">
          {featured && (
          <Link
            href={`/${locale}/news/${featured.slug}`}
            className="relative rounded-lg overflow-hidden h-[400px]"
          >
            
            <Image
              src={featured.featured_image}
              alt={getLocalizedField(featured, 'title', locale)}
               width={400}
            height={400}
            className="object-cover object-top w-full h-full"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#1E88E5]/90 to-transparent flex flex-col justify-end p-8">
              <h3 className="text-white font-bold text-lg mb-1">
                {getLocalizedField(featured, 'title', locale)}
              </h3>
              <p className="text-white text-xs">  {formatNepaliDate(featured.published_at, locale)}
</p>
            </div>
          </Link>
        )}
        
        </div>

        <div className=" space-y-6  ">
          {list.map((blog: Blog) => (
            <Link
              key={blog.id}
              href={`/${locale}/news/${blog.slug}`}
              className="
                group flex gap-4 border-b border-gray-200 rounded-lg p-4
                transition-colors duration-500
                hover:bg-gray-200
              "
            >
              <div className="mt-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#787e8b"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="
        lucide lucide-chevron-right
      "
                  aria-hidden="true"
                >
                  <path d="m9 18 6-6-6-6"></path>
                </svg>
              </div>

              <div>
                <h4
                  className=" text-gray-600 font-medium text-base mb-1 transition-colors duration-300 group-hover:text-green-500 "
                >
                  {getLocalizedField(blog, 'title', locale)}
                </h4>

                <p className="text-gray-400 text-xs mb-1">  {formatNepaliDate(blog.published_at, locale)}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Container>
  );
}
