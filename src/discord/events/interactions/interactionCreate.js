const { Interaction } = require("discord.js");
const SlashCommands = require("../../CommandHandler");

module.exports = {
  name: "interactionCreate",

  /**
   *
   * @param {Interaction} interaction
   */

  async execute(interaction) {
    if (interaction.isCommand()) {
      const command = SlashCommands.get(interaction.commandName);

      if (!command)
        return console.warn(`No command matching ${interaction.commandName} was found.`);

      try {
        return await command.execute(interaction);
      } catch (error) {
        console.error(error);
      }
    }
  },
};
