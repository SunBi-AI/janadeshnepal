import { formatNepaliDate } from '@/utils/formatDate';
import Image from 'next/image';
import Link from 'next/link';
import { getLocalizedField } from '@/lib/utils/locale';
export default function NewsCard({
  blog,
  locale,
}: {
  blog: any;
  locale: 'en' | 'np';
}) {
  return (
    <div className="bg-gray-50 rounded-3xl hover:shadow-lg transition overflow-hidden">
      <div className="relative h-48">
        <Image
          src={blog.featured_image || '/images/news-placeholder.jpg'}
          alt={getLocalizedField(blog, 'title', locale)}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-5">
        {/* FIX: category is an object */}
        <span className="text-xs font-semibold text-blue-600 uppercase">
          {locale === 'np'
            ? blog.category?.name_np
            : blog.category?.name_en}
        </span>

        <h3 className="font-medium text-lg text-green-600 mt-2">
          {getLocalizedField(blog, 'title', locale)}
        </h3>

        <p className="text-sm text-gray-500 mt-2"> {formatNepaliDate(blog.published_at, locale)}</p>

        <Link
  href={`/${locale}/news/${blog.slug}`}
  className="mt-4 text-gray-600 font-medium text-sm"
>
  {locale === 'np' ? 'थप पढ्नुहोस् →' : 'Read More →'}
</Link>

       </div>
    </div>
  );
}
