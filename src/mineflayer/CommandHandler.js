const fs = require("node:fs");
const path = require("node:path");

console.log("Initializing the in-game command handler");

const foldersPath = path.join(__dirname, "commands");
const commandFolder = fs.readdirSync(foldersPath);

module.exports = (client) => {
  for (const folder of commandFolder) {
    const commandPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandPath).filter((file) => file.endsWith(".js"));
    for (const file of commandFiles) {
      const filePath = path.join(commandPath, file);
      const command = require(filePath);
      if ("name" in command && "description" in command && "args" in command && "execute" in command) {
        client.commands.set(command.name, [command.description, command.args, command.execute]);
      } else throw new Error(`${filePath} command is missing a property ! (name, description, args, execute)`);
    }
  }
  console.log(`${client.commands.size} commands were registered`);
};
