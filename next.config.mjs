/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "janadesh.gowell.edu.np",
        pathname: "/api/v1/media/**", // must match your API path exactly
      },
      {
        protocol: "https",
        hostname: "janadesh.gowell.edu.np",
        pathname: "/media/**", // optional if you have non-API media
      },
    ],
  },
};

export default nextConfig;
