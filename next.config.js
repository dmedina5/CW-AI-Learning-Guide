/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/CW-Vibe-Code-Guide' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/CW-Vibe-Code-Guide/' : '',
};

module.exports = nextConfig;
