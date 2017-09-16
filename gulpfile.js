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
var serve = require('gulp-serve');
var concat = require('gulp-concat');
var gulpif = require('gulp-if');
var gulpsync = require('gulp-sync')(gulp);

var isProduction = (argv.prod === undefined) ? false : true;
var withLibs = (argv.withlibs === undefined) ? false : true;

var phaserLibsPath = './node_modules/phaser/build/custom/';

gulp.task('scripts', function() {

    var dest = isProduction? "release/js":"dev/js"

    var b = browserify({
        entries: 'src/js/app.js',
        insertGlobals : true,
        debug : !isProduction
      }).transform(babelify,{presets: ["env"]})

     return producer = b.bundle()
      .pipe(source('app.js'))
      .pipe(buffer())
      .pipe(gulpif(isProduction,uglify()))
      .pipe(gulp.dest(dest))
});


gulp.task('libs',function(){
    var dest = isProduction? "release/js/libs":"dev/js/libs"

    //    phaserLibsPath+'p2.min.js',
    return gulp.src([phaserLibsPath+'pixi.min.js',
    phaserLibsPath+'phaser-no-physics.min.js'])
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest(dest));

});

gulp.task('gzip',function(){
    var dest = isProduction? "release/":"dev/"
    return gulp.src(dest+"**/*.js")
    .pipe(gzip())
    .pipe(gulp.dest(dest))
    
});

gulp.task('bundleTests', function() {
        
        var b = browserify({
            entries: 'src/js/tests/tests.js',
            insertGlobals : true,
            debug : true
          }).transform(babelify,{presets: ["env"]})
    
         return b.bundle()
          .pipe(source('bundle.js'))
          .pipe(buffer())
          .pipe(gulp.dest("src/js/tests"))
});

gulp.task('test',['bundleTests'], function (done) {

    return new Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true,
    }, done).start();
});

gulp.task('html', function() {

    var dest = isProduction? "release/":"dev/"

    return gulp.src("src/index.html")
    .pipe(gulp.dest(dest))

});

gulp.task('assets', function() {
    
    var dest = isProduction? "release/assets":"dev/assets"

    return gulp.src("src/assets/**/*")
    .pipe(gulp.dest(dest))
});

gulp.task('serve',['build'], serve({
    root: isProduction?["release"]:["dev"],
    port: 8080,
  }));

var buildSubtasks = ['html', 'scripts',"assets"]

if(withLibs)
    buildSubtasks.push('libs');

if(isProduction)
    buildSubtasks.push('gzip');

gulp.task('build',gulpsync.sync(buildSubtasks) );