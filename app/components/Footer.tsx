'use client';

import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { usePathname } from 'next/navigation';
import { useSocialLinks, SocialLink } from '@/hooks/useSocialLinks';
import Container from './layout/Container';
import DynamicHugeicon from './DynamicIcon';
import { navigationLinks, NavigationLink } from '@/lib/constants/navigation';

export default function Footer() {
  const locale = useLocale();
  const t = useTranslations('footer');
  const pathname = usePathname();
  const { data: socialLinks = [] } = useSocialLinks();

  return (
    <footer className="w-full bg-[#fafafa] border-t border-gray-200">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 md:gap-40 gap-10  justify-between py-12 lg:text-center md:text-left">

          {/* LOGO */}
          <div className=" relative w-auto h-[200px]">
            <Image
              src="/assets/logo_janadesh.png"
              alt="Janadesh Party Logo"
              fill
              className="object-contain"
              priority
            />
          </div>

            <div className="flex flex-col text-start  space-y-2">
              <h2 className="text-lg font-bold text-[#144a7b]">
                    {t('quickLinks')}
              </h2>

              {navigationLinks.map((link: NavigationLink) => (
                <Link
                  key={link.key}
                  href={link.href}
                  className={`text-base text-[#144a7b] text-start hover:text-green-600 ${
                    pathname === link.href ? 'font-bold' : ''
                  }`}
                >
                  {t(link.key)}
                </Link>
              ))}
            </div>

            {/* DONATE */}
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-center sm:text-start text-[#144a7b]">
                {t('donate')}
              </h2>
              <div className="relative h-[150px] w-[150px] mx-auto md:mx-0">
                <Image
                  src="/assets/qrcode.png"
                  alt="Donate QR Code"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* SOCIAL LINKS */}
            <div className="space-y-3 text-center items-center text-[#144a7b]">
                  <h2 className="text-lg font-bold text-start text-[#144a7b]">
                {t('connect')}
              </h2>
              <div className="">
                {socialLinks.map((item: SocialLink) => (
                  <div className="flex flex-col items-start mb-2" key={item.id}>
                    <Link 
                      href={item.url} 
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit our ${item.platform_display}`}
                    >
                      <div className="flex gap-2">
                        <DynamicHugeicon iconName={item.icon} size={24} color="#144a7b" />
                        <span className="text-base text-[#144a7b] hover:text-green-600">
                          {item.platform_display}
                        </span>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
        </div>
         
      </Container>
      <div className="flex justify-center py-6 border-y text-sm text-gray-500">
              &copy; {new Date().getFullYear()} Janadesh Party. All rights reserved.
            </div>
    </footer>
  );
}
