const gulp = require('gulp');
const sass = require('gulp-sass');

sass.compiler = require('node-sass');

gulp.task('sass', () => {
  return gulp.src('./site/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist'));
});

function styles() {
  gulp.watch('./site/*.scss', gulp.series('sass'));

  return gulp.series('sass');
}

module.exports = {styles};
