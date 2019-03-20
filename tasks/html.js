const gulp = require('gulp');

gulp.task('html', () => {
  return gulp.src('./site/*.html')
    .pipe(gulp.dest('./dist'));
});

gulp.task('reload');

function html() {
  gulp.watch('./site/*.html', gulp.series('html'));

  return gulp.series('html');
}

module.exports = {html};
