/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: ["src/styles"],
    prependData: `
      @import "./src/styles/variables.scss";
      @import "./src/styles/variables/colors.scss";
      @import "./src/styles/variables/margins.scss";
      @import "./src/styles/variables/borders.scss";
      @import "./src/styles/variables/gaps.scss";
      @import "./src/styles/variables/paddings.scss";
      @import "./src/styles/variables/containerSpaces.scss";
      @import "./src/styles/variables/typography.scss";
      @import "./src/styles/variables/animations.scss";
      @import "./src/styles/helpers/functions.scss";
      @import "./src/styles/helpers/mixins.scss";
      @import "./src/styles/helpers/devices.scss";
      @import "./src/styles/fonts/fonts.scss";
      @import "./src/styles/components/button.scss";
      @import "./src/styles/components/container.scss";
      @import "./src/styles/components/badge.scss";
      @import "./src/styles/components/toggle.scss";
    `,
  },
};

module.exports = nextConfig;
