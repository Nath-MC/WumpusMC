const mineflayer = require("mineflayer");
const { updateGoal } = require("../../Client");

module.exports = {
  name: "go",
  description: "Move the bot from point A to point B.",
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
      return client.utils.message(client, 
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
        return client.utils.message(client, 
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

    if (!coordinates.every((value) => !isNaN(value))) //Check if all values are valid

      return client.utils.message(client, 
        `Invalid arguments were used, try $go for help`,
        eventArgs[0]
      );

    client.utils.message(client, `On my way !`, eventArgs[0]);
    updateGoal(client, coordinates);
    let botCoordinates;

    const goalReached = () => {
      botCoordinates = client.player.entity.position.toArray().map((value) => {
        return parseInt(value);
      });

      client.off("goal_updated", goalUpdated);
      client.off("path_reset", pathReset);
      client.off("path_stop", pathStop);

      return client.utils.message(client, 
        `Path completed, currently at ${botCoordinates.join(" ")}`,
        eventArgs[0]
      );
    };

    const goalUpdated = (goal, dynamic) => {
      if (dynamic)
        return;
      return client.utils.message(client, "New goal assigned, path updated", eventArgs[0]);
    };

    const pathReset = (reason) => {
      if (reason === "no_scaffolding_blocks") return client.utils.message(client, "No scaffolding blocks available, I can't go any further !", eventArgs[0]);
    };

    const pathStop = () => {
      botCoordinates = client.player.entity.position
        .toArray()
        .map((value) => {
          return parseInt(value);
        });

      return client.utils.message(client, `Path canceled, currently at ${botCoordinates.join(" ")}`, eventArgs[0]);
    }

    client.on("goal_reached", goalReached);
    client.on("goal_updated", goalUpdated);
    client.on("path_reset", pathReset);
    client.on("path_stop", pathStop);

  },
};
