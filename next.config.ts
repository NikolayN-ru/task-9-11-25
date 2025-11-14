/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: '/task-9-11-25',
  assetPrefix: '/task-9-11-25/',
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig