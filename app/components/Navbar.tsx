'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import LanguageSwitcher from '../components/LanguageSwitcher';
import {
  Facebook,
  Instagram,
  Youtube,
  Twitter,
  Menu,
  X
} from 'lucide-react';
import DynamicHugeicon from '../components/DynamicIcon';
import Container from './layout/Container';
import { useSocialLinks } from '@/hooks/useSocialLinks';

export default function Navbar() {
  const locale = useLocale();
  const t = useTranslations('navbar');
  const pathname = usePathname();
  const cleanPathname = pathname.replace(`/${locale}`, '') || '/';
  const { data: socialLinks = [] } = useSocialLinks();

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false); // ✅ NEW

  // ✅ Detect scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { href: '/', key: 'home' },
    { href: '/about', key: 'about' },
    { href: '/core-values', key: 'coreValues' },
    { href: '/manifesto', key: 'manifesto' },
    { href: '/policies', key: 'policies' },
    { href: '/leadership', key: 'leadership' },
    { href: '/register', key: 'join' },
    { href: '/news', key: 'news' },
    { href: '/contact', key: 'contact' }
  ];

  return (
    <header
      className={`
        fixed top-0 left-0 z-50 w-full bg-[#fafafa]
        transition-all duration-300
        ${scrolled ? '' : ''}
      `}
    >
      <Container>
        <div
          className={`
            flex items-center transition-all duration-300
            ${scrolled ? 'py-2' : 'py-3'}
          `}
        >
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/assets/logo_janadesh.png"
              alt="Janadesh Party Nepal"
              width={80}
              height={80}
              className={`
                object-contain transition-all duration-300
                ${scrolled ? 'h-[90px] w-[90px]' : 'h-[110px] w-[145px]'}
              `}
            />
          </Link>

          <div className="hidden min-[901px]:flex flex-1 justify-end">
            <div className="flex flex-col gap-3">

              <div
                className={`
                  flex items-center justify-between text-sm text-gray-600
                  transition-all duration-300 overflow-hidden
                  ${scrolled ? 'h-0 opacity-0' : 'h-auto opacity-100'}
                `}
              >
                <a href="mailto:info@janadeshnepal.org">info@janadeshnepal.org</a>
                <div className="flex items-center gap-4">
                  {socialLinks.map((item) => (
                    <Link key={item.id} href={item.url} target="_blank">
                      <DynamicHugeicon iconName={item.icon} size={24} color="blue" />

                    </Link>
                  ))}

                  <LanguageSwitcher currentLocale={locale as 'en' | 'np'} />
                </div>

              </div>

              {!scrolled && <hr className="bg-gray-300" />}

              <nav
                className={`
                  flex gap-6 transition-all duration-300
                  ${locale === 'np'
                    ? 'text-[18px]'
                    : 'text-[15.5px] font-normal'
                  }
                `}
              >
                {links.map(({ href, key }) => (
                  <Link
                    key={key}
                    href={href}
                    locale={locale}
                    className={`
                      transition hover:text-green-600
                      ${cleanPathname === href
                        ? 'text-green-600'
                        : 'text-gray-600'
                      }
                    `}
                  >
                    {t(key)}
                  </Link>
                ))}
              </nav>
            </div>
          </div>

          <button
            className="ml-auto max-[900px]:block hidden text-gray-800"
            onClick={() => setOpen(true)}
          >
            <Menu size={28} />
          </button>
        </div>
      </Container>

      <div
        className={`
    fixed inset-0 z-50 max-[900px]:block hidden
    transition-opacity duration-300 ease-in-out
    ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
  `}
      >
        {/* OVERLAY */}
        <div
          className={`
      absolute inset-0 bg-black
      transition-opacity duration-300 ease-in-out
      ${open ? 'opacity-40' : 'opacity-0'}
    `}
          onClick={() => setOpen(false)}
        />

        {/* DRAWER */}
        <div
          className={`
      absolute right-0 top-0 max-h-max w-[300px] bg-white shadow-xl p-6
      transform transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
      ${open ? 'translate-x-0' : 'translate-x-full'}
    `}
        >
          <div className="flex text-gray-700 justify-between mb-6">
            <div className="flex flex-col gap-4">
              <a href="#">info@janadeshnepal.org</a>

              <div className="flex flex-col gap-4 text-gray-800">
                <div className="flex gap-4 items-center">
                  <LanguageSwitcher currentLocale={locale as 'en' | 'np'} />
                  {socialLinks.map((item) => (
                    <Link key={item.id} href={item.url} target="_blank">
                      <DynamicHugeicon iconName={item.icon} size={24} color="blue" />

                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <button onClick={() => setOpen(false)}>
              <X size={26} />
            </button>
          </div>

          <nav className="flex flex-col gap-5">
            {links.map(({ href, key }) => (
              <Link
                key={key}
                href={href}
                locale={locale}
                onClick={() => setOpen(false)}
                className="text-lg text-gray-700 hover:text-green-600 transition-colors"
              >
                {t(key)}
              </Link>
            ))}


          </nav>
        </div>
      </div>

    </header>
  );
}
