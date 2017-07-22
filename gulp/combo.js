const gulp = require("gulp");
const sequence = require("gulp-sequence");

module.exports = function (taskName, ...subtasks) {
    gulp.task(taskName, sequence(...subtasks));

    let watchSubtasks = subtasks.map((subtask) => {
        if (Array.isArray(subtask)) {
            return subtask.map(subtask => "watch:" + subtask);
        } else {
            return "watch:" + subtask;
        }
    });

    gulp.task("watch:" + taskName, sequence(...watchSubtasks));
}
