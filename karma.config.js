module.exports = function(config) {
  config.set({
 
    basePath: '',
 
    frameworks: ['mocha', 'chai'],
 
    files: [
        'node_modules/babel-polyfill/browser.js',
        'test/*.js'
    ],
 
    exclude: [
         
    ],
 
    preprocessors: {
        'test/*.js': ['webpack']
    },
 
    webpack: {
        resolve: {
            extensions: ["", ".js", ".jsx", ".json", ".scss"]
        },
        module: {
            loaders: [            {
                test: /\.js$|\.jsx$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            }]
        }
    },
 
    webpackMiddleware: {
        noInfo: true
    },
 
    plugins: [
        require('karma-webpack'),
        require('karma-chrome-launcher'),
        require('karma-firefox-launcher'),
        require('karma-safari-launcher'),
        require('karma-phantomjs-launcher'),
        require('karma-ie-launcher'),
        require('karma-mocha'),
        require('karma-chai')
    ],
 
    reporters: ['progress'],
 
    port: 9867,
 
    colors: true,
 
    logLevel: config.LOG_INFO,
 
    autoWatch: false,
 
    browsers: ['PhantomJS', 'Chrome', 'Firefox', 'IE', 'Safari'],
 
    singleRun: true,
 
    concurrency: Infinity
  })
}
