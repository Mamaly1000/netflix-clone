/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: "mango.blender.org",
      },
      {
        hostname: "uhdtv.io",
      },
      { hostname: "upload.wikimedia.org" },
      { hostname: "res.cloudinary.com" },
    ],
  },
};

module.exports = nextConfig;
