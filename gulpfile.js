// TODO: continue work with nav component, need to apply mobile first approach,
//    it was opened on iphone and mobile first really need
// Done
// TODO: try to solve problem when pics with different sizes (especially with
//      different heights) need to be showed in one line on one level (align-items by
//       flex doesn`t fit, it might be like in uno psd template)

// TODO: autohide nav menu
// Done

// TODO: encode sprites
// Done

// TODO: ie fallback (ie11 doesn`t support rain effect at full power)
// Done

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
  gulpConcat = require('gulp-concat'),
  gulpUglify = require('gulp-uglify'),
  imagemin = require('gulp-imagemin'),
  newer = require('gulp-newer'),
  gulpSpritesmith = require('gulp.spritesmith'),
  glslify = require("glslify");

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
    .pipe(newer(`${inputImgs}/*.*`))
    .pipe(imagemin())
    .pipe(gulp.dest(`${outputImgs}`));
});

/*** End pics task ***/


/*** Start sprites task ***/

gulp.task('sprites', () => {
  return gulp.src(`${inputImgs}/sprites/*.png`)
  .pipe(gulpSpritesmith({
    imgName: 'sprites.png',
    cssName: 'sprites.css'
  }))
  .pipe(gulp.dest(`${inputImgs}/sprites/compSprites/`));
});

/*** End sprites task ***/

gulp.task('libs', () => {
  return gulp.src(`${inputScripts}/libs/**/*.js`)
    .pipe(gulpConcat('libs.js'))
    .pipe(gulpUglify())
    .pipe(gulp.dest(`${outputScripts}/libs/`));
});


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
  gulp.watch( `${inputImgs}/sprites/*.png`, gulp.series('sprites') );



  done();
});

/*** End watch task ***/


gulp.task('default', gulp.series(
  gulp.parallel(
    'layouts', 'pics', 'fonts', 'styles', 'sprites', 'libs', 'js'
  ),
  'serve',
  'watch'
), (done) => {
  done();
});
