const mineflayer = require("mineflayer");
const { message: reply } = require("../../Client");

module.exports = {
  name: "stop",
  description : "Stopped the specified program",
  args: "<\"all\" | \"attack\" | \"pathfinding\">",

  /**
   *
   * @param {mineflayer.Bot} client
   * @param {String[]} cmdArgs
   * @param {String[]} eventArgs
   */
  async execute(client, cmdArgs, eventArgs) {
    if (cmdArgs[0] === "all") {
      client.pathfinder.stop();
      client.pvp.stop();
      client.hawkEye.stop();
      return reply(client, "Stopped all", eventArgs[0]);
    } else if (cmdArgs[0] === "attack") {
      client.pvp.stop();
      client.hawkEye.stop();
      return reply(client, "Stopped attacking the target", eventArgs[0]);
    } else if (cmdArgs[0] === "pathfinding") {
      client.pathfinder.stop();
      return reply(client, "Stopped pathfinding", eventArgs[0]); //Should trigger ./go.js:87 but doesn't ??

    }
      
      //See go.js:80
      else return reply(client, "Invalid arguments were used, try using $stop for help", eventArgs[0]);
  },
};
