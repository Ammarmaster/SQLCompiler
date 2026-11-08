/** @type {import('next').NextConfig} */
const PROFILE = '/ammar-master-jalaluddin-master';

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // any experimental options if needed
  },
  // Short / alternate founder URLs permanently redirect (308) to one canonical
  // profile so search engines consolidate all ranking signals on a single page.
  async redirects() {
    return [
      '/founder',
      '/ammar-master',
      '/jalaluddin-master',
      '/ammarmaster',
      '/about-ammar-master',
      '/ammar-master-prodevopz',
      '/jalaluddin-master-prodevopz',
    ]
      .map((source) => ({ source, destination: PROFILE, permanent: true }))
      .concat([
        { source: '/prodevopz-ai', destination: '/prodevopz', permanent: true },
        { source: '/about', destination: '/prodevopz', permanent: true },
      ]);
  },
};

export default nextConfig;
