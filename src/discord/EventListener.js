const { Client } = require("discord.js");
const fs = require("node:fs");
const path = require("node:path");

/**
 *
 * @param {Client} client
 * @param {Comm} interaction
 */

async function startEventListener(client) {

  const foldersPath = path.join(__dirname, "events");
  const eventFolders = fs.readdirSync(foldersPath);

  let eventsHandled = 0;

  for (const folder of eventFolders) {

    const eventPath = path.join(foldersPath, folder);
    const eventFiles = fs
      .readdirSync(eventPath)
      .filter((file) => file.endsWith(".js"));

    for (const file of eventFiles) {
        
      const filePath = path.join(eventPath, file);
      const event = require(filePath);

      if ("name" in event && "execute" in event) {

        client.on(event.name, (...args) => event.execute(...args));
        eventsHandled++;

      } else
        throw new Error(
          `${filePath} event is missing a property ! (name, execute)`
        );
    }
  }
  console.log(`${eventsHandled} events were registered.`);
}

module.exports = startEventListener;
