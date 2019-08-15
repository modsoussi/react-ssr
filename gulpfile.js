const gulp = require('gulp');
const { devServer, serverBuild, clientBuild } = require('./build/react');
const serve = require('./build/express');
const { parallel, series, watch } = gulp;
const env = process.env.NODE_ENV || 'development';
const log = require('fancy-log');
const color = require('ansi-colors');

log('Envrionment:', color.bold.cyan(env));
if (env === 'development') {
  gulp.task('default', series(parallel(serverBuild, clientBuild, devServer), serve));
} else {
  gulp.task('default', parallel(serverBuild, clientBuild, function(cb) {
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