const {
  SlashCommandBuilder,
  CommandInteraction,
  EmbedBuilder,
} = require("discord.js");
const { connectClient } = require("../../../mineflayer/Client");
const UserRegister = require("../../../mineflayer/UserRegister");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("create")
    .setDescription("Create a new bot in the specified server")
    .addStringOption((args) =>
      args
        .setName("username")
        .setDescription("Bot's username")
    )
    .addStringOption((args) =>
      args.setName("ip").setDescription("The server's ip").setRequired(true)
    )
    .addNumberOption((args) =>
      args
        .setName("port")
        .setDescription("The server's port")
        .setMinValue(1024)
        .setMaxValue(65535)
    ),

  /**
   * @param {CommandInteraction} interaction
   */

  async execute(interaction) {
    const username = interaction.options.getString("username");
    const hostIp = interaction.options.getString("ip");
    const hostPort = interaction.options.getNumber("port") || 25565;

    //Interaction response delay deferred
    console.info("Interaction response delay deferred");
    await interaction.deferReply({ ephemeral: true });

    //Checking username
    if (!/^[a-zA-Z0-9_]{3,16}$/.test(username)) {
      return interaction.editReply({
        embeds: [
          new EmbedBuilder()
            .setTitle("That is not a valid Minecraft username !")
            .setColor([255, 0, 0]),
        ],
      });
    }

    //Checking if the user had already started another bot
    if (UserRegister.has(interaction.user.id)) {

      return interaction.editReply({
        embeds: [
          new EmbedBuilder()
            .setTitle("Your bot is already online !")
            .setColor([255, 0, 0]),
        ],
      });

    } else {

      interaction.editReply({
        embeds: [
          new EmbedBuilder()
            .setTitle(`Hold on, ${username} is joining ${hostIp}:${hostPort}`)
            .setColor([255, 255, 0]),
        ],
      });

      connectClient(hostIp, hostPort, username)
        .then(async (client) => {
          UserRegister.set(interaction.user.id, client);
  
          interaction.editReply({
            embeds: [
              new EmbedBuilder()
                .setTitle(`${username} joined the game`)
                .setColor([0, 255, 0]),
            ],
          });
  
        })
        .catch((reason) => {
  
          interaction.editReply({
            embeds: [
              new EmbedBuilder()
                .setTitle("Something wrong happended !")
                .setDescription(`\`\`\`\n${reason}\n\`\`\``)
                .setColor([255, 0, 0]),
            ],
          });

        });
    }
  },
};
