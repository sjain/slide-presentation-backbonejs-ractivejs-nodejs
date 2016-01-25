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
var rename = require('gulp-rename');

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
gulp.task('scripts:watch', function() {
  var props = {entries: config.appEntryFiles};
  var bundler = watchify(props);
  //bundler.transform(reactify);
  function rebundle() {
    var stream = bundler.bundle({debug: true});
    return stream.on('error', function (err) {
      gutil.log(err.message);
      gutil.log.bind(gutil, 'Browserify Error');
      this.emit('end');
    })
      .pipe(source(config.bundleJsFile))
      .pipe(gulp.dest(config.destDir))
      .pipe(browserSync.stream({once: true}));
  }
  bundler.on('update', function() {
    rebundle();
    gutil.log('Rebundle...');
  });
  return rebundle();
});

gulp.task('browserify-once', function(cb) {
  gulp.src(config.jsDir + '/main.js', {read: false})
    .pipe(browserify({
      debug: !PRODUCTION_MODE,
      paths: ['./node_modules', config.jsDir],
      watcher: WATCH_MODE,
    }))
    .pipe(rename(config.bundleJsFile))
    .pipe(gulp.dest(config.destDir));
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

gulp.task('watch', ['scripts:watch'], function() {
  WATCH_MODE = true;
  browserSync.init({
    proxy: 'http://localhost:3000',
    port: 3001,
    browser: ["safari", "google chrome", "firefox"],
  }, function(err, bs) {
    if(err) {
      gutil.log(err);
    }
  });
  gulp.watch(config.jsFiles, ['jshint']);
  gulp.watch(config.scssFiles, ['styles']);
});