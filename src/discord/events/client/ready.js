const { Client } = require("discord.js");

module.exports = {
    name: "ready",
    /**
     * @param {Client} client
     */
    async execute(client) {
        client.user.setStatus("dnd");
        console.log(client.user.username + " is up");
    },
};
