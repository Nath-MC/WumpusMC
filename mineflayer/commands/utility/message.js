const mineflayer = require("mineflayer");
const { message : reply } = require("../../Client");

module.exports = {
    name : 'message',
    description : "Send a message (or a command) into the chat or whisper it to the specified player",
    args: "<\"player:\"Player's username> <message> | <message>",

    /**
     * 
     * @param {mineflayer.Bot} client 
     * @param {String[]} cmdArgs 
     * @param {String[]} eventArgs 
     */
    execute(client, cmdArgs, eventArgs) {
        if (cmdArgs[0] === client.username)
            return reply(client, "You can't do that !", eventArgs[0]);

        if(cmdArgs[0].startsWith("player:")) {
            const recipient = cmdArgs[0].replace("player:", ""); //player:NasoMC => NasoMC
            cmdArgs.shift() ;           
            return reply(client, cmdArgs.join(" "), recipient);
        }

        else 
        return reply(client, cmdArgs.join(" "));

    }
}