/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  output: 'export',
  webpack: (config, { dev }) => {
  config.resolve.fallback = { crypto: false }; // Add this line
  
  // Existing Babel configuration
  config.module.rules.push({
    test: /\.js$/,
    use: [
      {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
          plugins: ['@babel/plugin-proposal-private-methods', '@babel/plugin-proposal-class-properties']
        }
      }
    ]
  });

  // Disable cache in development
  if (dev) {
    config.cache = false;
  }

  return config;
}

module.exports = nextConfig;
