var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var sassLint = require('gulp-sass-lint');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require("gulp-util");
var plumber = require('gulp-plumber');
var prefix = require('gulp-autoprefixer');
var notify = require('gulp-notify');
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var webpackConfig = require("./webpack.config.js");
var stream = require('webpack-stream');
var browserSync = require('browser-sync');
var Server = require('karma').Server;

gulp.task('webpack', [], function () {
    return gulp.src(path.ALL)
        .pipe(sourcemaps.init())
        .pipe(stream(webpackConfig))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.DEST_BUILD));
});

gulp.task('sass', function () {
    gulp.src(path.SCSS)
        .pipe(sassLint())
        .pipe(sassLint.format())
        .pipe(sassLint.failOnError())
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(prefix('last 2 versions', '> 1%', 'ie 8', 'Android 2', 'Firefox ESR'))
        .pipe(plumber())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.CSS))
        .pipe(notify({
            sound: 'Beep',
            message: 'Such minify, much develop'
        }
        ));
});

gulp.task('browser-sync', function () {
    browserSync.init(['src/sass/**/*.scss', 'src/js/**/*.js', 'src/js/*.js', 'index.html'], {
        server: {
            baseDir: './'
        },
        reloadDelay: 2000
    });
});

gulp.task('images', () => {
    return gulp.src(path.IMAGE)
        .pipe(gulp.dest(path.IMAGE_OUT));
});

gulp.task("webpack-dev-server", function (callback) {
    var myConfig = Object.create(webpackConfig);
    myConfig.devtool = "eval";
    myConfig.debug = false;

    new WebpackDevServer(webpack(myConfig), {
        publicPath: "/" + myConfig.output.publicPath,
        historyApiFallback: true,
        stats: {
            colors: true
        }
    }).listen(3030, "localhost", function (err) {
        if (err) throw new gutil.PluginError("webpack-dev-server", err);
        gutil.log("[webpack-dev-server]", "http://localhost:3000");
    });
});

gulp.task('test:browsers', function (done) {
  new Server({
    configFile: __dirname + '/karma.config.js',
    singleRun: true,
    autoWatch: false
  }, done).start();
});

gulp.task('test', function(done) {
    new Server({
        configFile: __dirname + '/karma.config.js',
        singleRun: true,
        autoWatch: false,
        browsers: ['PhantomJS']
    }, done).start();
});

gulp.task('test:watch', function(done) {
    new Server({
        configFile: __dirname + '/karma.config.js',
        singleRun: false,
        autoWatch: true,
        browsers: ['PhantomJS']
    }, done).start();
});

var path = {
    ALL: ['src/js/*.jsx', 'src/js/**/*.js', 'src/js/*.js', 'src/sass/**/*.scss', '*.html'],
    MINIFIED_OUT: 'app.min.js',
    DEST_BUILD: 'build/',
    SCSS: 'src/sass/*.scss',
    CSS: 'build/css/',
    HTML: '*.html',
    IMAGE: 'src/images/*',
    IMAGE_OUT: 'build/images/'
};

gulp.task('watch', function () {
    gulp.watch(path.ALL, ['webpack', 'sass', 'browser-sync']);
});

gulp.task('default', ['webpack-dev-server', 'images', 'watch', 'browser-sync']);
