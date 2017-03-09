const gulp = require('gulp');

const spawn = require('child_process').spawn;

gulp.task('serve', function () {
  spawn('node', ['../../../index.js'], {stdio: 'inherit'});
});
