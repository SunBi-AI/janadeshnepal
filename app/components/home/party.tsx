'use client';
import { useLocale } from 'next-intl'
import { useState } from 'react';
import Container from '../layout/Container';
import { Profiles } from '@/data/profile';
import { useLeadership } from '@/hooks/useLeadership';
import Image from 'next/image';
export default function PartyLeadershipCards() {
  const locale = useLocale() as 'np' | 'en';
  const { data = [], isLoading, isError } = useLeadership(locale);

  if (isLoading) return <p className="py-20">Loading...</p>;
  if (isError) return <p className="py-20 text-red-500">Error</p>;

  const cardsData = [
    {
      id: 1,
      title: 'Digital Governance',
      description: "Digital governance clarifies who's responsible for the management and operation of",
      image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400&h=300&'
    },
    {
      id: 2,
      title: 'Youth Digital Corps',
      description: "Digital governance clarifies who's responsible for the management and operation of .",
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&'
    },
    {
      id: 3,
      title: 'Green Economy',
      description: "Digital governance clarifies who's responsible for the management and operation of.",
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=300'
    },
    {
      id: 4,
      title: 'Innovation Hub',
      description: "Digital governance clarifies who's responsible for the management and operation of.",
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=300'
    },
    {
      id: 5,
      title: 'Smart Cities',
      description: "Digital governance clarifies who's responsible for the management and operation of.",
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=300'
    }
    , {
      id: 6,
      title: 'Smart Cities',
      description: "Digital governance clarifies who's responsible for the management and operation of.",
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=300'
    }
    , {
      id: 7,
      title: 'Smart Cities',
      description: "Digital governance clarifies who's responsible for the management and operation of.",
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=300'
    }
  ];

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
          {data.map((profile: any) => (
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
                alt={locale === 'np' ? profile.name_np : profile.name_en}
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
                  {locale === 'np'
                    ? profile.name_np ?? profile.name_en
                    : profile.name_en}                </h2>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
          {cardsData.slice().map((card, index) => (
            <div
              key={card.id}
              className=" border-2 border-gray-200 rounded-2xl p-6 bg-gray-50 hover:shadow-md transition-shadow"
            >
              <h3 className="text-xl font-bold capitalize text-green-600 mb-4">
                {card.title}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}