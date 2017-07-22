const gulp = require("gulp");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");

/*
interface Options {
    base?: string;
    src: string | string[];
    dst: string;
    autoprefix?: string;
}
*/

module.exports = function (taskName, options) {
    taskName = "sass:" + taskName;

    gulp.task(taskName, function () {
        return gulp.src(options.src, { base: options.base })
            .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
            .pipe(autoprefixer({ browsers: [ options.autoprefix || "last 2 versions" ] }))
            .pipe(gulp.dest(options.dst));
    });

    gulp.task('watch:' + taskName, function () {
        return gulp.watch(options.src, [taskName]);
    });
}
