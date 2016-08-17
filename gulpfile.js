const gulp       = require('gulp');
const csso       = require('gulp-csso');
const less       = require('gulp-less');
const typescript = require('gulp-typescript');
const tsProject  = typescript.createProject('./tsconfig.json');
const Path = require('path');
const Hapi       = require('hapi');
const Inert      = require('inert');
const server     = new Hapi.Server({
    connections: {
        routes: {
            files: {
                relativeTo: Path.join(__dirname, 'build')
            }
        }
    }
});

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
        .pipe(gulp.dest(CONST.target));
});

gulp.task('build-cli-js', () => {
    gulp.src(`${CONST.source}/**/*.js`)
        .pipe(gulp.dest(CONST.target));
    gulp.src(`${CONST.source}/**/*.json`)
        .pipe(gulp.dest(CONST.target));
});

gulp.task('build-cli-ts', () => {
    tsProject.src()
        .pipe(typescript(tsProject))
        .pipe(gulp.dest(CONST.target));
});

gulp.task('build-cli-html', () => {
    gulp.src(`${CONST.source}/**/*.html`)
        .pipe(gulp.dest(CONST.target));
});

gulp.task('build-cli', ['build-cli-css', 'build-cli-js', 'build-cli-ts', 'build-cli-html'], () => {
    gulp.watch(`${CONST.source}/**/*.less`, ['build-cli-css']);
    gulp.watch(`${CONST.source}/**/*.js`, ['build-cli-js']);
    gulp.watch(`${CONST.source}/**/*.ts`, ['build-cli-ts']);
    gulp.watch(`${CONST.source}/**/*.html`, ['build-cli-html']);
});

gulp.task('serve', function () {
    server.connection({
        host : 'localhost',
        port : 3000
    });

    server.register(Inert, () => {
        server.route({
            method  : 'GET',
            path    : '/node_modules/{path*}',
            handler : {
                directory: {
                    path: '../node_modules/'
                }
            }
        });

        server.route({
            method  : 'GET',
            path    : '/static/{path*}',
            handler : {
                directory: {
                    path: '../static/'
                }
            }
        });

        server.route({
            method  : 'GET',
            path    : '/{path*}',
            handler : {
                directory: {
                    path: '.',
                    index: true
                }
            }
        });

        server.start();
    });


    //browserSync.init({
    //    server : {
    //        baseDir : "./build/",
    //        routes: {
    //            "/node_modules":"./node_modules/",
    //            "/static":"./static/"
    //        }
    //    }
    //});
});


gulp.task('default', ['serve', 'build-cli']);
