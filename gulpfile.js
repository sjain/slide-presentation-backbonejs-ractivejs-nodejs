var gulp   = require('gulp');
var jshint = require('gulp-jshint');
var sass   = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var browserSync = require('browser-sync').create();
var browserify = require('gulp-browserify');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var watchify = require('watchify');

global.WATCH_MODE = false;
global.PRODUCTION_MODE = (gutil.env.type === 'production');

var config = function () {
  var jsDir = './src/js';
  var scssDir = './src/scss';

  var config = {
    jsDir: jsDir,
    jsFiles: [
      jsDir + '/**/*.js',
    ],
    appEntryFiles: [jsDir + '/main.js'],
    scssDir: scssDir,
    scssFiles: [
      scssDir + '/**/*.scss',
    ],
    destDir: './',
    bundleJsFile: './app.js',
  };

  return config;
}();

gulp.task('default', ['watch']);

gulp.task('jshint', function() {
  return gulp.src(config.jsFiles)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

// Based on: http://blog.avisi.nl/2014/04/25/how-to-keep-a-fast-build-with-browserify-and-reactjs/
gulp.task('browserify', function() {
  var props = {entries: config.appEntryFiles};
  var bundler = WATCH_MODE ? watchify(props) : browserify(props);
  //bundler.transform(reactify);
  function rebundle() {
    var stream = bundler.bundle({debug: true});
    return stream.on('error', function () { gutil.log.bind(gutil, 'Browserify Error'); })
      .pipe(source(config.bundleJsFile))
      .pipe(gulp.dest(config.destDir));
  }
  bundler.on('update', function() {
    rebundle();
    setTimeout(browserSync.reload,1000); // HACK!! TODO revisit
    gutil.log('Rebundle...');
  });
  return rebundle();
});

gulp.task('styles', function() {
  return gulp.src(config.scssFiles)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(concat('styles.css'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.destDir))
    .pipe(browserSync.stream());
});

gulp.task('watch', function() {
  WATCH_MODE = true;
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
  gulp.watch(config.jsFiles, ['jshint', 'browserify']);
  gulp.watch(config.scssFiles, ['styles']);
});