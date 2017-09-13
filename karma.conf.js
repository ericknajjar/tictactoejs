module.exports = function(config) {
    config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [ 
        'src/tests/bundle.js'
    ], //includes also a list of other dependencies like Angular , Angular Rout
    exclude: [],
    browsers: [
        'PhantomJS'
    ],
    singleRun: false,
    colors: true,
    logLevel: config.LOG_INFO
    });
};