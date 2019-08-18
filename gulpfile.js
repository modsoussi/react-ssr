const gulp = require('gulp');
const log = require('fancy-log');
const color = require('ansi-colors');
const { devServer, build } = require('./build/bundle');
const serve = require('./build/express');

const { parallel, series, watch } = gulp;
const env = process.env.NODE_ENV || 'development';

log('Envrionment:', color.bold.cyan(env));
if (env === 'development') {
  gulp.task('default', series(parallel(build, devServer), serve));
} else {
  gulp.task('default', build);
}

if (env === 'development') {
  watch(['src/**/*.js', 'src/**/*.jsx'], (callback) => {
    series(build, serve)();
    callback();
  });

  watch(['./server.js'], (callback) => {
    serve();
    callback();
  });
}
