/*
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
*/

module.exports = {
  i18n: {
    locales: ['fr', 'en'],
    defaultLocale: 'fr',
  },
  images: {
    deviceSizes: [320, 420, 768, 1024, 1200],
    domains: [
      'res.cloudinary.com',
      'cdn.pixabay.com',
      'media.istockphoto.com',
      'images.unsplash.com',
    ],
  },
};
