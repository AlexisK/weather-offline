const gulp        = require('gulp');
const csso        = require('gulp-csso');
const less        = require('gulp-less');
const browserSync = require('browser-sync').create();
const typescript  = require('gulp-typescript');
const tsProject   = typescript.createProject('./tsconfig.json');

const CONST = {
    source : './src',
    target : './build'
};


gulp.task('build-cli-css', () => {
    gulp.src(`${CONST.source}/**/*.less`)
        .on('error', err => { throw err; })
        .pipe(less())
        .on('error', err => { throw err; })
        .pipe(csso())
        .pipe(gulp.dest(CONST.target))
        .pipe(browserSync.stream());
});

gulp.task('build-cli-js', () => {
    gulp.src(`${CONST.source}/**/*.js`)
        .pipe(gulp.dest(CONST.target))
        .pipe(browserSync.stream());
});

gulp.task('build-cli-ts', () => {
    tsProject.src()
        .pipe(typescript(tsProject))
        .pipe(gulp.dest(CONST.target))
        .pipe(browserSync.stream());
});

gulp.task('build-cli-html', () => {
    gulp.src(`${CONST.source}/**/*.html`)
        .pipe(gulp.dest(CONST.target))
        .pipe(browserSync.stream());
});

gulp.task('build-cli', ['build-cli-css', 'build-cli-js', 'build-cli-ts', 'build-cli-html'], () => {
    gulp.watch(`${CONST.source}/**/*.less`, ['build-cli-css']).on('change', browserSync.reload);
    gulp.watch(`${CONST.source}/**/*.js`, ['build-cli-js']).on('change', browserSync.reload);
    gulp.watch(`${CONST.source}/**/*.ts`, ['build-cli-ts']).on('change', browserSync.reload);
    gulp.watch(`${CONST.source}/**/*.html`, ['build-cli-html']).on('change', browserSync.reload);
});

gulp.task('serve', function () {
    browserSync.init({
        server : {
            baseDir : "./build/",
            routes: {
                "/node_modules":"./node_modules/"
            }
        }
    });
});


gulp.task('default', ['serve', 'build-cli']);
