/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  distDir: './dist',
  async redirects() {
    return [
      {
        source: '/',
        destination: '/search/1',
        permanent: true,
      },
      {
        source: '/search',
        destination: '/search/1',
        permanent: true,
      },
    ];
  }
};

export default nextConfig;
