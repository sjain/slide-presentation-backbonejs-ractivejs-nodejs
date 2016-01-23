var gulp   = require('gulp');
var jshint = require('gulp-jshint');
var sass   = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var browserSync = require('browser-sync').create();
var browserify = require('gulp-browserify');
var gutil = require('gulp-util');
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

gulp.task('browserify', function(cb) {
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