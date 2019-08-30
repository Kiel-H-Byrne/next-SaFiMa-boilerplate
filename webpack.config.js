module.exports = {
  externals: ['tls', 'net', 'fs'],
  node: {
    console: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  libraryTarget: 'commonjs',
  browser: {
    stripe: false
  },
  dllPlugin: {
    defaults: {
      exclude: ['stripe']
    }
  }
};
