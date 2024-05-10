const mineflayer = require("mineflayer");
const { message: sendMessage } = require("../../Client");

module.exports = {
  name: "chat",

  /**
   *
   * @param {mineflayer.Bot} client
   * @param {String} username
   * @param {String} message
   */
  execute(client, username, message) {
    console.log(`<${username}> ${message}`);
    if (message.includes(client.username))
      return sendMessage(client, `Hey ${username} !`);
  },
};
