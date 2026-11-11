import type { NextConfig } from "next";

const config: NextConfig = {
  reactStrictMode: false,
  // The stylesheet is small, so shipping it inside the HTML removes a render-blocking request.
  experimental: { inlineCss: true },
};

export default config;
