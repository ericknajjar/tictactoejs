
const ChromiumRevision = require('puppeteer/package.json').puppeteer.chromium_revision
const Downloader = require('puppeteer/utils/ChromiumDownloader')
const revisionInfo = Downloader.revisionInfo(Downloader.currentPlatform(), ChromiumRevision)

process.env.CHROME_BIN = revisionInfo.executablePath

module.exports = function(config) {
    config.set({
    basePath: '',
    frameworks: ['jasmine','source-map-support'],
    files: [ 
        'src/js/tests/bundle.js'
    ], //includes also a list of other dependencies like Angular , Angular Rout
    exclude: [],
    browsers: [
        'ChromeHeadless'
    ],
    singleRun: false,
    colors: true,
    logLevel: config.LOG_INFO
    });
};