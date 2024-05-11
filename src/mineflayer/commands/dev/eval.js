const mineflayer = require("mineflayer");
const { message: reply } = require("../../Client");

module.exports = {
  name: "eval",
  description : "",
  args : "<Expression to evaluate>",

  /**
   *
   * @param {mineflayer.Bot} client
   * @param {String[]} cmdArgs
   * @param {String[]} eventArgs
   */

  execute(client, cmdArgs, eventArgs) {
    const mcdata = require("minecraft-data")(client.version);

    if (cmdArgs.length > 1)
      return reply(
        client,
        "Only one expression can be evaluated at once",
        eventArgs[0]
      );

    try {
      // Évaluation du code
      let result = eval(cmdArgs[0]);

      // Conversion du résultat en chaîne de caractères
      if (typeof result !== "string") {
        result = require("util").inspect(result);
      }
      console.log(result);
      return reply(client, result, eventArgs[0]);
    } catch (err) {
      console.log(err)
      return reply(client, "Une erreur est survenue: " + err.message, eventArgs[0]);
    }
  },
};
