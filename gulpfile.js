const gulp = require('gulp');
const log = require('fancy-log');
const color = require('ansi-colors');
const { devServer, serverBuild, clientBuild } = require('./build/bundle');
const serve = require('./build/express');

const { parallel, series, watch } = gulp;
const env = process.env.NODE_ENV || 'development';

log('Envrionment:', color.bold.cyan(env));
if (env === 'development') {
  gulp.task('default', series(parallel(serverBuild, clientBuild, devServer), serve));
} else {
  gulp.task('default', parallel(serverBuild, clientBuild, (cb) => {
    cb();
  }));
}

watch(['src/**/*.js'], (callback) => {
  series(parallel(serverBuild, clientBuild), serve)();
  callback();
});

watch(['./server.js'], (callback) => {
  serve();
  callback();
});
