/*!
* jchui
*
* Copyright olelev, 2023-2024,
* Common Clause license https://commonsclause.com/
*/

import fs from 'fs';
import path from 'path';
import {deleteAsync} from 'del';

import gulp from 'gulp';
import sourcemaps from 'gulp-sourcemaps';
import replace from 'gulp-replace-task';
import strip from 'gulp-strip-comments';

import rev from 'gulp-rev';
import revRewrite from 'gulp-rev-rewrite';

// JavaScript compilation.
import terser from 'gulp-terser';

// CSS compilation.
import concat from 'gulp-concat';
import cleanCSS from 'gulp-clean-css';
import stripcss from 'gulp-strip-css-comments';

// HTML compilation.
import htmlmin from 'gulp-htmlmin';
import foreach from 'gulp-foreach';

// CLEANUP

gulp.task('clean1', function(){
  return deleteAsync('dist/**', {force:true});
});

gulp.task('clean2', function(){
  return deleteAsync('build/**', {force:true});
});

// CSS

gulp.task('minify-css', function () {
  return gulp.src([
    './src/jchui.css'
  ])
  .pipe(sourcemaps.init())
  .pipe(cleanCSS({debug: true}))
  .pipe(concat('jchui.min.css'))
  .pipe(replace({
    patterns: [ {match: '/*!',replacement: '/*'}, ],
    usePrefix: false
  }))
  .pipe(stripcss())
  //.pipe(rev())
  .pipe(gulp.dest('dist'))
  //.pipe(rev.manifest('rev-manifest-css.json'))
  .pipe(gulp.dest('build'));
})

// JS

gulp.task('minify-js', function () {
  return gulp.src([
    'src/jchui.js',
  ])
  .pipe(concat('jchui.min.js'))
  .pipe(replace({
    patterns: [ {match: '/*!',replacement: '/*'}, ],
    usePrefix: false
  }))
  .pipe(terser())
  //.pipe(rev())
  .pipe(gulp.dest('dist'))
  //.pipe(rev.manifest('rev-manifest-js.json'))
  .pipe(gulp.dest('build'));
})


// run `gulp build` 
gulp.task('build', gulp.series(
  'clean1',
  'clean2',
  'minify-css',
  'minify-js',
))

// run just `gulp`
gulp.task('default', gulp.series('build'))
