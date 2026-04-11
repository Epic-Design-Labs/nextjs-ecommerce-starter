import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    // Add remote image domains here when using real product images
    // remotePatterns: [
    //   { protocol: "https", hostname: "cdn.example.com" },
    // ],
  },

  async redirects() {
    return [
      // Example redirects — add your own as needed
      // {
      //   source: "/old-product-slug",
      //   destination: "/new-product-slug",
      //   permanent: true, // 301
      // },
    ];
  },
};

export default withNextIntl(nextConfig);
