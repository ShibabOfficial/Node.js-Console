const { LOG, TABLE } = require("../../../logger/console");
const { shutdown } = require("../../../threads/thread");

module.exports = {
    name: "exit",
    desc: "exits the whole console",
    async func(info, args) {
        LOG("Shutting down...");
        console.log("\n Goodbye! \n");
        process.exit(0);
    } 
};