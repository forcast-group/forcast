/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    instrumentationHook: true,
  },
  // https://github.com/mswjs/msw/issues/2291#issuecomment-2360465621
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = [...(config.externals || []), '_http_common'];
      config.target = 'node';
    }
    return config;
  },
};

export default nextConfig;
