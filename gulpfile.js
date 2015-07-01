/* jshint camelcase:false */
var gulp = require('gulp');
var bower = require('gulp-bower');
var sass = require('gulp-ruby-sass');
var inject = require('gulp-inject');
var merge = require('merge-stream');
var config = require('./gulp.config.json');

var sassLoadPaths = [
    config.sassPath,
    config.bowerDir + "/fontawesome/scss",
    config.bowerDir + "/mdi/scss",
    config.bowerDir + "/materialize/sass"
];

/** ====================
 *      Gulp Tasks
 * ==================== */
/**
 * Runs 'bower install'
 * */
gulp.task('bower', function () {
    return bower()
        .pipe(gulp.dest(config.bowerDir))
});

/**
 * Copies the fonts into the assets directory
 * */
gulp.task('fonts', function () {
    var fonts = gulp.src(config.bowerDir + '/fontawesome/fonts/**.*')
        .pipe(gulp.src(config.bowerDir + '/mdi/fonts/**.*'))
        .pipe(gulp.dest('./assets/fonts'));
    var roboto = gulp.src(config.bowerDir + '/materialize/font/roboto/**.*')
        .pipe(gulp.dest('./assets/font/roboto'));
    var mdi = gulp.src(config.bowerDir + '/materialize/font/material-design-icons/**.*')
        .pipe(gulp.dest('./assets/font/material-design-icons'));

    return merge(fonts, roboto).add(mdi);
});

/**
 * Compiles the scss to css
 * */
gulp.task('css', function () {
    return sass(config.sassPath + "/style.scss", {
        "style": "compressed",
        "loadPath": sassLoadPaths
    }).on("error", function (err) {
        console.error("Error while compiling scss to css: ", err.message);
    }).pipe(gulp.dest(config.cssPath));
});

/**
 * Injects all scripts and css into the index.html
 * */
gulp.task('index', function () {
    var target = gulp.src('./app/index.html');
    var sources = gulp.src([].concat(config.jsLibs, config.js, config.cssPath + "/style.css"), {read: false});

    return target.pipe(inject(sources, {relative: true}))
        .pipe(gulp.dest('./app'));
});

/**
 * Watches the directories for scss changes and triggers rebuild of css
 * */
gulp.task('watch', function () {
    gulp.watch(config.sassPath + '/**/*.scss', ['css']);
});

/** ===============
 *  Default Task
 * =============== */
gulp.task('default', ['bower', 'fonts', 'css', 'index']);

