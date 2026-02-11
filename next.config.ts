import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Existing config options
  experimental: {
    middlewarePrefetch: "strict",
  },
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  transpilePackages: ["next-mdx-remote"],
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
  extension: /\.mdx?$/, // Support files ending with .mdx or .md
  options: {
    remarkPlugins: [], // Add desired Remark plugins
    rehypePlugins: [], // Add desired Rehype plugins
  },
});

export default withMDX(nextConfig);
