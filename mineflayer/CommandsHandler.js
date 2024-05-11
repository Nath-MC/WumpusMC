const mineflayer = require("mineflayer");
const fs = require("node:fs");
const path = require("node:path");

/**
 *
 * @param {mineflayer.Bot} client The bot instance
 */

module.exports = (client) => {

  const { message: reply } = require("./Client");
  console.log("Initializing the in-game commands handler");

  const foldersPath = path.join(__dirname, "commands");
  const commandFolder = fs.readdirSync(foldersPath);

  let commands = new Map();

  for (const folder of commandFolder) {
    const commandPath = path.join(foldersPath, folder);
    const commandFiles = fs
      .readdirSync(commandPath)
      .filter((file) => file.endsWith(".js"));
    for (const file of commandFiles) {
      const filePath = path.join(commandPath, file);
      const command = require(filePath);
      if ("name" in command && "description" in command && "args" in command &&"execute" in command) {
        commands.set(command.name, [command.description, command.args, command.execute]);
        console.info(`Succesfully registered ${command.name} !`);
      } else
        throw new Error(
          `${filePath} command is missing a property ! (name, description, args, execute)`
        );
    }
  }

  console.log(`${commands.size} commands were registered`);

  const messageHandler = (username, message, translate, jsonMsg) => {

    const PREFIX = '$';

    if (!message.startsWith(PREFIX) || username == client.username) return;

    const command = message.trim().split(" ", 4)[0].slice(1).toLowerCase();
    let args = message.trim().split(" ");
    args.shift(); //Removing the first object as it is the command

    if (command === "help") {
      if (!args[0]) {

        reply(client, "Here a list of all commands :", username);

        let commandsName = [];

        for (const command of commands) { 
          commandsName.push(command[0]) //Grab all commands and returns their name
         }
    
         console.log(commandsName);
         reply(client, `${commandsName.join(", ")}`, username);
         return reply(client, `Try using ${PREFIX}help <command> to get help about that command`, username);

      } else if (commands.has(args[0])) {

        reply(client, `${PREFIX}${args[0]} : ${commands.get(args[0])[0]}`, username); //Get the command description
        return reply(client, `${PREFIX}${args[0]} arguments : ${commands.get(args[0])[1]}`, username); //Get the command args

      }

    }

    if (!commands.has(command)) {  //Command not existing
     reply(client, "Unknown command ! Here a list of all available commands :", username);
    }
       

    if (!args[args.length - 1]) { //No args
      if (command !== "position")
      
        return reply(
          client,
          `Usage : $${command} ${commands.get(command)[1]}`, //Explaining the syntax of the command
          username
        ); 
    }
    
    console.log(`${username} : ${message}`);

    commands.get(command)[2](client, args, [
      username,
      message,
      translate,
      jsonMsg,
    ]);
  }

  client.on("whisper", messageHandler);
};
