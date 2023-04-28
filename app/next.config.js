/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["via.placeholder.com", "storage.googleapis.com"],
  },
  env: {
    ALCHEMY_ID: process.env.ALCHEMY_ID,
    WALLET_CONNECT_PROJECT_ID: process.env.WALLET_CONNECT_PROJECT_ID,
    BACKEND_URL: process.env.BACKEND_URL,
  },
};

module.exports = nextConfig;
