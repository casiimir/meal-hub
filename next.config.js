/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: ["src/styles"],
    prependData: `
    @import "./src/styles/variables.scss";
    @import "./src/styles/color.scss";
    @import "./src/styles/variables/buttons.scss";
    @import "./src/styles/variables/gaps.scss";
    `,
  },
};

module.exports = nextConfig;
