const gulp = require('gulp');
const buildJS = require('./build/react');
const serve = require('./build/express');
const { parallel, series } = gulp;

gulp.task('default', buildJS);