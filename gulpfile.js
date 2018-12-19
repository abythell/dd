var gulp = require('gulp')
var uglify = require('gulp-uglify')
var rename = require('gulp-rename')
var concat = require('gulp-concat')

gulp.task('default', function () {
  return gulp.src('./app/**/*.js')
    .pipe(concat('dd.js'))
    .pipe(gulp.dest('dist'))
    .pipe(rename('dd.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist'))
})
