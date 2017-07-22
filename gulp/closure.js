const path = require("path");
const gulp = require("gulp");
const flatmap = require("gulp-flatmap");
const compilerPackage = require("google-closure-compiler");
const closure = compilerPackage.gulp();

/*
interface Options {
    base?: string;
    src: string | string[];
    dst: string;
    externs: string | string[];
}
*/

module.exports = function (taskName, options) {
    taskName = "closure:" + taskName;

    gulp.task(taskName, function () {
        return gulp.src(options.src, { base: options.base })
            .pipe(flatmap(function (stream, file) {
                const fileName = file.relative;
                const ext = path.extname(fileName);
                const name = fileName.slice(0, fileName.length - ext.length);
                console.log(fileName);

                return stream.pipe(closure({
                    compilation_level: "SIMPLE", // "WHITESPACE_ONLY", // "ADVANCED"
                    // warning_level: "QUIET",
                    language_in: "ECMASCRIPT6_STRICT",
                    language_out: "ECMASCRIPT5_STRICT",
                    rewrite_polyfills: false,
                    // externs: options.externs || [],
                    // output_wrapper: "(function(){\n%output%\n}).call(this)",
                    js_output_file: name /* + ".min" */ + ext,

                    // jscomp_off: [
                    //     "duplicate",
                    // ],
                }))
            }))
            .pipe(gulp.dest(path.dirname(options.dst)));
    });

    gulp.task("watch:" + taskName, function () {
        return gulp.watch(options.src, [taskName]);
    });
}

module.exports.CONTRIB_PATH = compilerPackage.compiler.CONTRIB_PATH;
