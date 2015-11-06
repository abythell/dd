var gulp = require('gulp'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    watch = require('gulp-watch');

gulp.task('lint', function() {
    return gulp.src('./app/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('scripts', function() {
    return gulp.src('./app/**/*.js')
        .pipe(concat('dd.js'))
        .pipe(gulp.dest('dist'))
        .pipe(rename('dd.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
    gulp.watch('./app/**/*.js', ['lint', 'scripts']);
});

// Default Task
gulp.task('default', ['lint', 'scripts']);
