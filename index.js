var Discord = require("discord.js");
var config = require("./config.json");
var sqlite = require("sqlite");

var client = new Discord.Client();

function deleteMessage(message) {
    message.delete()
        .then(message => console.log(`${message.author.username}: ${message.content.slice(1, 10)}... Deleted`))
        .catch(console.error);
}

function ennumerate(array){
    array.sort();
    var finalString = '';
    array.forEach( (value, index) => {
        finalString += `${index+1}.\t${value}`;
        if (!value.includes("\n")) finalString += "\n";
    });
    return finalString;
}

async function send(channel, message){
    var update = await channel.send("**__UPDATED LIST BELOW__**");
    var sent = await channel.send(message);
    sent.pin();
}

client.on("ready", function () {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", async (msg) => {
    
    var mContent = msg.content;
    var command = msg.content.split(" ")[0];
    var task = mContent.split(`${command} `)[1];
    var mChannel = msg.channel;
    
    console.log(`Channel: ${mChannel.name}`);
    
    if (mContent.startsWith('.') || mContent == '') await deleteMessage(msg);

    if (command == ".add") {
        // Fetch the last pinned message and add the new task to the list
        var messages = await mChannel.messages.fetchPinned();
        var pinnedContent = [];
        messages.forEach((message) => {
            pinnedContent.push(...message.content.split(/[\d]+. /).slice(1), task);
            message.unpin();
        });
        send(mChannel, ennumerate(pinnedContent));

    }

    else if (command == ".clear") {
        var messages = await mChannel.messages.fetch();
        messages.forEach((message) => {
            if (!message.pinned) deleteMessage(message);
        });
    }

    else if (command == ".remove") {
        var messages = await mChannel.messages.fetchPinned();
        var pinnedContent = [];
        messages.forEach((message) => {
            message.unpin();
            pinnedContent = message.content.split(/[\d]+. /).slice(1);
            var regex = /^\d/;
            if (regex.test(task)) pinnedContent.splice(parseInt(task)-1, 1);
            else {
                var ind = pinnedContent.indexOf(task);
                pinnedContent.splice(ind, 1);
            }
        });
        send(mChannel, ennumerate(pinnedContent));
    }

    else if (command == ".enn") {
        var finalString = "";
        var messages = await mChannel.messages.fetchPinned();
        messages.forEach( (message) => {
            message.unpin();
            if (message.content.startsWith("1")) finalString = ennumerate(message.content.split(/[\d]+. /).slice(1));
            else finalString = ennumerate(message.content.split("\n"));
        })
        send(mChannel, finalString);
    }
    
    else if (mChannel.name == 'notes' && command==".note"){
        var sent = await mChannel.send(`${task}\n▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀`)
        sent.pin()
        
    }
});

client.login(config.BOT_TOKEN);
