module.exports = (options) => ({
  entry: {
    'station-overview': 'src/widgets/station-overview/index.js',
    'map-content': 'src/widgets/map-content/index.js'
  },

  host: '0.0.0.0',
  port: 3000,

  cleanDist: true,
  extractCSS: false,

  autoprefixer: {
    browsers: ['ios 7', 'chrome 30', 'ie 8', 'firefox 25', 'edge 12', 'safari 7'] // ~ august 2013
  },

   production: {
     webpack(cfg) {
       cfg.output.publicPath = './'
       return cfg
     },

     html: false,
     vendor: false,

     filename: {
       css: '[name].css',
       js: '[name].js',
     }
   }
})
