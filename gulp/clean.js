const gulp = require("gulp");
const del = require("del");

/*
interface Options {
    src: string | string[];
}
*/

module.exports = function (taskName, options) {
    taskName = "clean:" + taskName;

    gulp.task(taskName, function () {
        return del(options.src);
    });
}
