const gulp = require('gulp');
const webpack = require('webpack');
const sass = require('gulp-sass');
const rm = require('gulp-rm');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const Browser = require('browser-sync');
const nunjucksRender = require('gulp-nunjucks-render');

const webpackConfig = require('./webpack').config;

sass.compiler = require('node-sass');

const browser = Browser.create();
const bundler = webpack(webpackConfig);

// Delete dist/ directory
gulp.task('clean', () => {
  return gulp.src(['node_modules/.cache/**/*','dist/**/*'], {read: false})
    .pipe(rm());
});

// Compile JS
function scripts() {
  return new Promise(resolve => webpack(webpackConfig, (err, stats) => {
    if (err) {
      console.log('Webpack', err);
    }

    console.log(stats.toString({}));

    resolve();
  }));
}

// Start dev server
function browserSync(done) {
  const config = {
    server: 'dist',
    middleware: [
      webpackDevMiddleware(bundler, { /* options */ }),
      webpackHotMiddleware(bundler)
    ]
  };

  browser.init(config);

  done();
}

function browserSyncReload(done) {
  browser.reload();
  done();
}

// Sass
gulp.task('sass', () => {
  return gulp.src('./site/scss/**/*.scss')
    .pipe(sass({includePaths: ['node_modules']}).on('error', sass.logError))
    .pipe(browser.stream())
    .pipe(gulp.dest('./dist/css'));
});

// HTML
gulp.task('html', () => {
  return gulp.src('./site/pages/**/*.+(html|nunjucks)')
    .pipe(nunjucksRender({path: './site/pages/templates'}))
    .pipe(gulp.dest('./dist'));
});

// Assets
gulp.task('assets', () => {
  return gulp.src('./site/assets/**/*')
    .pipe(gulp.dest('./dist/assets'));
});

// Watch, build, and reload on changes
gulp.task('watch', () => {
  gulp.watch('./site/scss/**/*.scss', gulp.series('sass'));
  gulp.watch('./site/pages/**/*.+(html|nunjucks)', gulp.series('html', browserSyncReload));
  gulp.watch('./site/assets/**/*', gulp.series('assets', browserSyncReload));
  gulp.watch('site/**/*.js', gulp.series(browserSyncReload));
});

const build = gulp.series('clean', gulp.parallel(scripts, 'sass', 'html', 'assets'));

const dev = gulp.series(build, browserSync, 'watch');

module.exports = {default: dev, dev, build};
