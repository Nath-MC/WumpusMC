const mineflayer = require("mineflayer");
const { message: reply } = require("../../Client");

module.exports = {
  name: "eval",
  description: "Evaluate a JS expression",
  args: "<Expression to evaluate>",

  /**
   *
   * @param {mineflayer.Bot} client
   * @param {String[]} cmdArgs
   * @param {String[]} eventArgs
   */

  execute(client, cmdArgs, eventArgs) {
    if (cmdArgs.length > 1)
      return reply(
        client,
        "Only one expression can be evaluated at once.",
        eventArgs[0]
      );

    try {
      // Evaluate the expression
      let result = eval(cmdArgs[0]);

      // Convert the result to string if it isn't already
      if (typeof result !== "string") {
        result = require("util").inspect(result);
      }
      console.log(result);
      return reply(client, result, eventArgs[0]);
    } catch (err) {
      console.log(err)
      return reply(client, "An error occured: " + err.message, eventArgs[0]);
    }
  },
};
