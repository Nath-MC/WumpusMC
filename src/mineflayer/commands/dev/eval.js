const mineflayer = require("mineflayer");

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
      return client.utils.message(client, 
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
      return client.utils.message(client, result, eventArgs[0]);
    } catch (err) {
      console.log(err)
      return client.utils.message(client, "An error occured: " + err.message, eventArgs[0]);
    }
  },
};
