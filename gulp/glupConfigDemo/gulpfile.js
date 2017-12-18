var gulp = require("gulp"),
    uglify = require("gulp-uglify"),//压缩js
    concat = require("gulp-concat"),//合并文件
    minifyCss = require("gulp-minify-css"),//压缩css
    minifyHtml = require("gulp-minify-html");//压缩html

gulp.task("default", function () {

    gulp.src([
        "./src/plugins/jquery.js",
        "./src/plugins/layer/layer.js",
        "./src/plugins/diff_match_patch.js",
        "./src/js/dragMove.js",
        "./src/js/domPredictionHelper.js",
        "./src/js/selectorGadget.js",
        "./src/js/index.js"
    ])
        .pipe(concat("parent.bundle.js"))
        // .pipe(uglify())
        .pipe(gulp.dest("dist/js"));


    gulp.src([
        "./src/plugins/jquery.js",
        "./src/plugins/vue.js",
        "./src/js/interaction.js"
    ])
        .pipe(concat("frame.bundle.js"))
        // .pipe(uglify())
        .pipe(gulp.dest("dist/js"));


    gulp.src(["./src/css/combined.css", "./src/css/interaction.css"])
    // .pipe(minifyCss())
        .pipe(gulp.dest("dist/css"));


    gulp.src("interaction.html")
    // .pipe(minifyHtml())
        .pipe(gulp.dest("dist"));

    gulp.src("background.js")
        .pipe(uglify())
        .pipe(gulp.dest("dist"));

    gulp.src("manifest.json")
        .pipe(gulp.dest("dist"));

    gulp.watch(["./src/js/*.js", "./src/css/*.css", "interaction.html"], ["default"]);
});

//打包比dev模式多了压缩步骤，并且不监听变化了
gulp.task("build", function () {

    gulp.src([
        "./src/plugins/jquery.js",
        "./src/plugins/layer/layer.js",
        "./src/plugins/diff_match_patch.js",
        "./src/js/dragMove.js",
        "./src/js/domPredictionHelper.js",
        "./src/js/selectorGadget.js",
        "./src/js/index.js"
    ])
        .pipe(concat("parent.bundle.js"))
        .pipe(uglify())
        .pipe(gulp.dest("dist/js"));

    gulp.src([
        "./src/plugins/jquery.js",
        "./src/plugins/vue.js",
        "./src/js/interaction.js"
    ])
        .pipe(concat("frame.bundle.js"))
        .pipe(uglify())
        .pipe(gulp.dest("dist/js"));


    gulp.src(["./src/css/combined.css", "./src/css/interaction.css"])
        .pipe(minifyCss())
        .pipe(gulp.dest("dist/css"));


    gulp.src("interaction.html")
        .pipe(minifyHtml())
        .pipe(gulp.dest("dist"));

    gulp.src("background.js")
        .pipe(uglify())
        .pipe(gulp.dest("dist"));

    gulp.src("manifest.json")
        .pipe(gulp.dest("dist"));
});

