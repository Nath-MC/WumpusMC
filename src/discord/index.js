// Hey there !
// Made by Nath_

console.log("Hi there !");
console.log(`Starting project ${__dirname} !`);


const { Client, IntentsBitField, Collection } = require("discord.js");
const { token } = require("../../data.json");
const startEventListener = require("./eventListener");

const DiscordClient = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.DirectMessages,
  ],
});

DiscordClient.login(token);

DiscordClient.on("ready", (client) => {

  console.log(client.user.username + " is up");
  client.user.setStatus("dnd");

  console.log("Discord Event Listener initializing");
  startEventListener(client);
  
});

client.botUsers = new Collection(); // Use this to access which user ran which bot instance
