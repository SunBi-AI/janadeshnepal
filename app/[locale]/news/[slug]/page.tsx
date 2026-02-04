import Container from '@/app/components/layout/Container';
import Image from 'next/image';
import { notFound } from 'next/navigation';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

async function fetchBlog(slug: string, locale: 'en' | 'np') {
  if (!API_BASE) throw new Error('API_BASE is not defined in .env.local');

  const res = await fetch(`${API_BASE}/blogs/${slug}?lang=${locale}`);
  if (!res.ok) return null;
  return res.json();
}


interface BlogPageProps {
  params: { slug: string; locale: 'en' | 'np' };
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { slug, locale } = params;

  const blog = await fetchBlog(slug, locale);

  if (!blog) return notFound();

  return (
    <div className="bg-gray-100 mt-[121px] py-10">
        <Container>
      <div className="relative h-96 mb-6 rounded-3xl bg-[#b6b3b3]">
        <Image
          src={blog.featured_image || '/images/avatar-placeholder.png'}
          alt={locale === 'np' ? blog.title_np : blog.title_en}
          fill
          className="object-cover object-top rounded-lg text-gray-400"
        />
      </div>
      <div className="flex flex-col relative">
        <h1 className="text-3xl font-bold text-green-600 mb-4">
        {locale === 'np' ? blog.title_np : blog.title_en}
      </h1>

      <p className="text-sm text-gray-500 mb-6">{blog.date}</p>

  <p className="text-gray-500 text-sm">
  {locale === 'np' 
    ? blog.content_np?.replace(/<[^>]*>?/gm, '') 
    : blog.content_en?.replace(/<[^>]*>?/gm, '')}
</p>

      </div>

      <div className="prose max-w-none">
       <div
  dangerouslySetInnerHTML={{
    __html: (locale === 'np' ? blog.description_np : blog.description_en) || '',
  }}
/>
      </div>
      </Container>
    </div>
  );
}
