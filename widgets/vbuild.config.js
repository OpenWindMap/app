module.exports = (options) => ({
  entry: ['src/index.js'],

  host: '0.0.0.0',
  port: 3000,

  cleanDist: true,

  autoprefixer: {
    browsers: ['ios 7', 'chrome 30', 'ie 8', 'firefox 25', 'edge 12', 'safari 7'] // ~ august 2013
  },

   production: {
     webpack(cfg) {
       cfg.output.publicPath = './'
       return cfg
     }
   }
})
