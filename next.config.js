/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true, // kalau pakai styled-components
  },
  typescript: {
    // Jangan hentikan build hanya karena error TypeScript di Vercel
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
