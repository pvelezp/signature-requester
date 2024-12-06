// next.config.js
module.exports = {
  webpack(config) {
    // Ensure pdf.worker.js is properly handled
    config.resolve.fallback = {
      fs: false,
      path: false,
      os: false,
    };

    return config;
  },
};
