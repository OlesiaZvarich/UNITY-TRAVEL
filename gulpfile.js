let gulp = require('gulp');
let concat = require('gulp-concat');
let rename = require('gulp-rename');
let less = require('gulp-less');
let autoprefixer = require('gulp-autoprefixer');
let cssmin = require('gulp-clean-css');
let jsmin = require('gulp-uglify');
let webserver = require('gulp-webserver');
let livereload = require('gulp-livereload');

let path = {
    html: [
        './*.html'
    ],
    styles: {
        src: [

            './assets/styles/index.less'
        ],
        dependencies: [
            './assets/styles/'
        ],
        name: 'styles',
        dest: './build/'
    },
    scripts: {
        src: [
            './node_modules/jquery/dist/jquery.js',
            './assets/js/*.js'
        ],
        name: 'scripts',
        dest: './build/'
    }
};
let watchersPath = {
    html: [
        './*.html'
    ],
    styles: [
        './assets/styles/*.less'
    ],
    scripts: [
        './assets/js/*.js'
    ]
};

gulp.task('html', function () {
    return gulp.src(path.html)
        .pipe(livereload());// notify livereload server about changes
});

gulp.task('styles', function () {
    return gulp.src(path.styles.src)
        .pipe(concat('styles.less'))
        .pipe(less({
            paths: path.styles.dependencies
        }))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(rename(path.styles.name + '.css'))
        .pipe(gulp.dest(path.styles.dest))
        .pipe(cssmin())
        .pipe(rename(path.styles.name + '.min.css'))
        .pipe(gulp.dest(path.styles.dest))
        .pipe(livereload());
});

gulp.task('scripts', function () {
    return gulp.src(path.scripts.src)
        .pipe(concat('scripts.js'))
        .pipe(rename(path.scripts.name + '.js'))
        .pipe(gulp.dest(path.scripts.dest))
        // .pipe(jsmin())
        .pipe(rename(path.scripts.name + '.min.js'))
        .pipe(gulp.dest(path.scripts.dest))
        .pipe(livereload());
});

gulp.task('webserver', function() {
    gulp.src('./')
        .pipe(webserver({
            livereload: true,
            open: true,
            fallback: 'index.html'
        }));
});

gulp.task('watch', ['styles', 'scripts', 'webserver'], function() {
    livereload.listen();
    gulp.watch(watchersPath.html, ['html']);
    gulp.watch(watchersPath.styles, ['styles']);
    gulp.watch(watchersPath.scripts, ['scripts']);
});

gulp.task('build', ['styles', 'scripts']);

gulp.task('default', ['build']);
