# SRC Tracker Discord bot
Speedrun Run Tracker is a Discord bot that can notify you when there is a new run posted for any game on speedrun.com. You can add the bot to your Discord server and specify the games that you want to be notified about.



## Requirements
- Node.js (v12 or higher)
- [Discord application](https://discord.com/developers/applications)
## Installation
- Clone this repository
- Install dependencies
```bash
  npm install
```
 - Edit .env file
 ```bash
TOKEN= <YOUR DISCORD BOT TOKEN>
APIKEY= <YOUR SPEEDRUN.COM API KEY>
```
- Start the bot
 ```bash
 node bot.js
  ```


## Usage/Examples

 To add the bot to your Discord server, you must have the Manage Server permission.
 - Go to the Discord Developer Portal and create a new bot.
 - Copy the bot token.
 - Use this URL (replace BOT_CLIENT_ID with your bot's client ID) to invite the bot to your server: https://discord.com/oauth2/authorize?client_id=BOT_CLIENT_ID&scope=bot&permissions=3072
 - Choose the server you want to add the bot to and click Authorize.



## Configuring the bot
- /track <game_name> <text_channel_name>
 - /ping - response time
## Contributing

Contributions are welcome! If you want to contribute to the project, please open an issue or pull request on GitHub.

