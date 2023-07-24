/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    additionalData: `@import "./styles/globals.scss" `,
  },
};

module.exports = nextConfig;
