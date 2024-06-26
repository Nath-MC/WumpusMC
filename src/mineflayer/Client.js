//Imports
const mineflayer = require("mineflayer");
const mc_protocol = require("minecraft-protocol");
const { whisperCommand } = require("../data.json");
const EventListener = require("./EventListener");
const {
  pathfinder,
  Movements,
  goals: { GoalBlock },
} = require("mineflayer-pathfinder");
const CommandHandler = require("./CommandHandler");
const pvp = require("mineflayer-pvp").plugin;
const pvpArmorManager = require("mineflayer-armor-manager");
const HawkEye = require("minecrafthawkeye");
// const Socks = require("socks").SocksClient;
// const Viewer = require("prismarine-viewer").mineflayer;

let client;

/**
 *
 * @param {mineflayer.Bot} client
 */

function pluginLoader(client) {
  //Loading pathfinder
  client.loadPlugin(pathfinder);
  const defaultMove = new Movements(client);

  //Defining movements properties
  defaultMove.scafoldingBlocks.push(client.registry.itemsByName["netherrack"].id);
  defaultMove.scafoldingBlocks.push(client.registry.itemsByName["oak_planks"].id);
  defaultMove.canOpenDoors = true;
  defaultMove.allowFreeMotion = true;
  client.pathfinder.thinkTimeout = 10 * 1000;

  client.pathfinder.setMovements(defaultMove);

  //Loading pvp plugins
  client.loadPlugin(pvp);
  client.loadPlugin(pvpArmorManager);
  client.loadPlugin(HawkEye.default);

  client.pvp.movements = defaultMove;
}

/**
 *
 * @param {String} hostIp The server's ip
 * @param {Number} hostPort The server's port
 * @param {String} botName The bot(as a minecraft player)'s username
 * @returns {Promise<mineflayer.Bot> | Error}
 */

function connectClient(hostIp, hostPort, botName) {
  return new Promise((resolve, reject) => {
    console.log(`Pinging the server ${hostIp} on ${hostPort}`);
    mc_protocol
      .ping({ host: hostIp, port: hostPort, closeTimeout: 3000 }) //Trying to figure out if the given IP refers to a Minecraft Server
      .then(
        (result) => {
          //SUCCESS
          console.log(`Success`);

          try {
            client = mineflayer.createBot({
              username: botName,
              host: hostIp.toLowerCase(),
              port: hostPort,
              checkTimeoutInterval: 120 * 1000,
              brand: "WumpusMC",
              // For now, the project don't support microsoft-based connections
            });

            // client.connect(
            //   Socks.createConnection({
            //     proxy: {
            //       host: "208.109.13.93",
            //       port: 54461,
            //       type: 5,
            //     },
            //     command: "connect",
            //     destination: {
            //       host: hostIp.toLowerCase(),
            //       port: hostPort,
            //     },
            //   })
            // );

            client.utils = {
              message,
              updateGoal,
            };

            client.once("spawn", () => {
              //Defining the property that will store all commands
              client.commands = new Map();

              //Start listening to commands
              CommandHandler(client);

              //Load plugins
              pluginLoader(client);

              client.armorManager.equipAll();

              // Viewer(client, {
              //   viewDistance : 16,
              //   firstPerson : true,
              //   port : 80
              // });

              //Start a more wide event listener once the bot is ready
              EventListener(client);

              //At this point, the player entity is loaded in the world and fully ready
              return resolve(client);
            });

            client.on("kicked", (reason) => {
              if (!reason) return reject("No reason were passed");

              if (reason.value.translate.value.includes("multiplayer.disconnect.unverified_username")) reason = "You can not connect to online servers !";

              return reject(reason);
            });
          } catch (error) {
            console.warn(`Something wrong happened during the bot's initialization :\n${error}`);
            return reject(error); //Unexpected error (e.g. ECONRESET) The user should try again
          }
        },
        (reason) => {
          //Either the Minecraft server was not one (or offline) or the ip refers to nothing
          console.log("Fail");

          if (reason.code === "ETIMEDOUT") {
            return reject("Connection timed out, the host may not have responded.");
          }

          if (reason.code === "ECONNREFUSED") {
            return reject("The connection has been refused, the server may be down or offline.");
          }

          return reject(reason);
        }
      );
  });
}

/**
 *
 * @param {mineflayer.Bot} client The bot instance
 * @param {String} message The in-game sent message
 * @param {String} player The recipient of the message (If undefined, the message is sent in the chat)
 */

function message(client, message, player) {
  if (!player) return client.chat(message);
  return client.chat(`${whisperCommand} ${player} ${message}`);
}

/**
 *
 * @param {mineflayer.Bot} client The bot to move
 * @param {Number[]} coords The X Y Z goal
 */

function updateGoal(client, coords) {
  client.pathfinder.setGoal(new GoalBlock(coords[0], coords[1], coords[2]));
}

module.exports = connectClient;
