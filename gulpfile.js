var gulp = require('gulp'),
  size = require('gulp-size'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  jshint = require('gulp-jshint'),
  karma = require('karma');


var src = './scrollEvents.js',
  build = './',
  test = './test/**/*.js';

/**
 * Minify
 */
gulp.task('build', function() {
  return gulp
    .src(src)
    .pipe(size({
      title: 'Before compression'
    }))
    .pipe(uglify())
    .pipe(size({
      title: 'After compression'
    }))
    .pipe(size({
      title: 'Gzipped',
      gzip: true
    }))
    .pipe(rename('scrollEvents.min.js'))
    .pipe(gulp.dest(build));
});

/**
 * Let's lint the code as all cool kids do.
 */
gulp.task('lint', function() {
  return gulp
    .src(src)
    .pipe(jshint())
    .pipe(jshint.reporter(require('jshint-stylish')));
});

/**
 * Watch for changes
 */
gulp.task('watch', function() {
  gulp.watch(src, ['lint', 'build']);
});

/**
 * Launch karma test runner.
 */
gulp.task('test', function() {
  karma.server.start({
    configFile: require('path').join(__dirname, 'karma.conf.js')
  });
});

gulp.task('default', ['lint', 'build', 'watch', 'test']);