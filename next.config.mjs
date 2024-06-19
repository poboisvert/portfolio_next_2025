/** @type {import('next').NextConfig} */
const nextConfig = {
  generateEtags: false,
  // Your existing module.exports
  reactStrictMode: true, // Recommended for the `pages` directory, default in `app`.
  swcMinify: true,
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

export default nextConfig;
