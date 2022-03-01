# Discord Bot for Productivity
A convenient discord bot to help track different lists for a user in a simple text based manner.

A NodeJS Project aimed towards productivity and to gain insights towards how a discord bot is built. A very basic text based bot is the best idea to experience a bot deployment on a discord server.

### Set up the project
- Build a bot and add it to your server[^1]
- Select the scope of access the bot can have within the server, generate a token for the same bot
- Create a **config.json** file and add the token as below
```text
{
    "BOT_TOKEN": "your-token-here"
}
```
- Run the **index.js** file using node to bring the bot online on the server.
- You are all set to experience the bot

### Text Commands
- .add <-item-> - to add items to the existing list.
- .remove <-item-> | <-index-> - to remove the item from the list
- .clear - to delete all messages except pinned messages
- .enn - to enumerate the list.
- .note <-note-> - to add a note 

### Some References used.
- Setting Up Config Variables[^2]
- Deploying NodeJs on Heroku[^3]
- Connecting Discord Node to External Client[^4]
- Heroku Discord Bot crashes after 60 seconds[^5]
- Herouku web process failed[^6]

[^1]: https://www.digitalocean.com/community/tutorials/how-to-build-a-discord-bot-with-node-js
[^2]: https://devcenter.heroku.com/articles/config-vars#setting-up-config-vars-for-a-deployed-application
[^3]: https://devcenter.heroku.com/articles/deploying-nodejs
[^4]: https://stackoverflow.com/questions/51446893/connecting-discord-node-js-bot-to-an-external-java-client
[^5]: https://stackoverflow.com/questions/60235534/why-does-my-heroku-discord-bot-crash-after-it-cant-connect-to-a-port
[^6]: https://stackoverflow.com/questions/31092538/heroku-node-js-error-r10-boot-timeout-web-process-failed-to-bind-to-port-w