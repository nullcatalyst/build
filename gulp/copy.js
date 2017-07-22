const gulp = require("gulp");
const rename = require("gulp-rename");

/*
interface Options {
    base?: string;
    src: string | string[];
    dst: string;
    rename?: string;
}
*/

module.exports = function (taskName, options) {
    taskName = "copy:" + taskName;

    gulp.task(taskName, function () {
        let stream = gulp.src(options.src, { base: options.base });

        if (options.rename) {
            stream = stream.pipe(rename(options.rename))
        }

        return stream.pipe(gulp.dest(options.dst));
    });

    gulp.task("watch:" + taskName, function () {
        return gulp.watch(options.src, [taskName]);
    });
}
