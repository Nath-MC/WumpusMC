const {message : reply} = require("../../Client");

module.exports = {
  name: "whisper",

  /**
   *
   * @param {String} username
   * @param {String} message
   */

  execute(client, username, message, translate, jsonMsg) {
    const PREFIX = "$";

    if (!message.startsWith(PREFIX) || username == client.username) return;

    const command = message.trim().split(" ", 4)[0].slice(1).toLowerCase();
    let args = message.trim().split(" ");
    args.shift(); //Removing the first object as it is the command

    if (!client.commands.has(command)) {
      //Command not existing
      reply(client, `Unknown command ! Try ${PREFIX}help `, username);
    }

    if (!args[args.length - 1]) {
      //No args
      if (command !== "position") return reply(client, `Usage : $${command} ${client.commands.get(command)[1]}`, username);
    }

    console.log(`${username} : ${message}`);

    //Fetch the command and execute() it
    client.commands.get(command)[2](client, args, [username, message, translate, jsonMsg]);
  },
};
