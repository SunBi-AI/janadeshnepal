import Image from 'next/image';
import { useLocale } from 'next-intl';
import Container from '../layout/Container';
import { useLeadership } from '@/hooks/useLeadership';

export default function LeadershipPage() {
  const locale = useLocale() as 'np' | 'en';
  const { data = [], isLoading, isError } = useLeadership(locale);

  if (isLoading) return <p className="text-center py-20">Loading...</p>;
  if (isError) return <p className="text-center py-20 text-red-500">Error</p>;
if (!data || data.length === 0) {
  return <p className="text-3xl md:text-3xl font-bold text-center text-sky-600 py-12">Our Central Committee data is not found</p>;
}

  return (
    <section className="bg-white py-12">
      <Container>

        {/* PAGE TITLE */}
        <h1 className="text-3xl md:text-3xl font-bold text-center text-sky-600 mb-12">
          {locale === 'np' ? 'हाम्रो केन्द्रीय समिति' : 'Our Central Committee'}
        </h1>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.map((leader: any) => (
            <div
              key={leader.id}
              className="bg-white rounded-xl overflow-hidden border border-gray-200"
            >
              {/* IMAGE */}
              <div className="relative w-full h-[320px] bg-sky-600">
                <Image
                  src={leader.image || '/images/avatar-placeholder.png'}
                  alt={locale === 'np' ? leader.name_np : leader.name_en}
                  fill
                  className="object-cover object-top"
                />
              </div>

              {/* CONTENT */}
              <div className="text-center ">

                <div className="flex items-center justify-center px-4 py-2 border-b border-gray-200 transition ease-in-out duration-500">
                  <span className="text-[17px] font-normal text-blue-500">   
                     {locale === 'np' ? leader.name_np : leader.name_en}
                  </span>
                </div>

                <p className="text-[14px] font-normal text-gray-600 pt-1  ">
                  {locale === 'np'
                    ? leader.position_np
                    : leader.position_en}                
                  </p>

                <a
                  href={leader.phone ? `tel:${leader.phone}` : undefined}
                  className="pb-2 font-normal text-[14px] text-gray-600"
                >
                  {leader.phone}
                </a>

              </div>
            </div>
          ))}
        </div>

      </Container>
    </section>
  );
}
