module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: ['> 1%', 'last 2 versions', 'not dead'],
          node: '18'
        },
        useBuiltIns: 'entry',
        corejs: 3,
        modules: false
      }
    ],
    [
      '@babel/preset-react',
      {
        runtime: 'automatic',
        development: process.env.NODE_ENV === 'development'
      }
    ]
  ],
  plugins: [
    // Add any additional Babel plugins here if needed
  ],
  env: {
    development: {
      plugins: [
        // Development-specific plugins
      ]
    },
    production: {
      plugins: [
        // Production-specific plugins
      ]
    }
  }
};
