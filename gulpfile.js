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
  return gulp.src(['./src/js/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(babel())
    .pipe(concat('app.js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js/'))
})
gulp.task('sass', function () {
  return gulp.src('./src/sass/style.scss')
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('./dist/css/'))
})
gulp.task('editor-styles', function () {
  return gulp.src('./src/sass/editor-styles.scss')
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(rename('editor-styles.css'))
    .pipe(gulp.dest('./dist/css/'))
})
gulp.task('watch', function () {
  browserSync.init({
    files: ['./**/*.php'],
    proxy: config.proxy
  })
  gulp.watch('./src/sass/**/*.scss', ['sass', reload])
  gulp.watch('./src/js/*.js', ['js', reload])
  gulp.watch('./src/sass/style-assets/_typography.scss', ['editor-styles', reload])
})
gulp.task('default', ['sass', 'js', 'watch', 'editor-styles'])

gulp.task('production', ['sass', 'js', 'editor-styles'])
