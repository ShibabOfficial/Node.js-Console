const { Worker } = require('worker_threads');

const { LOG, ERROR, TABLE } = require('../logger/console.js');
// list of working workers (hmmm yes makes sense) //
let workers = [];

// running the workers //
const runService = (URL, DATA) => {
    // worker setup //
    const worker = new Worker(URL, { DATA });
    const wr = { id: `${workers.length}:${URL}`, worker: worker };
    // adding the worker //
    workers.push(wr);

    // on log event//
    worker.on('message', (msg) => {
        // Struct in README.md for logging //
        if (msg.type == null)
            return;

        // normal log //
        if (msg.type == 0)
            LOG(msg.message);

        // error log //
        if (msg.type == 1)
            ERROR(msg.message);

        // table log //
        if (msg.type == 2)
            TABLE(msg.message);
    });

    // on error event //
    worker.on('error', (err) => {
        ERROR(err);
    });
    
    // on end event //
    worker.on('exit', (code) => {
        if (code !== 0)
            ERROR(`Stopped '${URL}' with ${code} exit code`)

        workers.filter((w) => w.id !== wr.id);
    });

    // result //
    return wr;
}

// shuttingdown using `ID` //
const shutdown = async (ID) => {
    // looking for the worker //
    workers.map((w, _iw) => {
        if (w.id == ID) {
            // shutting down using the function in the worker //
            w.worker.postMessage({ exit: true });
            return;
        }
    });
}

// worker initialization function //
const run = async (URL, DATA) => {
    // run service //
    const result = runService(URL, DATA);

    // result //
    return result;
}

module.exports = { run, shutdown };