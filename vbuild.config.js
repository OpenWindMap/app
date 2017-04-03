module.exports = (options) => ({
  entry: 'src/index.js',

  host: '0.0.0.0',
  port: 3000,

  cleanDist: true,

  webpack(cfg) {
    cfg.output.publicPath = './'
    return cfg
  },

  autoprefixer: {
    browsers: ['last 4 versions']
  }
})
