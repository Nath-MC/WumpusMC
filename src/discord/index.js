console.log("Hi there! Made by Nath and Majestial");

const { Client, Collection, IntentsBitField } = require("discord.js");
const { Guilds, GuildMessages, GuildMembers, DirectMessages } = IntentsBitField.Flags;
const { token } = require("../data.json");

const client = new Client({
  intents: [Guilds, GuildMessages, GuildMembers, DirectMessages],
});

client.commands = new Collection();
client.botUsers = new Collection();

require("./EventListener")(client);
require("./CommandHandler")(client);

console.log("Logging in...")
client.login(token);
