"use strict";


/*** Start plugins ***/

const gulp = require('gulp'),
  path = require('path'),
  gulpIf = require('gulp-if'),
  less = require('gulp-less'),
  pug = require('gulp-pug'),
  sourcemaps = require('gulp-sourcemaps'),
  postcss = require('gulp-postcss'),
  bs = require('browser-sync'),
  webpack = require('webpack'),
  gulpWebpack = require('gulp-webpack'),
  imagemin = require('gulp-imagemin'),
  newer = require('gulp-newer');

/*** End plugins ***/


/*** Start project paths ***/

let isDev = process.env.NODE_ENV == 'development',

  baseDir = __dirname,

  frontEnd = `${baseDir}/frontEnd/`,
  inputLayouts = `${frontEnd}/components/`,
  inputStyles = `${frontEnd}/styles/`,
  inputScripts = `${frontEnd}/scripts/`,
  inputImgs = `${frontEnd}/imgs/`,
  inputFonts = `${frontEnd}/fonts/`,

  build = `${baseDir}/build/`,
  outputStyles = `${build}/style/`,
  outputScripts = `${build}/script/`,
  outputImgs = `${build}/imgs/`,
  outputFonts = `${build}/fonts/`;


/*** End project paths ***/


/*** Start layouts task ***/

gulp.task("layouts", () => {
return gulp.src(`${inputLayouts}/index.pug`)
  .pipe(pug())
  .pipe(gulp.dest(build));
});

/*** End layouts task ***/


/*** Start styles task ***/

gulp.task("styles", () => {
  return gulp.src(`${inputStyles}/main.less`)
    .pipe(gulpIf(isDev, sourcemaps.init()))
    .pipe(less())
    .pipe(postcss())
    .pipe(gulpIf(isDev, sourcemaps.write('./')))
    .pipe(gulp.dest(outputStyles));
});

/*** End styles task ***/


/*** Start pics task ***/

gulp.task("pics", () => {
  return gulp.src(`${inputImgs}/*.*`, {since: gulp.lastRun('pics')})
    .pipe(newer(`${inputImgs}/`))
    .pipe(imagemin())
    .pipe(gulp.dest(`${outputImgs}`));
});

/*** End pics task ***/


/*** Start js task ***/

gulp.task('js', () => {
  return gulp.src(`${inputScripts}/main.js`)
    .pipe(gulpWebpack(require('./webpack.config.js'), webpack))
    .pipe(gulp.dest(outputScripts));
});

/*** End js task ***/


/*** Start fonts task ***/

gulp.task('fonts', () => {
  return gulp.src(`${inputFonts}/*.*`)
    .pipe(gulp.dest(`${outputFonts}/`));
});

/*** End fonts task ***/


/*** Start serve task ***/

gulp.task("serve", (done) => {
  bs.init({
    server: {
      baseDir: build
    }
  });
  done();
});

/*** End serve task ***/


/*** Start watch task ***/

gulp.task('watch', (done) => {
  gulp.watch(`${inputLayouts}/**/*.pug`, gulp.series('layouts'));
  gulp.watch( [`${inputStyles}/**/*.less`, `${inputLayouts}/**/*.less`], gulp.series('styles') );
  gulp.watch( `${inputImgs}/*.*`, gulp.series('pics') );
  gulp.watch( [`${inputScripts}/*.js`, `${inputLayouts}/**/*.js`], gulp.series('js') );
  gulp.watch( `${inputFonts}/*.*`, gulp.series('fonts') );

  done();
});

/*** End watch task ***/


gulp.task('default', gulp.series(
  gulp.parallel(
    'layouts', 'pics', 'fonts', 'styles', 'js'
  ),
  'serve',
  'watch'
), (done) => {
  done();
});
