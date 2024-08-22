/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: `http`,
        hostname: `localhost`,
        port: "3000",
        pathname: "/uploads/**",
      },
      {
        protocol: `https`,
        hostname: `set-coffee.com`,
      },
    ],
    deviceSizes: [320, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
};

export default nextConfig;
