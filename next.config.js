/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/CW-AI-Learning-Guide' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/CW-AI-Learning-Guide/' : '',
};

module.exports = nextConfig;
