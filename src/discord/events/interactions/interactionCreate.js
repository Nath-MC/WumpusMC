const { Interaction } = require("discord.js");

module.exports = {
  name: "interactionCreate",
  /**
   * @param {Interaction} interaction
   */
  async execute(interaction) {
    if (interaction.isCommand()) {
      const command = interaction.client.commands.get(interaction.commandName);

      if (!command) return console.warn(`No command matching ${interaction.commandName} was found.`);

      try {
        return await command.execute(interaction);
      } catch (error) {
        console.error(error);
      }
    }
  },
};
