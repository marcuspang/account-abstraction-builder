/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["via.placeholder.com"],
  },
  env: {
    ALCHEMY_ID: process.env.ALCHEMY_ID,
    WALLET_CONNECT_PROJECT_ID: process.env.WALLET_CONNECT_PROJECT_ID,
  },
  // webpack: (config, { isServer }) => {
  //   if (!isServer) {
  //     config.resolve.fallback = {
  //       fs: false,
  //       net: false,
  //       tls: false,
  //       http2: false,
  //       dns: false,
  //     };
  //   }
  //   return config;
  // },
};

module.exports = nextConfig;
