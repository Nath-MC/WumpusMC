const { REST, Routes } = require("discord.js");
const { client, token } = require("../data.json");
const fs = require("node:fs");
const path = require("node:path");

const commands = [];
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
    if ("data" in command && "execute" in command) {
      commands.push(command.data.toJSON());
    } else {
      throw new Error(
        `The command at ${filePath} is missing a required "data" or "execute" property.`
      );
    }
  }
}

const rest = new REST().setToken(token);

console.log(`Started refreshing ${commands.length} slash commands.`);

async () => {
  console.log("Deleting old global commands");
  rest
    .put(Routes.applicationCommand(client), {
      body: [],
    })
    .then(
      (value) => {
        if (value.length !== commands.length)
          throw new Error("Not all commands were deleted");
        console.log("Successfully deleted old global commands");
      },
      (reason) => {
        console.log("Failed to delete old global commands");
        throw new Error(reason);
      }
    );

  setTimeout(() => {
    rest
      .put(Routes.applicationCommands(client), {
        body: commands,
      })
      .then(
        (value) => {
          if (value.length !== commands.length)
            throw new Error("Not all commands were refreshed");
          console.log(`Succesfully updated  ${value.length} slash commands`);
        },
        (reason) => {
          console.log("Failed to refresh slash commands");
          throw new Error(reason);
        }
      );
  }, 10 * 1000);

  await rest.put(
    Routes.applicationGuildCommands(client, "1108374933047889970"),
    {
      body: [],
    }
  );
};
