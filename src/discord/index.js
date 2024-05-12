// Hey there !
// Made by Nath_

console.log("Hi there !");


const { Client, IntentsBitField } = require("discord.js");
const { token } = require("../data.json");
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