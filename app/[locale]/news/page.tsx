'use client';
import { useLocale, useTranslations } from 'next-intl';
import { useBlogs } from '@/hooks/useBlogs';
import NewsCard from '@/app/components/news/NewsCard';
import FeaturedNewsComponent from '@/app/components/news/FeaturedNews';
import PageHeader from '@/app/components/layout/PageHeader';
import Container from '@/app/components/layout/Container';

export default function HomePage() {
  const locale = useLocale(); // 'en' | 'np'
  const t = useTranslations('news'); // Load the 'news' namespace from JSON

  const { data, error, loading } = useBlogs(locale as 'en' | 'np');

  if (loading) return <p>Loading news...</p>;
  if (error) return <p>Error loading news: {error.message}</p>;

  const featuredBlog = data?.[0];
  const blogsList = data?.slice(1);

  return (
    <div className="bg-gray-200">
      {/* Page Header */}
      <PageHeader slug="news" />

      <Container>
        <FeaturedNewsComponent blog={featuredBlog} locale={locale as 'en' | 'np'} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 pb-8 gap-6">
          {blogsList?.map((blog: any) => (
            <NewsCard key={blog.id} blog={blog} locale={locale as 'en' | 'np'} />
          ))}
        </div>
      </Container>
    </div>
  );
}
