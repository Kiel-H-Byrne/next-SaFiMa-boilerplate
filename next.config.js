const withCSS = require('@zeit/next-css')
const withSASS = require('@zeit/next-sass')

if (typeof require !== "undefined") {
  require.extensions[".less"] = () => {};
  require.extensions[".css"] = (file) => {};
}

const nextConfig = {
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: "[local]___[hash:base64:5]",
  },
  webpack(config,options) {
    return config;
  }
}


const withAssetRelocator = (nextConfig = {
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: "[local]___[hash:base64:5]",
  }
}) => {
  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      const { isServer } = options

      if (isServer) {
        config.node = Object.assign({}, config.node, {
          __dirname: false,
          __filename: false,
        })

        config.module.rules.unshift({
          test: /\.(m?js|node)$/,
          parser: { amd: false },
          use: {
            loader: '@zeit/webpack-asset-relocator-loader',
            options: {
              outputAssetBase: 'assets',
              existingAssetNames: [],
              wrapperCompatibility: true,
              escapeNonAnalyzableRequires: true,
            },
          },
        })
      }

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options)
      }
      return config
    },
  })
}

module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    // Important: return the modified config

    // Example using webpack option
    config.plugins.push(new webpack.IgnorePlugin(/\/__tests__\//));
    return nextConfig.webpack(config, options);
  },
  webpackDevMiddleware: config => {
    // Perform customizations to webpack dev middleware config
    // Important: return the modified config
    return config;
  },
  exportPathMap: async (defaultPathMap, {dev,dir,outDir,distDir,buildId}) => {
    await recursiveCopy (join(dir, 'src/htdocs/'), outDir, {dot:true});
    return defaultPathMap
  },
  env: {
    customKey: 'value',
  },
  distDir: process.env.NODE_ENV === 'production' ? `../build` : '.next',
  target: 'server'
};

module.exports = withAssetRelocator(withSASS(withCSS()))