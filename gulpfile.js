const gulp = require('gulp')
const uglify = require('gulp-uglify')
const rename = require('gulp-rename')
const concat = require('gulp-concat')

gulp.task('default', function () {
  return gulp.src('./app/**/*.js')
    .pipe(concat('dd.js'))
    .pipe(gulp.dest('dist'))
    .pipe(rename('dd.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist'))
})
