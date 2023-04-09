/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  reactStrictMode: true,
  trailingSlash: true,
  output: "standalone",
};

export default nextConfig;
