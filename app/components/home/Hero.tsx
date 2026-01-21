'use client';
import Image from 'next/image';
import Container from '../layout/Container';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useHero } from '@/hooks/useHero';
import { useLocale } from 'next-intl';

export default function Hero() {
  const locale = useLocale();
  const { data, isLoading } = useHero();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!data?.hero_news?.length) return;
    const interval = setInterval(() => setIndex((prev) => (prev + 1) % data.hero_news.length), 4000);
    return () => clearInterval(interval);
  }, [data]);

  if (isLoading || !data) return null;

  const title = locale === 'np' ? data.title_np : data.title_en;
  const subtitle = locale === 'np' ? data.subtitle_np : data.subtitle_en;
  const buttonText = locale === 'np' ? data.button_text_np : data.button_text_en;


const MEDIA = process.env.NEXT_PUBLIC_MEDIA_BASE;

const profileImage = data.profile_image
  ? `${MEDIA}${data.profile_image}`
  : '/assets/hero_section.png';

const backgroundImage = data.background_image
  ? `${MEDIA}${data.background_image}`
  : '/assets/background.jpg';

  return (
    <>
      <section className='bg-[#fafafa] pt-[130px] lg:pt-[182px]'></section>
      <section className="relative w-full bg-[#fafafa]">
        <Container className=''>
          <div className="absolute inset-0">
            <Image
              src={backgroundImage}
              alt="Movement"
              fill
              className="object-cover object-bottom"
              priority
            />
            <div className="absolute inset-0 bg-blue-600/85" />
          </div>
          <div className="relative z-10">
            <div className="relative grid grid-cols-1 md:grid-cols-2  lg:min-h-[450px] ">
              <div className="text-white py-10 md:py-20">
                <h1 className="text-3xl lg:text-5xl font-bold leading-tight mb-4">
                  {title}
                </h1>

                <p className="text-sm lg:text-2xl font-semibold text-blue-100 mb-6 max-w-md">
                  {subtitle}
                </p>

                <div className="flex items-center gap-4">
                  {/* Join Now → Registration Page */}
                  <Link href="/register">
                    <button className="sm:px-6 py-2 px-4 rounded-full border-white/60 border bg-green-600 hover:bg-green-800 text-white font-normal shadow-lg transition duration-300">
                      <span className="relative z-10">{buttonText}</span>
                    </button>
                  </Link>

                  {/* View Manifesto → Manifesto Page */}
                  <Link href="/manifesto">
                    <button className="sm:px-6 py-2 px-4 rounded-full border-white/60 border bg-transparent hover:bg-white/20 text-white font-normal shadow-lg transition duration-300">
                      <span className="relative z-10 flex items-center gap-2">
                        View Manifesto
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <path d="M12 15V3"></path>
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                          <path d="m7 10 5 5 5-5"></path>
                        </svg>
                      </span>
                    </button>
                  </Link>
                </div>

              </div>
              <div className="relative hidden  lg:flex justify-start lg:justify-end">
                <div className="absolute lg:flex hidden  z-10 h-[480px] w-[450px] bg-[#00bf63] rounded-xl -top-[48px] right-0"></div>
                <div className="lg:absolute md:w-[540px] w-[340px] h-[400px] md:h-[530px] z-50  ">
                  <Image
                    src={profileImage}
                    alt="Leader"
                    fill
                    priority
                    className="lg:object-contain object-contain"
                  />
                </div>
              </div>
            </div>

          </div>
        </Container>
        <div className="relative ">
          <div className="md:absolute  inset-0 flex items-center">
            <div className='bg-blue-500 w-full md:mb-[75px]'>
              <Container className=''>
                <div className="flex items-center gap-3 py-7 text-sm text-white transition-all duration-500">
                  <span className="inline-flex h-4 w-4 items-center justify-center rounded bg-white/20">
                    📅
                  </span>
                  <span className="animate-fade">
                    {data.hero_news[index]}
                  </span>
                </div>
              </Container>
            </div>
          </div>
        </div>

      </section>
    </>
  );
}
