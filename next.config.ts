import type { NextConfig } from "next";

const securityHeaders = [
  // Clickjacking protection – fixes [10020]
  { key: 'X-Frame-Options', value: 'DENY' },
  // or use CSP frame-ancestors instead (see CSP below)

  // MIME sniffing protection – fixes [10021]
  { key: 'X-Content-Type-Options', value: 'nosniff' },

  // Basic CSP – fixes [10038] (tweak as needed)
  {
    key: 'Content-Security-Policy',
    value: `
      default-src 'self';
      script-src 'self' 'unsafe-inline' 'unsafe-eval';
      style-src 'self' 'unsafe-inline';
      img-src 'self' data: blob:;
      font-src 'self' data:;
      connect-src 'self';
      frame-ancestors 'none';
      base-uri 'self';
      form-action 'self';
    `.replaceAll(/\s{2,}/g, ' ').trim(),
  },

  // Limit browser features – fixes [10063]
  {
    key: 'Permissions-Policy',
    // block everything by default, open up only what you really use
    value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
  },

  // Referrer policy (good practice)
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },

  // Optional: extra hardening
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
];

const nextConfig: NextConfig = {
  output: "standalone",
  reactStrictMode: true,
  swcMinify: true,
  poweredByHeader: false,
  async headers() {
    return [
      {
        // apply to all routes
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
