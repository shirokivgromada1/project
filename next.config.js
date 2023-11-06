module.exports = {
  sassOptions: {
    prependData: `@import "pages/variables.scss";`,
  },
  env: {
    BASE_URL: process.env.BASE_URL,
  },
  images: {
    dangerouslyAllowSVG: true,
    domains: ["assets.tina.io"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.tina.io",
      },
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/home",
      },
      {
        source: "/admin",
        destination: "/admin/index.html",
      },
    ];
  },
};
