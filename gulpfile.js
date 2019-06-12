const gulp = require('gulp');
const { devServer, build }= require('./build/react');
const serve = require('./build/express');
const { parallel, series, watch } = gulp;

gulp.task('default', series(parallel(build, devServer), serve));

watch(['src/**/*.js'], (callback) => {
  build();
  serve();
  callback();
});