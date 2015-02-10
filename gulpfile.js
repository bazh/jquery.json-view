'use strict';

var gulp = require('gulp');
var gulpJsHint = require('gulp-jshint');
var gulpConcat = require('gulp-concat');
var gulpUglify = require('gulp-uglify');
var gulpUglifySaveLicense = require('uglify-save-license');
var gulpHeader = require('gulp-header');
var gulpCsslint = require('gulp-csslint');
var gulpMinifyCSS = require('gulp-minify-css');


var pkg = require('./package.json');

var banner = [
    '/**',
    ' * <%= pkg.name %> - <%= pkg.description %>',
    ' * @version v<%= pkg.version %>',
    ' * @link <%= pkg.homepage %>',
    ' * @license <%= pkg.license %>',
    ' */',
    ''
].join('\n');

gulp.task('default', ['build-js', 'build-css']);
gulp.task('watch', function() {
    gulp.watch('src/**/*.js', ['build-js']);
    gulp.watch('src/**/*.css', ['build-css']);
});

gulp.task('build-js', ['hint-js', 'concat-js', 'uglify-js']);
gulp.task('build-css', ['lint-css', 'concat-css', 'minify-css']);

gulp.task('hint-js', function() {
    return gulp.src('src/**/*.js')
        .pipe(gulpJsHint())
        .pipe(gulpJsHint.reporter('jshint-stylish'));
});

gulp.task('concat-js', function() {
    return gulp.src('src/**/*.js')
        .pipe(gulpConcat('jquery.json-view.js'))
        .pipe(gulpHeader(banner, { pkg : pkg } ))
        .pipe(gulp.dest('dist'));
});

gulp.task('uglify-js', function() {
    return gulp.src('src/**/*.js')
        .pipe(gulpConcat('jquery.json-view.min.js'))
        .pipe(gulpHeader(banner, { pkg : pkg } ))
        .pipe(gulpUglify({
            preserveComments: gulpUglifySaveLicense
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('lint-css', function() {
    return gulp.src('src/**/*.css')
        .pipe(gulpCsslint())
        .pipe(gulpCsslint.reporter());
});

gulp.task('concat-css', function() {
    return gulp.src('src/**/*.css')
        .pipe(gulpConcat('jquery.json-view.css'))
        .pipe(gulpHeader(banner, { pkg : pkg } ))
        .pipe(gulp.dest('dist'));
});

gulp.task('minify-css', function() {
    return gulp.src('src/**/*.css')
        .pipe(gulpConcat('jquery.json-view.min.css'))
        .pipe(gulpHeader(banner, { pkg : pkg } ))
        .pipe(gulpMinifyCSS({
            keepBreaks: true
        }))
        .pipe(gulp.dest('dist'));
});
