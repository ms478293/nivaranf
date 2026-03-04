import createMDX from "@next/mdx";
import type { NextConfig } from "next";

function getSupabaseStoragePattern() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!supabaseUrl) return [];

  try {
    const hostname = new URL(supabaseUrl).hostname;
    return [
      {
        protocol: "https" as const,
        hostname,
        pathname: "/storage/v1/object/public/**",
      },
    ];
  } catch {
    return [];
  }
}

const nextConfig: NextConfig = {
  productionBrowserSourceMaps: true,
  // Existing config options
  experimental: {
    middlewarePrefetch: "strict",
    optimizePackageImports: [  // Tree-shake heavy icon/component libraries
      "lucide-react",
      "@radix-ui/react-icons",
      "class-variance-authority",
      "date-fns",
      "@heroicons/react",
      "framer-motion",
      "recharts",
      "react-icons",
    ],
  },
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  transpilePackages: ["next-mdx-remote"],
  
  // Performance optimizations
  compress: true,
  
  // Cache headers for better performance
  async headers() {
    return [
      {
        source: '/fonts/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=604800, stale-while-revalidate=86400',
          },
        ],
      },
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(self)',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin-allow-popups',
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://www.clarity.ms https://connect.facebook.net https://vercel.live https://*.vercel.app; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: blob: https: http:; font-src 'self' https://fonts.gstatic.com data:; connect-src 'self' https: wss:; frame-src 'self' https://www.youtube.com https://youtube.com https://square.link https://vercel.live; media-src 'self' https:; object-src 'none'; base-uri 'self'; form-action 'self' https://square.link; frame-ancestors 'none'; upgrade-insecure-requests",
          },
        ],
      },
    ];
  },
  
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: getSupabaseStoragePattern(),
  },
  async redirects() {
    return [
      {
        source: '/contact',
        destination: '/contact-us',
        permanent: true,
      },
      {
        source: '/news-stories',
        destination: '/blogs',
        permanent: true,
      },
      {
        source: '/news-stories/:slug*',
        destination: '/blogs/:slug*',
        permanent: true,
      },
      {
        source: '/faq',
        destination: '/frequently-asked-questions',
        permanent: true,
      },
    ];
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
