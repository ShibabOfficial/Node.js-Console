const os = require("os");

const { LOG, TABLE } = require("../../../logger/console");
const { shutdown } = require("../../../threads/thread");
const { cpuAvg } = require("../../../statistics/stats");

module.exports = {
    name: "usage",
    desc: "get the pc usage",
    async func(info, args) {
        let cpu = Math.ceil(cpuAvg()), // cpu usage
            totalRam = Math.round(os.totalmem() / 1024 / 1024 / 1024), // total ram in GB
            freeRam = Math.round(os.freemem() / 1024 / 1024 / 1024),  // free ram in GB
            usedRam = totalRam - freeRam; // used ram in GB

        let ethernet_s = 0, // ethernet sent packets in Kbps
            ethernet_r = 0; // ethernet recived packets in Kbps

        TABLE("usage", [
            {
                name: "CPU %",
                value: cpu + "%",
            },
            {
                name: "TOTAL RAM",
                value: totalRam + "GB",
            },
            {
                name: "FREE RAM",
                value: freeRam + "GB",
            },
            {
                name: "USED RAM",
                value: usedRam + "GB",
            },
            {
                name: "ethernet sent",
                value: ethernet_s + "Kbps",
            },
            {
                name: "ethernet recived",
                value: ethernet_r + "Kbps",
            },
        ]);
    } 
};