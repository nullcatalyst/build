const path = require("path");
const gulp = require("gulp");
const ts = require("gulp-typescript");
const typescript = require("typescript");

/*
interface Options {
    base?: string;
    src: string | string[];
    dst: string;
    project: string;
}
*/

module.exports = function (taskName, options) {
    taskName = "ts:" + taskName;

    gulp.task(taskName, function () {
        const projectPath = path.resolve(options.project);
        const project = ts.createProject(projectPath, {
            typescript: typescript
        });

        return gulp.src(options.src, { base: options.base })
            .pipe(project()).js
            .pipe(gulp.dest(options.dst));
    });

    gulp.task("watch:" + taskName, function () {
        return gulp.watch(options.src, [taskName]);
    });
}
