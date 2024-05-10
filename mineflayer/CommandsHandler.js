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

    if (!message.startsWith("$") || username == client.username) return;

    const command = message.trim().split(" ", 4)[0].slice(1).toLowerCase();
    let args = message.trim().split(" ");
    args.shift(); //Removing the first object as it is the command

    if (!commands.has(command))
      return reply(client, "Unknown command !", username); //Command not existing

    if (!args[args.length - 1]) {
      if (command !== "position")
        //No args
        return reply(
          client,
          `Usage : $${command} ${commands.get(command)[1]}`,
          username
        ); //Explaining the syntax of the command
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
