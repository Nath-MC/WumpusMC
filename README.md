# WumpusMC Project

 WumpusMC is a project aimed at enabling users to create and control Minecraft bots directly through Discord. This project is built using Node.js and leverages the Mineflayer and Discord.js libraries to provide a seamless integration between Discord and Minecraft.

## What is the bot capable of?

Here is a list of all commands that the bot can react to :

| Command Name | Description                                                                           | Arguments                                                                   |
| -------------| --------------------------------------------------------------------------------------|-----------------------------------------------------------------------------|
| *go*         | Move the bot from point A to point B.                                                 | XYZ or a player's username                                                  |
| *message*    | Send a message (or a command) in the chat or whisper it to someone.                   | Player's username?                                                          |
| *attack*     | Attack the specified entity until death or until been said to stop.                   | "me" or "nearest" && radius (integer) or an entity ID or a player's username|
| *shoot*      | Start shooting arrows at the specified entity until death or until been said to stop. | "me"                                                                        |
| *position*   | Returns the current coordinates of the bot or the specified player.                   | Player's username?                                                          |
| *stop*       | Stop the specified program.                                                           | "all" or "attack" or "pathfinding"                                          |

*Please note that the commands listed above are all at an experimental stage of development. New ones will be added while others may be modified or removed.*

## How to use this project

By using [*this*](https://discord.com/oauth2/authorize?client_id=1226938982336565279&permissions=277025507392&scope=applications.commands+bot) button, you can add the bot to your Discord Server.

> That's all ??

Yep. I think ?

## Authors

A big thanks to [xyvwax aka Majestial](https://github.com/Zadkielf) for helping me out several times on this project !
If you want to contribute to this project, feel free to contact us on Discord via [our support server](https://discord.gg/RepKWPQWah) !  

### TODOS

- [ ] Implement a [viewer](https://github.com/PrismarineJS/prismarine-viewer), if possible through Discord using canvas and or web-based.
- [ ] Create a control panel
