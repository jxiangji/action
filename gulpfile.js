const gulp = require("gulp"),
    babel = require("gulp-babel"),
    uglify = require("gulp-uglify"),//压缩js
    concat = require("gulp-concat"),//合并文件
    minifyCss = require("gulp-minify-css"),//压缩css
    clean = require('gulp-clean'),//清空文件(夹)
    runSequence = require('run-sequence');//顺序执行

const JS_SRC = "./src/js/**/*.js",
    CSS_SRC = "./src/css/**/*.css",
    DEST = "./dist/";

gulp.task("clean", (cb) => {
    return gulp.src([DEST + "*"], {read: false})
        .pipe(clean());
});

gulp.task("buildCss", () => {
    return gulp.src(CSS_SRC)
        .pipe(minifyCss())
        .pipe(gulp.dest(DEST + 'css'));
});

gulp.task("buildJs", () => {
    return gulp.src(JS_SRC)
        .pipe(babel())
        .pipe(uglify())
        .pipe(gulp.dest(DEST + 'js'));
});

gulp.task('build', callback => runSequence('clean', ['buildCss', 'buildJs'], callback));
