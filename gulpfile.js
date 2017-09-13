var gulp = require('gulp');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var uglify = require('gulp-uglify');
var babelify   = require('babelify')
var buffer = require('vinyl-buffer');
var gap = require('gulp-append-prepend');
var argv = require('yargs').argv;
var gzip = require('gulp-gzip');
var Server = require('karma').Server;
var isProduction = (argv.prod === undefined) ? false : true;


gulp.task('scripts', function() {

    var dest = isProduction? "release/js":"dev/js"

    var b = browserify({
        entries: 'src/js/app.js',
        insertGlobals : true,
        debug : true
      }).transform(babelify,{presets: ["env"]})

      var basic = b.bundle()
      .pipe(source('app.js'))
      .pipe(buffer())
      .pipe(gap.prependFile('./node_modules/phaser/build/custom/pixi.min.js'))
      .pipe(gap.prependFile('./node_modules/phaser/build/custom/p2.min.js'))

      var complete = isProduction?basic.pipe(uglify()):basic
      
      complete.pipe(gulp.dest(dest))

      if(isProduction)
        gulp.src(dest+"/app.js").pipe(gzip()).pipe(gulp.dest(dest))
});

gulp.task('bundleTests', function() {
    
        var dest = isProduction? "release/js":"dev/js"
    
        var b = browserify({
            entries: 'src/tests/tests.js',
            insertGlobals : true,
            debug : true
          }).transform(babelify,{presets: ["env"]})
    
          b.bundle()
          .pipe(source('bundle.js'))
          .pipe(buffer())
          .pipe(gap.prependFile('./node_modules/phaser/build/custom/pixi.min.js'))
          .pipe(gap.prependFile('./node_modules/phaser/build/custom/p2.min.js'))
          .pipe(gulp.dest("src/tests"))
});

gulp.task('test',['bundleTests'], function (done) {
    new Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done).start();
});

gulp.task('html', function() {

    var dest = isProduction? "release/":"dev/"

    gulp.src("src/index.html")
    .pipe(gulp.dest(dest))

});

gulp.task('build', ['html', 'scripts']);