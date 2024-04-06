/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental:{
        serverComponentsExternalPackages: ['bcrypt']
    },
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'my-blob-store.public.blob.vercel-storage.com',
            port: '',
          },
        ],
      },

      images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'eesarv0hsj9j2qg5.public.blob.vercel-storage.com',
          },
        ],
      },
};

module.exports = nextConfig;
