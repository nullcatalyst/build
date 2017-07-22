const gulp = require("gulp");

/*
interface Options {
    [id: string]: string;
}
*/

module.exports = function (taskName, options) {
    taskName = "env:" + taskName;

    gulp.task(taskName, function () {
        for (let property in options) {
            process.env[property] = options[property];
        }
    });
}
