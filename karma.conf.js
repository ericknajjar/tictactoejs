module.exports = function(config) {
    config.set({
    basePath: '',
    frameworks: ['jasmine','source-map-support'],
    files: [ 
        'src/tests/bundle.js'
    ], //includes also a list of other dependencies like Angular , Angular Rout
    exclude: [],
    browsers: [
        'Chrome'
    ],
    singleRun: false,
    colors: true,
    logLevel: config.LOG_INFO
    });
};