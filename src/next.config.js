require('dotenv').config()

const withCSS = require('@zeit/next-css')
const path = require('path')
const Dotenv = require('dotenv-webpack')

// https://nextjs.org/docs#custom-configuration
const setup = {
  // https://nextjs.org/docs#setting-a-custom-build-directory
  distDir: '../dist',
  webpack: (cfg, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      cfg.node = {
        fs: 'empty'
      }
    }
    cfg.plugins = cfg.plugins || []
    cfg.plugins = [
      ...cfg.plugins,
      new Dotenv({
        path: path.join(path.dirname(__dirname), '.env'),
        systemvars: true
      })
    ]
    const originalEntry = cfg.entry
    cfg.entry = async () => {
      const entries = await originalEntry()
      const urlPolyfill = './infra/Polyfill.js'
      if (entries['main.js'] && !entries['main.js'].includes(urlPolyfill)) {
        // https://github.com/zeit/next.js/blob/6ddb5ee3416ae027c8ecc82ab581ef7ae952ca77/examples/with-polyfills/next.config.js#L11
        entries['main.js'].unshift(urlPolyfill)
      }
      return entries
    }

    return cfg
  }
}

module.exports = withCSS(setup)
