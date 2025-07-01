/** @type {import('next').NextConfig} */
const nextConfig = {
  generateEtags: false,
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    minimumCacheTTL: 10800,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

module.exports = nextConfig;