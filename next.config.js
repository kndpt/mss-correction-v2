const { withPlausibleProxy } = require('next-plausible');

module.exports = withPlausibleProxy()({
  trailingSlash: true,
  modularizeImports: {
    '@mui/material': {
      transform: '@mui/material/{{member}}',
    },
    '@mui/lab': {
      transform: '@mui/lab/{{member}}',
    },
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  images: {
    domains: ['logo.gralon.net', 'www.ladenise.com', 'lh3.googleusercontent.com'],
  },
});
