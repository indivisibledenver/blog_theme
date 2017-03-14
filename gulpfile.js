'use strict';

const gulp = require('gulp'),
      gulpInsert = require('gulp-insert'),
      gulpSass = require('gulp-sass'),
      gulpSourcemaps = require('gulp-sourcemaps'),
      vinylBuffer = require('vinyl-buffer'),
      vinylSourceStream = require('vinyl-source-stream');

const browserify = require('browserify'),
      watchify = require('watchify'),
      babelify = require('babelify');

const spawn = require('child_process').spawn;

const warningBanner = `/*******************************************************************************
* CAUTION!  DO NOT EDIT THIS FILE!                                             *
*                                                                              *
* This file was generated automatically, and any changes made to it will be    *
* overwritten.  Please do not edit it directly.                                *
*******************************************************************************/

`;

gulp.task('build:javascripts', function () {
  const bundler = browserify('./assets/javascripts/scripts.js')
    .transform(babelify, { presets: ["es2015"], sourceMaps: true });

  return bundler.bundle()
    .on('error', function (error) { console.error(error); this.emit('end'); })
    .pipe(vinylSourceStream('scripts.js'))
    .pipe(vinylBuffer())
    .pipe(gulpSourcemaps.init({ loadMaps: true }))
    .pipe(gulpInsert.prepend(warningBanner))
    .pipe(gulpSourcemaps.write('./'))
    .pipe(gulp.dest('./assets'))
})

gulp.task('watch:javascripts', function (cb) {
  gulp.watch('./assets/javascripts/**/*', gulp.series('build:javascripts'));
  cb();
})

gulp.task('build:stylesheets', function () {
  const sassOptions = {
    includePaths: []
      .concat(require('bourbon').includePaths)
      .concat(require('bourbon-neat').includePaths),
  };

  return gulp.src('./assets/stylesheets/**/*.{sass,scss}')
    .pipe(gulpSourcemaps.init())
    .pipe(gulpSass(sassOptions).on('error', gulpSass.logError))
    .pipe(gulpInsert.prepend(warningBanner))
    .pipe(gulpSourcemaps.write('./'))
    .pipe(gulp.dest('./assets'))
});

gulp.task('watch:stylesheets', function (cb) {
  gulp.watch('./assets/stylesheets/**/*', gulp.series('build:stylesheets'));
  cb();
});

gulp.task('build:assets', gulp.parallel('build:javascripts', 'build:stylesheets'));

gulp.task('watch:assets', gulp.parallel('watch:javascripts', 'watch:stylesheets'));

gulp.task('serve', gulp.series(
  'build:assets',
  gulp.parallel(
    'watch:assets',
    function () {
      spawn('node', ['../../../index.js'], {stdio: 'inherit'});
    }
  )
));
