const gulp = require('gulp');
const { devServer, build }= require('./build/react');
const serve = require('./build/express');
const { parallel, series, watch } = gulp;
const env = process.env.NODE_ENV || 'development';
const log = require('fancy-log');
const color = require('ansi-colors');


log('Envrionment:', color.bold.cyan(env));
if (env === 'development') {
  gulp.task('default', series(parallel(build, devServer), serve));
} else {
  gulp.task('default', series(build));
}


watch(['src/**/*.js'], (callback) => {
  series(build, serve)();
  callback();
});