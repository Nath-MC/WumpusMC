const mineflayer = require("mineflayer");
const { message: reply } = require("../../Client");
const { updateGoal } = require("../../Client");

module.exports = {
  name: "go",
  description : "Move the bot from point A to point B.",
  args: "<xyz | Player's username>",

  /**
   *
   * @param {mineflayer.Bot} client
   * @param {String[]} cmdArgs
   * @param {String[]} eventArgs
   */
  execute(client, cmdArgs, eventArgs) {

    if (cmdArgs.length > 3) {
      console.log(cmdArgs);
      return reply(
        client,
        "Unexpected amount of arguments, try using $go for help",
        eventArgs[0]
      );
    }

    let coordinates = [];
    let isPlayerCoordinate = false;

    if (client.players[cmdArgs[0]]) {

      if (client.players[cmdArgs[0]].entity) {

        coordinates = client.players[cmdArgs[0]].entity.position.toArray();
        isPlayerCoordinate = true;

      } else
        return reply(
          client,
          `I don't see ${cmdArgs[0] === eventArgs[0] ? "you" : cmdArgs[0]} !`,
          eventArgs[0]
        );
    }

    if (isPlayerCoordinate) {
      coordinates = coordinates.map((value) => parseInt(value)); // X : 26.135574 Z: 90 Y: 96.313546 => X: 26 Z: 90 Y: 96
    } else
      coordinates = cmdArgs
        .filter((value) => value) //Remove empty strings
        .map((value) => parseInt(value)); // X : 26.135574 Z: 90 Y: 96.313546 => X: 26 Z: 90 Y: 96

    if (!coordinates.every((value) => !isNaN(value)))
      //Check if all values are valid
      return reply(
        client,
        `Invalid arguments were used, try $go for help`,
        eventArgs[0]
      );

    reply(client, `On my way !`, eventArgs[0]);
    updateGoal(client, coordinates);

    client.on("goal_reached", (goal) => {

      let botCoordinates = client.player.entity.position
      .toArray()
      .map((value) => {
        return parseInt(value);
      });

      return reply(
        client,
        `Path completed, currently at ${botCoordinates.join(" ")}`,
        eventArgs[0]
      );
    });

    client.on("goal_updated", (goal, dynamic) => {
      if (dynamic) return;
      else {
        return reply(client, "New goal assigned, path updated", eventArgs[0]);
      }
    });

    client.on("path_reset", (reason) => {
      if (reason === "no_scaffolding_blocks")
        return reply(
          client,
          "No scaffolding blocks available, I can't go any further !",
          eventArgs[0]
        );
    });

    client.on("path_stop", () => {

      let botCoordinates = client.player.entity.position
      .toArray()
      .map((value) => {
        return parseInt(value);
      });
      
      return reply(
        client,
        `Path canceled, currently at ${botCoordinates.join(" ")}`,
        eventArgs[0]
      );
    });
  },
};
