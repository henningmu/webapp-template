/* jshint camelcase:false */
var gulp = require('gulp');
var bower = require('gulp-bower');
var sass = require('gulp-ruby-sass');
var inject = require('gulp-inject');
var config = require('./gulp.config.json');

var sassLoadPaths = [
    config.sassPath
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
gulp.task('default', ['bower', 'css', 'index']);

