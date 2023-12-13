const { LOG, TABLE } = require("../../../logger/console");

module.exports = {
    name: "help",
    desc: "shows avaiable commands",
    async func(info, args) {
        let commands_ = [...info.commands], commandsO_ = [];
        commands_.filter((cmd) => commandsO_.push({name: cmd.name, desc: cmd.desc}));
        TABLE("help", commandsO_);
    }
};