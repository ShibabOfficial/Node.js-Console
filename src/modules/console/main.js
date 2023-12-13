const fs = require('fs');
const srl = require("serverline");

const { LOG, TABLE } = require("../logger/console");

// info data //
let info = { };

// data //
const commandsPath = "./commands", commandsFSPath = "./src/modules/console/commands";

// loading commands into data `info.commands` //
function loadCommands() {
    // getting all files from `cmd folder` //
    const cmdFolder = fs.readdirSync(commandsFSPath);

    // reading all files from `cmdFolder` //
    for (const f of cmdFolder) {
        // if file //
        if (f.endsWith("js")) {
            require(`${commandsPath}/${f}`);
            continue;
        }

        // if dir //
        const cmdFiles = fs.readdirSync(`${commandsFSPath}/${f}`).filter(f => f.endsWith('.js'));
        for (const file of cmdFiles) {
          const command = require(`${commandsPath}/${f}/${file}`);
          info.commands.push(command);
        }
    }
}

// starting terminal //
async function cmdStart(i) {
    // data setup //
    info = i;
    info.commands = [];

    // welcome message //
    console.log("\n Welcome! \n");

    // loading //
    loadCommands();

    srl.init();

    let commandsN_ = [];
    info.commands.filter((cmd) => commandsN_.push(cmd.name));
    srl.setCompletion(commandsN_);

    // setting the prompt as '> ' //
    srl.setPrompt('> ');

    // setting up input handler //
    srl.on('line', (line) => {
        // getting the command //    // getting the args // 
        let cmd = line.split(/ +/)[0], args = line.replace(cmd, '').split(/ +/);

        // if not found //
        if (!commandsN_.includes(cmd))
            return;

        // logging the initialization //
        LOG(`Command ${cmd}`);
    
        // looking for the command //
        info.commands.map(async (c, _ic) => {
            if (c.name == cmd) {
                await c.func(info, args);
                return;
            }
        });
    });
}

module.exports = { cmdStart };