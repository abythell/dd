const gulp = require('gulp')
const minify = require('gulp-minify')
const concat = require('gulp-concat')

gulp.task('default', function () {
  return gulp.src('./app/**/*.js')
    .pipe(concat('dd.js'))
    .pipe(minify())
    .pipe(gulp.dest('dist'))
})

gulp.task('watch', function () {
  gulp.watch('./app/**/*.js', gulp.series('default'))
})
