const path       = require("path");
const gulp       = require("gulp");
const gutil      = require("gulp-util");
const { rollup } = require("rollup");
const tsc        = require("rollup-plugin-typescript");
// const include    = require("rollup-plugin-includepaths");
const replace    = require("rollup-plugin-replace");
const node       = require("rollup-plugin-node-resolve");
const cjs        = require("rollup-plugin-commonjs");
const json       = require("rollup-plugin-json");
const typescript = require("typescript");

/*
interface Options {
    src: string;
    dst: string;
    watch?: string | string[];
    browser?: boolean;
    builtins?: boolean;
    replace?: { [id: string]: string };
    externals?: string[];
    globals?: { [id: string]: string };
    module?: string;
}
*/

const NODE_LIBS = {
    assert:         "require(\"assert\")",
    buffer:         "require(\"buffer\")",
    child_process:  "require(\"child_process\")",
    cluster:        "require(\"cluster\")",
    crypto:         "require(\"crypto\")",
    dgram:          "require(\"dgram\")",
    dns:            "require(\"dns\")",
    domain:         "require(\"domain\")",
    events:         "require(\"events\")",
    fs:             "require(\"fs\")",
    http:           "require(\"http\")",
    https:          "require(\"https\")",
    net:            "require(\"net\")",
    os:             "require(\"os\")",
    path:           "require(\"path\")",
    punycode:       "require(\"punycode\")",
    querystring:    "require(\"querystring\")",
    readline:       "require(\"readline\")",
    stream:         "require(\"stream\")",
    string_decoder: "require(\"string_decoder\")",
    tls:            "require(\"tls\")",
    tty:            "require(\"tty\")",
    url:            "require(\"url\")",
    util:           "require(\"util\")",
    v8:             "require(\"v8\")",
    vm:             "require(\"vm\")",
    zlib:           "require(\"zlib\")",
};

module.exports = function (taskName, options) {
    taskName = "rollup:" + taskName;

    // Set defaults
    let globals = {};
    let externals;

    if (Array.isArray(options.libraries)) {
        externals = options.libraries;
        for (let ext of externals) {
            globals[ext] = `require("${ext}")`;
        }
    } else if (options != null) {
        externals = Object.keys(options.libraries);
        for (let ext in options.libraries) {
            if (options.libraries[ext] === true) {
                globals[ext] = `require("${ext}")`;
            } else {
                globals[ext] = options.libraries[ext];
            }
        }
    } else {
        externals = [];
    }

    let cache;

    gulp.task(taskName, function () {
        const plugins = [
            tsc({ typescript: typescript }),
            // include({ paths: [ "src" ] }),
            node({
                module: true,
                jsnext: true,
                main: true,
                browser: options.browser || false,
                extensions: [ ".js", ".json" ],
                preferBuiltins: false,
            }),
            cjs(),
            json(),
            replace(Object.assign({
                "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
                "DEBUG": process.env.NODE_ENV !== "production",
            }, options.replace)),
        ];

        return rollup({
            entry: options.src,
            cache: cache,
            plugins: plugins,
            external: Object.keys(NODE_LIBS).concat(externals),
        })
        .then((bundle) => {
            cache = bundle;

            bundle.write({
                format: 'iife',
                moduleName: options.module,
                dest: options.dst,
                // sourceMap: true,
                globals: Object.assign({}, NODE_LIBS, globals),
            });
        })
        .catch((error) => {
            gutil.log("[rollup]", error);
        });
    });

    gulp.task("watch:" + taskName, function () {
        return gulp.watch(options.watch || options.src, [taskName]);
    });
}
