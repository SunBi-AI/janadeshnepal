import Container from '@/app/components/layout/Container';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { buildApiUrl } from '@/lib/config';
import { getLocalizedField } from '@/lib/utils/locale';
import { Blog } from '@/lib/types';

async function fetchBlog(slug: string, locale: 'en' | 'np') {
  const res = await fetch(buildApiUrl(`/blogs/${slug}?lang=${locale}`));
  if (!res.ok) return null;
  return res.json();
}


interface BlogPageProps {
  params: Promise<{ slug: string; locale: 'en' | 'np' }>;
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { slug, locale } = await params;

  const blog: Blog = await fetchBlog(slug, locale);

  if (!blog) return notFound();

  return (
    <div className="bg-gray-100 mt-[121px] py-10">
        <Container>
      <div className="relative h-96 mb-6 rounded-3xl bg-[#b6b3b3]">
        <Image
          src={blog.featured_image || '/images/avatar-placeholder.png'}
          alt={getLocalizedField(blog, 'title', locale)}
          fill
          className="object-cover object-top rounded-lg text-gray-400"
        />
      </div>
      <div className="flex flex-col relative">
        <h1 className="text-3xl font-bold text-green-600 mb-4">
          {getLocalizedField(blog, 'title', locale)}
        </h1>

      <p className="text-sm text-gray-500 mb-6">{blog.date}</p>

      <p className="text-gray-500 text-sm">
        {getLocalizedField(blog, 'content', locale).replace(/<[^>]*>?/gm, '')}
      </p>

      </div>

      <div className="prose max-w-none">
        <div
          dangerouslySetInnerHTML={{
            __html: (locale === 'np' ? (blog as any).description_np : (blog as any).description_en) || '',
          }}
        />
      </div>
      </Container>
    </div>
  );
}
