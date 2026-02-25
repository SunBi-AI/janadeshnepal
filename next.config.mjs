import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: process.env.NODE_ENV === 'development', // Only unoptimized in dev
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Allow all HTTPS domains - restrict this in production
      },
    ],
  },
};

export default withNextIntl(nextConfig);
