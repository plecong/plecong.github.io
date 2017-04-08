// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var browserSync = require('browser-sync'),
    reload = browserSync.reload;
var less = require('gulp-less');
var cleanCSS = require('gulp-clean-css');
var LessPluginCleanCSS = require('less-plugin-clean-css'),
    cleancss = new LessPluginCleanCSS( /*{ advanced: true }*/ );
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

// Styles
gulp.task('less', function() {
    return gulp.src('less/main.less')
        .pipe(sourcemaps.init())
        .pipe(less({
            // plugins: [ cleancss ]
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('.'))
        .pipe(reload({ stream: true }));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src('js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('.'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('js/*.js', ['scripts']);
    gulp.watch('less/*.less', ['less']);
});

// Browser-Sync
gulp.task('serve', function() {
    browserSync({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch('js/*.js', ['scripts']);
    gulp.watch('less/*.less', ['less']);
    gulp.watch("*.html").on("change", reload);
    gulp.watch("*.css").on("change", reload);
});

// Default Task
gulp.task('default', ['less', 'scripts']);