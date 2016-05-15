var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var sourcemaps = require('gulp-sourcemaps');
var template = require('gulp-template-compile');
var concat = require('gulp-concat');
var amdOptimize = require("amd-optimize");
var addSrc = require("gulp-add-src");
var processhtml = require('gulp-processhtml');
var server = require('gulp-develop-server');

// run server
// TODO: configure with livereload if necessary
gulp.task( 'server:start', function() {
    server.listen( { path: './server/server.js' } );
});

/**
 * Compile the sass files
 */
gulp.task('sass', function () {
    return sass('assets/scss/styles.scss', { style: 'expanded', sourcemap: true })
        .on('error', function (err) {
            console.error('\x07(!) Error!', err.message);
            this.emit('end');
        })
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('assets/css'));
});

/**
 * Build the templates.js file based on the html files from the /templates folder
 */
gulp.task('templates', function() {
    return gulp.src('templates/*.html')
        .pipe(template({
            namespace: '_templates_app_',
            templateSettings: {
                // evaluate:    /\{\{#([\s\S]+?)\}\}/g,            // {{# console.log("blah") }}
                // interpolate: /\{\{\{(\s*\w+?\s*)\}\}\}/g,       // {{ title }}
                // escape:      /\{\{(\s*\w+?\s*)\}\}(?!\})/g,     // {{{ title }}}
            }
        }).on('error', function (err) {
            console.log("\x07(!) There is a syntax error in the file: " + err.fileName);
            this.emit('end');
        }))
        .pipe(concat('templates.js'))
        .pipe(gulp.dest('assets/js/app'));
});

/**
 * Watch for any file changes and use livereload
 */
gulp.task('watch', function() {

    // development files
    gulp.watch('assets/scss/**/*.scss', ['sass']);

    gulp.watch('templates/**/*.html', ['templates']);

    // watch the nodejs server
    gulp.watch('server/*.js', server.restart);

});

/**
 * Process the html files to remove the requirejs script.
 */
gulp.task('build-html', function() {
    return gulp.src('*.html')
        .pipe(processhtml())
        .pipe(gulp.dest('dist'));
});

/**
 * Copy all the static assets to the dist folder
 */
gulp.task('build-assets', ['sass'], function() {
    return gulp.src(['assets/**/*.*', '!assets/**/*.{js,scss,sass}'])
        .pipe(gulp.dest('dist/assets'));
});

/**
 * Merge all the js files using amd-optimize
 */
gulp.task('build-js', ['templates'], function() {
    return gulp.src("assets/js/**/*.js")
        // Traces all modules and outputs them in the correct order.
        .pipe(amdOptimize("main", {
            configFile: 'assets/js/main.js'
        }))
        .pipe(addSrc.prepend('assets/js/libs/almond.js'))
        .pipe(concat("main.all.js"))
        .pipe(gulp.dest("dist/assets/js"));
});

// we will not do a build since this is meant to run locally and not on
// a remote server
// gulp.task('build', ['build-js', 'build-assets', 'build-html']);
gulp.task('develop', ['sass', 'templates', 'watch', 'server:start']);

gulp.task('default', ['develop']);
