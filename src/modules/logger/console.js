const { format } = require('../date/format.js');
const chalk = require('chalk');

// loging functions with date and status //
function LOG(...input) {
    console.log(`[${format(Date.now(), "${HH}:${mm}:${ss}.${ms}")}] ${chalk.blue("INFO")} : ${input}`);
}

function WARN(...input) {
    console.log(`[${format(Date.now(), "${HH}:${mm}:${ss}.${ms}")}] ${chalk.yellow("WARNING")} : ${input}`);
}

function ERROR(...input) {
    console.log(`[${format(Date.now(), "${HH}:${mm}:${ss}.${ms}")}] ${chalk.red("ERROR")} : ${input}`);
}

function TABLE(name, objects) {
    LOG(`Table of '${name}'`);

    console.table(objects);
}

module.exports = { LOG, WARN, ERROR, TABLE };