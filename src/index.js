// Hey there !
// Made by Nath_

const { Client, IntentsBitField, Collection } = require("discord.js");
const fs = require("node:fs");
const path = require("node:path");
const { token } = require("../data.json");

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.DirectMessages,
  ],
});

client.login(token);

client.on("ready", (c) => {
  c.user.setStatus("dnd");
  console.log(c.user.username + " is ready !");
});

client.commands = new Collection();
client.botUsers = new Collection(); // Use this to access which user ran which bot instance

//Registering slash commands
const foldersPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    // Set a new item in the Collection with the key as the command name and the value as the exported module
    if ("data" in command && "execute" in command) {
      client.commands.set(command.data.name, command);
    } else {
      console.log(
        `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
      );
    }
  }
}

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.isCommand()) {
    console.log(
      `${interaction.user.tag} used ${interaction.commandName} (${interaction})`
    );
    const command = interaction.client.commands.get(interaction.commandName);
    if (!command) {
      return console.warn(
        `No command matching ${interaction.commandName} was found.`
      );
    }

    try {
      return await command.execute(interaction);
    } catch (error) {
      console.error(error);
    }
  }
});

module.exports = {
  client,
};
