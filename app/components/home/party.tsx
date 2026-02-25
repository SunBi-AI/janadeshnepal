'use client';
import { useLocale } from 'next-intl'
import Container from '../layout/Container';
import { useLeadership } from '@/hooks/useLeadership';
import { buildApiUrl } from '@/lib/config';
import { getLocalizedField } from '@/lib/utils/locale';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';

type ApiResponse<T> = {
  results: T[];
};

type ServiceItem = {
  id: number;
  title_en: string;
  title_np: string;
  image: string | null;
  subtitle_np: string;
  subtitle_en: string;
  
};

type LeadershipProfile = {
  id: number;
  name_en: string;
  name_np: string;
  position_en: string;
  position_np?: string;
  image: string | null;
};

 const fetchServices = async (): Promise<ServiceItem[]> => {
   const res = await fetch(buildApiUrl('/services/'));
   if (!res.ok) throw new Error('Failed to fetch services');
   const data: ApiResponse<ServiceItem> = await res.json();
   return data.results;
 };

export default function PartyLeadershipCards() {
  const locale = useLocale() as 'np' | 'en';
  const { data = [], isLoading, isError } = useLeadership(locale);
   const { data: services, isLoading: servicesLoading } = useQuery({
    queryKey: ['services'],
    queryFn: fetchServices,
  });

  if (isLoading) return <p className="py-20">Loading...</p>;
  if (isError) return <p className="py-20 text-red-500">Error</p>;

 
  return (
    <div className="pb-12 bg-white ">
      <Container>
        <div className="">
          {/* Header */}
          <h1 className="text-3xl font-semibold text-green-600 mb-10">
            {locale === 'np' ? 'जनादेश पार्टीको नेतृत्व' : 'Leaders'}
          </h1>
        </div>
        <div className="flex gap-6 pb-12  overflow-x-auto 
    scroll-smooth
    snap-x snap-mandatory
    scrollbar-hide">
          {data.map((profile: LeadershipProfile) => (
            <div
              key={profile.id}
              className="
        relative h-[350px] w-[300px]  overflow-hidden rounded-xl
        bg-white/10 backdrop-blur-md
        border border-white/30
        shadow-lg
      "
            >
              <Image
                src={profile.image || '/images/avatar-placeholder.png'}
                alt={getLocalizedField(profile, 'name', locale)}
                className="h-full w-full object-cover"
                fill
              />
              <div
                className="
          absolute w-full bottom-0 z-20 px-4 py-4 text-white
          bg-gradient-to-t from-black/70 via-black/30 to-transparent
        "
              >
                <p className="text-sm font-medium capitalize">
                  {locale === 'np'
                    ? profile.position_np ?? profile.position_en
                    : profile.position_en}
                </p>

                <h2
                  className={`font-bold capitalize ${locale === 'np' ? 'text-lg' : 'text-base'
                    }`}
                >
                  {getLocalizedField(profile, 'name', locale)}
                </h2>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
         {services?.map((item: ServiceItem) => (
            <div
              key={item.id}
              className=" border-2 border-gray-200 rounded-2xl p-6 bg-gray-50 hover:shadow-md transition-shadow"
            >
              <h3 className="text-xl font-bold capitalize text-green-600 mb-4" >
                {getLocalizedField(item, 'title', locale)}
              </h3>
              <p className="text-gray-700 mb-4"dangerouslySetInnerHTML={{ __html: getLocalizedField(item, 'subtitle', locale) }}/>
                
          
              {/* <div
                className="text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: getLocalizedField(item, 'description', locale) }}
              /> */}
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}