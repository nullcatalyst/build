const gulp = require("gulp");
const plumber = require("gulp-plumber");
const staticHtml = require("gulp-static-html");

/*
interface Options {
    base?: string;
    ext?: string;
    src: string | string[];
    dst: string;
    locals?: any;
    minify?: boolean;
}
*/

module.exports = function (taskName, options) {
    taskName = "html:" + taskName;

    const html = staticHtml({
        base: options.base,
        ext: options.ext,
        minify: options.minify,
    });

    gulp.task(taskName, function () {
        return gulp.src(options.src, { base: options.base })
            .pipe(plumber())
            .pipe(html(options.locals))
            // .pipe(plumber.stop())
            .pipe(gulp.dest(options.dst));
    });

    gulp.task("watch:" + taskName, function () {
        return gulp.watch(options.watch || options.src, [taskName]);
    });
}
