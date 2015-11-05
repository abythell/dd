var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    del = require('del');

gulp.task('clean', function () {  
  return gulp.src('dist', {read: false})
    .pipe(clean());
});

gulp.task('test', function() {
   return gulp.src('./app/**/*.js')
           .pipe(jshint()).pipe(jshint.reporter('default'))
	   .pipe(concat('dd.js'))
	   .pipe(gulp.dest(''))
	   .pipe(uglify())
	   .pipe(rename('dd.min.js'))
	   .pipe(gulp.dest(''))
});
