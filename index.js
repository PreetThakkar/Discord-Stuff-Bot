var Discord = require("discord.js");
var config = require("./config.json");
var sqlite = require("sqlite");

var client = new Discord.Client();

client.on("ready", function () {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", async (msg) => {
    
    var mContent = msg.content;
    var command = msg.content.split(" ")[0];
    var task = mContent.split(`${command} `)[1];
    var mChannel = msg.channel;

    console.log(`Channel: ${mChannel.name}\tContent: ${mContent}`);
    
    if (command == ".add"){
        // Fetch the last pinned message and add the new task to the list
        var messages = await mChannel.messages.fetchPinned();
        var pinnedContent = null;
        messages.forEach((message) => {
            pinnedContent = message.content + "\n" + task;
            message.unpin();
        });
        var update = await mChannel.send("**__UPDATED LIST BELOW__**");
        var sent = await mChannel.send(pinnedContent);
        sent.pin();
        
    }

    else if (command == ".clear"){
        var messages = await mChannel.messages.fetch();
        var deleted = messages.forEach( (message) => {
            if (!message.pinned) message.delete();
        });
    }
    
    else if (command == ".remove"){
        var messages = await mChannel.messages.fetchPinned();
        var pinnedContent = [];
        messages.forEach( (message) => {
            message.unpin();
            pinnedContent = message.content.split('\n');
            var ind = pinnedContent.indexOf(task);
            pinnedContent.splice(ind, 1);
        });
        var update = await mChannel.send("**__UPDATED LIST BELOW__**");
        var sent = await mChannel.send(pinnedContent.join("\n"));
        sent.pin();
    }

    if (mContent.startsWith('.') || mContent == '') msg.delete();
});

client.login(config.BOT_TOKEN);