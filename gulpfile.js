var gulp   = require('gulp');
var jshint = require('gulp-jshint');
var sass   = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var browserSync = require('browser-sync').create();

var config = function () {
  var jsDir = './src/js';
  var scssDir = './src/scss';

  var config = {
    jsFiles: [
      jsDir + '/**/*.js',
    ],
    scssFiles: [
      scssDir + '/**/*.scss',
    ],
    destDir: './',
  };

  return config;
}();

gulp.task('default', ['watch']);

gulp.task('jshint', function() {
  return gulp.src(config.jsFiles)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('scripts', function() {
  return gulp.src(config.jsFiles)
    .pipe(sourcemaps.init())
    .pipe(concat('app.js'))
    .pipe(sourcemaps.write())
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

gulp.task('scripts-watch', browserSync.reload);
gulp.task('watch', function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
  gulp.watch(config.jsFiles, ['jshint', 'scripts', 'scripts-watch']);
  gulp.watch(config.scssFiles, ['styles']);
});