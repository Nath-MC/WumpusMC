const mineflayer = require("mineflayer");

module.exports = {
  name: "help",
  description: "List all the commands and give help about them",
  args: "<command?>",

  /**
   *
   * @param {mineflayer.Bot} client
   * @param {String} cmdArgs
   * @param {String} eventArgs
   */
  execute(client, cmdArgs, eventArgs) {
    if (!cmdArgs[0]) {
      reply(client, "Here a list of all commands :", eventArgs[0]);

      let commandsName = [];

      for (const command of client.commands) {
        commandsName.push(command[0]); //Grab all commands and returns their name
      }

      reply(client, `${commandsName.join(", ")}`, eventArgs[0]);
      return reply(client, `Try using ${PREFIX}help <command> to get help about that command`, eventArgs[0]);

    } else if (client.commands.has(cmdArgs[0])) {
      //Get the command description
      reply(client, `${PREFIX}${cmdArgs[0]} : ${client.commands.get(cmdArgs[0])[0]}`, eventArgs[0]); 
      //Get the command args
      return reply(client, `${PREFIX}${cmdArgs[0]} arguments : ${client.commands.get(cmdArgs[0])[1]}`, eventArgs[0]); 

    }
  },
};
