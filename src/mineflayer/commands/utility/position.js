const mineflayer = require("mineflayer");

module.exports = {
  name: "position",
  description: "Get the bot coordinates or a player ones",
  args: "<Player's username?>",

  /**
   *
   * @param {mineflayer.Bot} client
   * @param {String[]} cmdArgs
   * @param {String[]} eventArgs
   */

  execute(client, cmdArgs, eventArgs) {
    let player = client.players[cmdArgs[0]],
      position;

    if (player) {// If it's a player name
      if (!player.entity) return client.utils.message(client, `I don't see ${cmdArgs[0]} !`, eventArgs[0]);
      position = player.entity.position.toArray().map((value) => parseInt(value)).join(" ") //Set position to the player's ones
    } else { // No given argument or player not found
      position = client.player.entity.position.toArray().map((value) => parseInt(value)).join(" "); //Set position to the bot's ones 
    }

    return client.utils.message(client, `${player ? `${player.username} is` : `I am`} currently at ${position} in ${client.game.dimension}.`, eventArgs[0]);
  },
};
