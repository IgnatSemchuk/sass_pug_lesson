const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const clean = require('gulp-clean');
const concat = require('gulp-concat');
const runSequence = require('run-sequence');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const pug = require('gulp-pug');

const distDirectory = 'dist';
const pugBlob = 'src/**/*.pug';
const imagesBlob = 'src/images/**';
const fontsBlob = 'src/fonts/**';
const stylesBlob = 'src/scss/**';
const stylesComponents = 'src/components/*.scss';


gulp.task('default', function () {
  return runSequence('build', 'serve');
  });

gulp.task('build', function () {
  return runSequence(
    'cleanDist',
    ['processStyles', 'processPug', 'processImages', 'processFonts']
    );
  });

gulp.task('serve', function () {
  browserSync.init({
    server: {
      baseDir: distDirectory
    }
    });

  gulp.watch(pugBlob, function () {
    return runSequence('processPug', 'reloadBrowser');
    });

  gulp.watch(imagesBlob, function () {
    return runSequence('processImages', 'reloadBrowser');
    });

  gulp.watch(fontsBlob, function () {
    return runSequence('processFonts', 'reloadBrowser');
    });

  gulp.watch(stylesBlob, function () {
    return runSequence('processStyles', 'reloadBrowser');
    });
  gulp.watch(stylesComponents, function () {
    return runSequence('processStyles', 'reloadBrowser');
    });
  });

gulp.task('cleanDist', function () {
  return gulp.src(distDirectory, {read: false, allowEmpty: true}).pipe(clean());
  });

gulp.task('processPug', function () {
  return gulp.src(pugBlob)
  .pipe(pug({
    pretty: true
    // Your options in here.
    }))
  .pipe(gulp.dest(distDirectory));
  });

gulp.task('processImages', function () {
  return gulp.src(imagesBlob)
  .pipe(gulp.dest(`${distDirectory}/images/`));
  });

gulp.task('processFonts', function () {
  return gulp.src(fontsBlob)
  .pipe(gulp.dest(`${distDirectory}/fonts/`));
  });

gulp.task('processStyles', function () {
  return gulp.src("src/scss/main.scss")
  .pipe(sass().on('error', sass.logError))
  .pipe(autoprefixer({
    browsers: ['last 2 versions']
    }))
  .pipe(gulp.dest(`${distDirectory}/css/`));
  });

gulp.task('reloadBrowser', function (done) {
  browserSync.reload();
  done();
  });