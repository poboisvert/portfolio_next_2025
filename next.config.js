/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Ensure proper caching behavior
  experimental: {
    // Enable modern build optimizations
    optimizeCss: true,
    // Ensure proper cache handling
    typedRoutes: true,
  },
  // Disable webpack cache to resolve ENOENT error
  webpack: (config, { isServer }) => {
    config.cache = false;
    return config;
  }
}

module.exports = nextConfig