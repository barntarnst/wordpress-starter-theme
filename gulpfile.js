require('es6-promise').polyfill()
var gulp = require('gulp')
var sass = require('gulp-sass')
var autoprefixer = require('gulp-autoprefixer')
var concat = require('gulp-concat')
var uglify = require('gulp-uglify')
var rename = require('gulp-rename')
var cleanCSS = require('gulp-clean-css')
var babel = require('gulp-babel')
var eslint = require('gulp-eslint')
var browserSync = require('browser-sync').create()
var reload = browserSync.reload
var config = require('./config.js')

gulp.task('js', function () {
  return gulp.src(['./js/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(babel())
    .pipe(concat('app.js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('./dist'))
})

gulp.task('sass', function () {
  return gulp.src('./sass/style.scss')
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('./dist'))
})

gulp.task('watch', function () {
  browserSync.init({
    files: ['./**/*.php'],
    proxy: config.proxy
  })
  gulp.watch('./sass/**/*.scss', ['sass', reload])
  gulp.watch('./js/*.js', ['js', reload])
})

gulp.task('default', ['sass', 'js', 'watch'])
