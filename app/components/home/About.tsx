'use client';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import Container from '../layout/Container';
import { useQuery } from '@tanstack/react-query';

/* ===================== TYPES ===================== */

type ImageItem = {
  id: number;
  image: string;
  caption: string;
};

type AboutMovementItem = {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  images: ImageItem[];
};

type ApiResponse<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

type ServiceItem = {
  id: number;
  title_en: string;
  title_np: string;
  image: string | null;
};

/* ===================== FETCHERS ===================== */

const fetchAboutMovement = async (): Promise<AboutMovementItem | null> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE}/about-movement/`
  );
  if (!res.ok) throw new Error('Failed to fetch about movement data');
  const data: ApiResponse<AboutMovementItem> = await res.json();
  return data.results?.[0] ?? null;
};

const fetchServices = async (): Promise<ServiceItem[]> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE}/services/`
  );
  if (!res.ok) throw new Error('Failed to fetch services');
  const data: ApiResponse<ServiceItem> = await res.json();
  return data.results;
};

/* ===================== COMPONENT ===================== */

export default function AboutMovement() {
  const { data: aboutData, isLoading: aboutLoading } = useQuery({
    queryKey: ['about-movement'],
    queryFn: fetchAboutMovement,
  });

  const { data: services, isLoading: servicesLoading } = useQuery({
    queryKey: ['services'],
    queryFn: fetchServices,
  });

  if (aboutLoading || servicesLoading) return null;
  if (!aboutData || !services) return null;
  const locale = useLocale() as 'en' | 'np';

  return (
    <section className="bg-white py-12">
      <Container>
        <div className="mb-10 overflow-x-auto scrollbar-hide">
          <div
            className="
              grid grid-flow-col auto-cols-[160px]
              sm:grid-flow-row sm:grid-cols-3
              lg:grid-cols-5
              gap-6
              pb-4
            "
          >
            {services.map((item) => (
              <div
                key={item.id}
                className="
                  flex flex-col items-center justify-center
                  rounded-2xl bg-gray-50 py-10
                  transition duration-300 hover:shadow-md
                  min-w-[140px]
                "
              >
                {item.image && (
                  <Image
                    src={item.image}
                    alt={item.title_np}
                    width={54}
                    height={54}
                  />
                )}
                <p className="mt-4 text-base font-medium text-blue-600 text-center">
                  {locale === 'np' ? item.title_np : item.title_en}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ========== ABOUT MOVEMENT CONTENT ========== */}
        <div>
          <div className="flex justify-between items-center mb-10">
            <h1 className="text-3xl font-semibold text-blue-600">
              {locale === 'np' ? aboutData.title : aboutData.title}
            </h1>
            <button className="text-gray-400 hover:text-gray-600 font-medium">
              {locale === 'np' ? 'थप हेर्नुहोस्' : 'View More'}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            
            {/* TEXT */}
            <div className="md:col-span-1">
              <p className="text-base text-gray-700 leading-relaxed">
                {locale === 'np' ? aboutData.subtitle : aboutData.subtitle}
              </p>
              <br />
              <p
  className="text-base text-gray-700 leading-relaxed"
  dangerouslySetInnerHTML={{
    __html: locale === 'np'
      ? aboutData.description
      : aboutData.description
  }}
/>

            </div>

            {/* PHOTOS */}
            <div className="md:col-span-2">
              <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-2">
                {aboutData.images.map((img) => (
                  <div
                    key={img.id}
                    className="flex-shrink-0 w-[260px] h-64 rounded-lg overflow-hidden transition "
                  >
                    <img
                      src={img.image}
                      alt={img.caption || 'About movement'}
                      className="w-full h-full object-cover "
                    />
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </Container>
    </section>
  );
}
