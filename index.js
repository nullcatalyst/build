const path      = require("path");
 
const env       = require("./gulp/env");
const clean     = require("./gulp/clean");
const combo     = require("./gulp/combo");
const copy      = require("./gulp/copy");
const rollup    = require("./gulp/rollup");
const html      = require("./gulp/html");
const sass      = require("./gulp/sass");
const closure   = require("./gulp/closure");

module.exports = {
    env,
    clean,
    combo,
    copy,
    rollup,
    html,
    sass,
    closure,
};
